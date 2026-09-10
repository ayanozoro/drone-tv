import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import app from '../src/server.js';

dotenv.config();

const PORT = 5055; // Dedicated port for testing
let server;
let createdEnquiryId = null;

const request = async (path, options = {}) => {
  const url = `http://127.0.0.1:${PORT}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const json = await response.json().catch(() => ({}));
  return {
    status: response.status,
    data: json,
  };
};

const runTests = async () => {
  console.log('🚀 Starting DroneTV API Automated Test Suite...\n');
  let passed = 0;
  let failed = 0;

  const assert = (condition, title, details = '') => {
    if (condition) {
      console.log(`  ✅ PASS: ${title}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${title} ${details}`);
      failed++;
    }
  };

  try {
    // Start local test server
    await new Promise((resolve) => {
      server = app.listen(PORT, resolve);
    });
    // Wait brief moment for DB connection
    await new Promise((r) => setTimeout(r, 1000));

    // Test 1: Health check
    const health = await request('/api/health');
    assert(
      health.status === 200 && health.data.success === true && health.data.message === 'API is running',
      'GET /api/health returns 200 OK and valid health payload'
    );

    // Test 2: POST /api/enquiries with missing name
    const missingName = await request('/api/enquiries', {
      method: 'POST',
      body: {
        email: 'test@example.com',
        phone: '9876543210',
        userType: 'Student',
        interest: 'Drone Pilot Training',
        message: 'Looking for pilot courses',
      },
    });
    assert(
      missingName.status === 400 && missingName.data.success === false,
      'POST /api/enquiries rejects missing name with 400'
    );

    // Test 3: POST /api/enquiries with invalid email
    const invalidEmail = await request('/api/enquiries', {
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'not-an-email',
        phone: '9876543210',
        userType: 'Student',
        interest: 'Drone Pilot Training',
        message: 'Looking for pilot courses',
      },
    });
    assert(
      invalidEmail.status === 400 && invalidEmail.data.success === false,
      'POST /api/enquiries rejects invalid email format with 400'
    );

    // Test 4: POST /api/enquiries with invalid phone
    const invalidPhone = await request('/api/enquiries', {
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123', // Less than 10 digits
        userType: 'Student',
        interest: 'Drone Pilot Training',
        message: 'Looking for pilot courses',
      },
    });
    assert(
      invalidPhone.status === 400 && invalidPhone.data.success === false,
      'POST /api/enquiries rejects invalid phone number (< 10 digits) with 400'
    );

    // Test 5: POST /api/enquiries with invalid userType
    const invalidUserType = await request('/api/enquiries', {
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        userType: 'SuperAdmin', // Invalid enum
        interest: 'Drone Pilot Training',
        message: 'Looking for pilot courses',
      },
    });
    assert(
      invalidUserType.status === 400 && invalidUserType.data.success === false,
      'POST /api/enquiries rejects invalid userType enum with 400'
    );

    // Test 6: POST valid enquiry & verify default status is 'New' even if client sent something else
    const validEnquiry = await request('/api/enquiries', {
      method: 'POST',
      body: {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '+91 9876543210',
        userType: 'Student',
        interest: 'DGCA Drone Pilot Training',
        message: 'I am interested in obtaining a certified commercial remote pilot license.',
        status: 'Closed', // Client attempt to override initial status
      },
    });
    assert(
      validEnquiry.status === 201 &&
        validEnquiry.data.success === true &&
        validEnquiry.data.data.status === 'New',
      'POST /api/enquiries creates enquiry and forces status to "New"',
      JSON.stringify(validEnquiry.data)
    );
    createdEnquiryId = validEnquiry.data?.data?._id;

    // Test 7: GET /api/enquiries (all)
    const allEnquiries = await request('/api/enquiries');
    assert(
      allEnquiries.status === 200 &&
        allEnquiries.data.success === true &&
        Array.isArray(allEnquiries.data.data.enquiries) &&
        allEnquiries.data.data.enquiries.length > 0,
      'GET /api/enquiries returns paginated list of enquiries'
    );

    // Test 8: GET /api/enquiries/stats
    const stats = await request('/api/enquiries/stats');
    assert(
      stats.status === 200 &&
        stats.data.success === true &&
        stats.data.data.statuses &&
        stats.data.data.statuses.total >= 1,
      'GET /api/enquiries/stats returns KPI status metrics'
    );

    // Test 9: GET /api/enquiries/:id with valid ID
    const single = await request(`/api/enquiries/${createdEnquiryId}`);
    assert(
      single.status === 200 &&
        single.data.success === true &&
        single.data.data._id === createdEnquiryId,
      'GET /api/enquiries/:id returns single enquiry details'
    );

    // Test 10: GET /api/enquiries/:id with malformed ObjectId
    const malformed = await request('/api/enquiries/invalid-id-123');
    assert(
      malformed.status === 400 && malformed.data.success === false,
      'GET /api/enquiries/:id with malformed ID returns 400 Bad Request'
    );

    // Test 11: GET /api/enquiries/:id with non-existent ObjectId
    const nonExistent = await request('/api/enquiries/507f1f77bcf86cd799439011');
    assert(
      nonExistent.status === 404 && nonExistent.data.success === false,
      'GET /api/enquiries/:id with non-existent ID returns 404 Not Found'
    );

    // Test 12: PATCH /api/enquiries/:id with valid status update
    const patchStatus = await request(`/api/enquiries/${createdEnquiryId}`, {
      method: 'PATCH',
      body: {
        status: 'Contacted',
      },
    });
    assert(
      patchStatus.status === 200 &&
        patchStatus.data.success === true &&
        patchStatus.data.data.status === 'Contacted',
      'PATCH /api/enquiries/:id successfully updates status to "Contacted"'
    );

    // Test 13: PATCH /api/enquiries/:id with invalid status enum
    const patchInvalidStatus = await request(`/api/enquiries/${createdEnquiryId}`, {
      method: 'PATCH',
      body: {
        status: 'RandomStatus',
      },
    });
    assert(
      patchInvalidStatus.status === 400 && patchInvalidStatus.data.success === false,
      'PATCH /api/enquiries/:id rejects invalid status enum with 400'
    );

    // Test 14: Search filter GET /api/enquiries?search=Rahul
    const searchResult = await request('/api/enquiries?search=Rahul');
    assert(
      searchResult.status === 200 &&
        searchResult.data.data.enquiries.some((e) => e.name.includes('Rahul')),
      'GET /api/enquiries?search=Rahul correctly filters matching records'
    );

    // Test 15: DELETE /api/enquiries/:id
    const deleteEnquiry = await request(`/api/enquiries/${createdEnquiryId}`, {
      method: 'DELETE',
    });
    assert(
      deleteEnquiry.status === 200 && deleteEnquiry.data.success === true,
      'DELETE /api/enquiries/:id successfully deletes enquiry'
    );

    // Test 16: DELETE /api/enquiries/:id again (non-existent)
    const deleteAgain = await request(`/api/enquiries/${createdEnquiryId}`, {
      method: 'DELETE',
    });
    assert(
      deleteAgain.status === 404 && deleteAgain.data.success === false,
      'DELETE /api/enquiries/:id on deleted ID returns 404 Not Found'
    );

    console.log(`\n=========================================`);
    console.log(` Test Summary: ${passed} Passed, ${failed} Failed`);
    console.log(`=========================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Unexpected test failure:', err);
    process.exit(1);
  } finally {
    if (server) {
      server.close();
    }
    await mongoose.disconnect();
    process.exit(0);
  }
};

runTests();
