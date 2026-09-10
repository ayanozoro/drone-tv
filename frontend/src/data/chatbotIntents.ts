import { ChatIntent } from '../types';

export const CHATBOT_SUGGESTIONS: string[] = [
  'What services does DroneTV provide?',
  'What courses / training are available?',
  'Tell me about DroneTV.',
  'What events / expos are upcoming?',
  'How can I contact DroneTV?',
  'How can I register?',
  'I am interested in a service.',
  'I am a student.',
  'I want to speak with someone.',
];

export const CHATBOT_INTENTS: ChatIntent[] = [
  {
    id: 'about_dronetv',
    intent: 'ABOUT_DRONETV',
    keywords: [
      'what is dronetv',
      'tell me about dronetv',
      'about dronetv',
      'who founded dronetv',
      'founder',
      'dev r',
      'who are you',
      'drone academy',
      'ecosystem',
      'what does dronetv do',
    ],
    response:
      '🌐 **About DroneTV (dronetv.in):**\n\n' +
      'DroneTV is India’s premier drone industry platform — the **Voice of Drone Technology, GIS & AI**.\n\n' +
      '• **Founder:** Dev R, Founder of Drone TV.\n' +
      '• **Operating Entity:** Drone Academy Private Limited (Hyderabad, Telangana).\n' +
      '• **Mission:** Uniting the drone ecosystem across manufacturers, certified pilots, GIS & AI innovators, enterprise buyers, and policymakers.\n' +
      '• **Network:** 240+ DGCA-approved RPTOs and 285+ verified commercial drone services across India.',
    suggestions: [
      'What services does DroneTV provide?',
      'What courses / training are available?',
      'What events / expos are upcoming?',
    ],
    ctaText: 'Explore Ecosystem',
    ctaAction: 'services',
  },
  {
    id: 'events_expos',
    intent: 'EVENTS_EXPOS',
    keywords: [
      'event',
      'events',
      'expo',
      'drone expo',
      'drone expo 2026',
      'conference',
      'webinar',
      'exhibition',
      'air mobility',
      'yashobhoomi',
      'what events / expos are upcoming',
    ],
    response:
      '📅 **Upcoming Industry Expos & Events:**\n\n' +
      '• **Drone Expo 2026** — Sept 28–30, 2026 @ Yashobhoomi (IICC), Sector 25 Dwarka, New Delhi. India’s flagship drone event with 5,000+ delegates and regulators.\n' +
      '• **AI-TECH UAV Summit** — Nov 14–15, 2026 @ HITEC City, Hyderabad. Showcasing autonomous navigation & edge computer vision.\n' +
      '• **Air Mobility Expo 2027** — Feb 04–07, 2027 @ Yashobhoomi (IICC), New Delhi. Next-gen eVTOL systems & heavy payload logistics.',
    suggestions: [
      'Tell me about DroneTV.',
      'What courses / training are available?',
      'How can I contact DroneTV?',
    ],
    ctaText: 'Submit an Enquiry',
    ctaAction: 'enquiry',
    ctaPayload: 'Event & Expo Registration',
  },
  {
    id: 'partners',
    intent: 'PARTNERS',
    keywords: [
      'partner',
      'partners',
      'partnerships',
      'government',
      'police',
      'telangana',
      'andhra',
      'corteva',
      'collaborations',
      'who are your partners',
    ],
    response:
      '🤝 **DroneTV Ecosystem Partners:**\n\n' +
      'DroneTV actively collaborates with state governments, law enforcement, and industry leaders:\n\n' +
      '• **Government & Law Enforcement:** Telangana Govt, Andhra Govt, Odisha Govt, Jharkhand Govt, Telangana Police, AP Police.\n' +
      '• **Enterprise & AgriTech:** Corteva Agriscience, NCC Urban, Aparna Constructions, Ctrls Datacenters, Siri Sampada.\n' +
      '• **Training Networks:** Drone Academy Private Limited, PinakShakti Aerospace Academy, Manipal Skill Dev.',
    suggestions: [
      'What services does DroneTV provide?',
      'Tell me about DroneTV.',
      'How can I contact DroneTV?',
    ],
    ctaText: 'Partner With Us',
    ctaAction: 'enquiry',
    ctaPayload: 'Partnership Inquiry',
  },
  {
    id: 'services',
    intent: 'SERVICES',
    keywords: [
      'service',
      'services',
      'provide',
      'what do you do',
      'solutions',
      'offer',
      'survey',
      'mapping',
      'inspection',
      'thermal',
      'agriculture',
      'spraying',
      'cinematography',
      'surveillance',
      'enterprise',
      'what services does dronetv provide',
    ],
    response:
      '🚁 **DroneTV Verified Enterprise Solutions (285+ Services Available):**\n\n' +
      '• **Aerial Survey & GIS Mapping** — Sub-centimeter RTK/PPK photogrammetry and LiDAR 3D contouring.\n' +
      '• **Solar PV & Wind Turbine Inspection** — Radiometric infrared thermography for 1,000+ MWp energy assets.\n' +
      '• **24/7 Aerial Surveillance & Tactical Security** — Search-and-rescue and night-vision monitoring deployed with police departments.\n' +
      '• **Precision Agriculture & Crop Spraying** — Multispectral NDVI diagnostics and targeted micro-spraying.\n' +
      '• **Aerial Cinematography & 8K Broadcasting** — Heavy-lift cinema rigs and agile indoor/outdoor FPV drones.\n\n' +
      'Would you like a quote or a consultation for your enterprise project?',
    suggestions: [
      'I am interested in a service.',
      'What courses / training are available?',
      'How can I contact DroneTV?',
    ],
    ctaText: 'Explore All Services',
    ctaAction: 'services',
  },
  {
    id: 'courses',
    intent: 'COURSES',
    keywords: [
      'course',
      'courses',
      'training',
      'program',
      'programs',
      'syllabus',
      'learn',
      'academy',
      'pilot training',
      'license',
      'certification',
      'dgca',
      'rpc',
      'what courses / training are available',
      'what courses do you have',
      'what training do you offer',
    ],
    response:
      '🎓 **DroneTV 4-Level Pilot Career Pathways (240+ DGCA Approved RPTOs):**\n\n' +
      '1. **Level 01 — DGCA Remote Pilot Certificate (RPC)** (5 Days | ₹50k–₹80k) — Small & Medium category licensing, 50+ flight sorties.\n' +
      '2. **Level 02 — GIS & Drone Mapping Specialist** (15–30 Days | ₹30k–₹80k) — Pix4D, LiDAR point clouds, QGIS, survey-grade 3D maps.\n' +
      '3. **Level 03 — Agriculture Drone Specialist** (5–10 Days | ₹20k–₹50k) — Precision crop spraying, NDVI analytics, Namo Drone Didi alignment.\n' +
      '4. **Level 04 — Certified Flight Instructor (CFI)** (10–15 Days | ₹60k–₹90k) — Official DGCA RPTO faculty training.\n\n' +
      'All courses feature simulator hours, real field sorties, and 100% placement cell support.',
    suggestions: [
      'How can I register?',
      'I am a student.',
      'I want to speak with someone.',
    ],
    ctaText: 'View Course Catalog',
    ctaAction: 'courses',
  },
  {
    id: 'contact',
    intent: 'CONTACT',
    keywords: [
      'contact',
      'phone',
      'email',
      'call',
      'address',
      'office',
      'reach',
      'location',
      'support',
      'how can i contact dronetv',
      'how can i reach you',
    ],
    response:
      '📞 **Get in Touch with DroneTV:**\n\n' +
      '• **Official Platform:** dronetv.in (Voice of Drone Technology, GIS & AI)\n' +
      '• **Operating Entity:** Drone Academy Private Limited, Hyderabad & New Delhi\n' +
      '• **Direct Phone:** +91 98765 43210 (Mon–Sat, 9:00 AM – 6:00 PM IST)\n' +
      '• **Official Email:** support@dronetv.in / admissions@dronetv.in\n' +
      '• **Socials:** @indiadronetv (YouTube, X, Instagram, Facebook)\n' +
      '• **Support Desk:** Submit an online enquiry for priority callback within 2 hours.',
    suggestions: [
      'I want to speak with someone.',
      'How can I register?',
      'What services does DroneTV provide?',
    ],
    ctaText: 'Submit an Enquiry',
    ctaAction: 'enquiry',
  },
  {
    id: 'register',
    intent: 'REGISTER',
    keywords: [
      'register',
      'registration',
      'enroll',
      'enrolment',
      'admission',
      'sign up',
      'how to join',
      'batch',
      'fees',
      'price',
      'cost',
      'how can i register',
    ],
    response:
      '📝 **How to Register for DroneTV Programs:**\n\n' +
      '1. Choose your desired RPTO course pathway or enterprise service track.\n' +
      '2. Submit an official online enquiry form with your contact details.\n' +
      '3. An academic counselor will contact you within 24 hours to schedule batch dates and verify DGCA eligibility.\n' +
      '4. Complete enrollment with flexible payment options.\n\n' +
      'Ready to begin? You can submit your registration request right now!',
    suggestions: [
      'I am a student.',
      'What courses / training are available?',
      'I want to speak with someone.',
    ],
    ctaText: 'Register / Enquire Now',
    ctaAction: 'enquiry',
  },
  {
    id: 'service_interest',
    intent: 'SERVICE_INTEREST',
    keywords: [
      'i am interested in a service',
      'interested in service',
      'hire drone',
      'commercial pilot hire',
      'hire',
      'quote',
      'proposal',
      'contract',
      'pricing for service',
      'enterprise inquiry',
    ],
    response:
      '🤝 **Enterprise Commercial Services Inquiry:**\n\n' +
      'We partner with infrastructure, agriculture, energy, and media corporations across the country.\n\n' +
      'Please tell us your mission parameters (location, survey area, or target deliverables) via our lead enquiry form, and our engineering team will provide a tailored scope of work and estimate.',
    suggestions: [
      'What services does DroneTV provide?',
      'How can I contact DroneTV?',
      'I want to speak with someone.',
    ],
    ctaText: 'Submit an Enquiry',
    ctaAction: 'enquiry',
    ctaPayload: 'Enterprise Service Quote',
  },
  {
    id: 'student',
    intent: 'STUDENT',
    keywords: [
      'i am a student',
      'student',
      'college',
      'university',
      'internship',
      'freshers',
      'career',
      'job',
      'placement',
      'discounts',
      'scholarship',
    ],
    response:
      '🎒 **Welcome Students & Aspiring UAV Engineers!**\n\n' +
      '• We offer special student batch discounts on our DGCA Remote Pilot Certification.\n' +
      '• 100% placement support with leading drone manufacturers, GIS firms, and precision agriculture startups.\n' +
      '• Hands-on internship and capstone project opportunities available at the DroneTV Flight Lab.\n\n' +
      'Submit your student enquiry below and select "Student" as your user type for prioritized discount verification!',
    suggestions: [
      'What courses / training are available?',
      'How can I register?',
      'I want to speak with someone.',
    ],
    ctaText: 'Submit Student Enquiry',
    ctaAction: 'enquiry',
    ctaPayload: 'Student Pilot Training',
  },
  {
    id: 'speak_human',
    intent: 'SPEAK_TO_HUMAN',
    keywords: [
      'i want to speak with someone',
      'speak with someone',
      'talk to someone',
      'human',
      'agent',
      'representative',
      'counselor',
      'manager',
      'call me',
      'callback',
    ],
    response:
      '👤 **Connect with a DroneTV Specialist:**\n\n' +
      'Our team is happy to speak with you directly! Please drop your contact number and brief inquiry below, and an expert technical advisor or course counselor will call you back promptly.',
    suggestions: [
      'How can I contact DroneTV?',
      'What courses / training are available?',
      'What services does DroneTV provide?',
    ],
    ctaText: 'Request a Callback',
    ctaAction: 'enquiry',
    ctaPayload: 'Callback Request',
  },
];

export const FALLBACK_RESPONSE =
  'I’m sorry, I couldn’t find an answer to that. You can ask me about our services, courses, registration, or contacting our team.';
