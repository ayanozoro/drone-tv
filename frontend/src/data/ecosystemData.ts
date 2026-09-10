import { EcosystemPillar, UpcomingEvent, PartnerEntity } from '../types';

export const ECOSYSTEM_PILLARS: EcosystemPillar[] = [
  {
    id: 'drone-tech',
    title: 'Drone Technology',
    subtitle: 'Hardware & Systems',
    tagline: '150+ Videos • +25% this month',
    description:
      'Explore cutting-edge UAV airframes, propulsion dynamics, flight controllers, and industrial payloads driving transformation across sectors.',
    popularTopics: ['Commercial UAS', 'Heavy-Lift Payloads', 'FPV & Cinema Rigs', 'Autonomous Delivery'],
    stats: {
      videos: '150+',
      companies: '45+',
      events: '12',
    },
    growthBadge: '+25% Growth',
    iconName: 'Plane',
  },
  {
    id: 'ai-tech',
    title: 'Artificial Intelligence',
    subtitle: 'Autonomy & Perception',
    tagline: '89+ Videos • +40% this month',
    description:
      'Discover next-gen AI models powering edge inference, SLAM navigation, real-time object detection, and autonomous flight planning.',
    popularTopics: ['Computer Vision', 'Edge AI Payloads', 'Neural Networks', 'Autonomous Collision Avoidance'],
    stats: {
      videos: '89+',
      companies: '32+',
      events: '8',
    },
    growthBadge: '+40% Growth',
    iconName: 'Brain',
  },
  {
    id: 'gis-mapping',
    title: 'GIS & Spatial Analytics',
    subtitle: 'Geospatial Intelligence',
    tagline: '67+ Videos • +18% this month',
    description:
      'Geographic Information Systems, precision photogrammetry, and LiDAR point-cloud workflows for survey-grade terrain modeling.',
    popularTopics: ['Aerial Surveying', '3D Orthomosaics', 'LiDAR Point Clouds', 'Digital Twins (QGIS/ArcGIS)'],
    stats: {
      videos: '67+',
      companies: '28+',
      events: '6',
    },
    growthBadge: '+18% Growth',
    iconName: 'Map',
  },
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'drone-expo-2026',
    title: 'Drone Expo 2026',
    badge: 'Premium Flagship Expo',
    dateRange: 'Sept 28, 2026 – Sept 30, 2026',
    location: 'Yashobhoomi (IICC), Sector 25 Dwarka, New Delhi, India',
    timing: '09:00 AM – 07:30 PM IST',
    description:
      "India's largest gathering of UAV manufacturers, certified operators, enterprise buyers, and DGCA aviation regulators shaping civil aerospace policy.",
    ctaText: 'Register for Expo',
  },
  {
    id: 'ai-tech-collab',
    title: 'AI-TECH UAV Collaboration Summit',
    badge: 'Industry Conclave',
    dateRange: 'Nov 14, 2026 – Nov 15, 2026',
    location: 'HITEC City Convention Centre, Hyderabad, Telangana',
    timing: '09:30 AM – 06:00 PM IST',
    description:
      'Focusing on intelligent autonomous flight algorithms, computer vision edge processors, and drone-in-a-box defense automation.',
    ctaText: 'Explore Conclave',
  },
  {
    id: 'air-mobility-2027',
    title: 'Air Mobility Expo 2027',
    badge: 'Future Aerospace',
    dateRange: 'Feb 04, 2027 – Feb 07, 2027',
    location: 'Bharat Mobility Global @ Yashobhoomi (IICC), New Delhi',
    timing: '10:00 AM – 05:00 PM IST',
    description:
      'Showcasing electric vertical take-off and landing (eVTOL) systems, heavy-payload logistics corridors, and urban air traffic management.',
    ctaText: 'View Details',
  },
];

export const ECOSYSTEM_PARTNERS: PartnerEntity[] = [
  { name: 'Telangana Govt', type: 'Government Partner' },
  { name: 'Andhra Govt', type: 'State Administration' },
  { name: 'Odisha Govt', type: 'Geospatial Partner' },
  { name: 'Jharkhand Govt', type: 'State Administration' },
  { name: 'Telangana Police', type: 'Security & Surveillance' },
  { name: 'AP Police', type: 'Law Enforcement UAV Fleet' },
  { name: 'Corteva Agriscience', type: 'Precision AgriTech' },
  { name: 'NCC Urban', type: 'Infrastructure & Survey' },
  { name: 'Aparna Constructions', type: 'Asset Inspection' },
  { name: 'Ctrls Datacenters', type: 'Cloud Infrastructure' },
  { name: 'Siri Sampada', type: 'Survey & Planning' },
  { name: 'Drone Academy Pvt Ltd', type: 'DGCA Training Partner' },
];

export const MEDIA_SPOTLIGHTS = [
  {
    id: 'dev-r-founder',
    title: 'Voices from Drone Expo – Featuring Dev R, Founder of Drone TV',
    speaker: 'Dev R, Founder of Drone TV',
    quote:
      '"Drone TV is the voice of the drone ecosystem — a platform where innovators, startups, and entrepreneurs can express their vision and connect with the world."',
    tag: 'Founder Spotlight',
  },
  {
    id: 'bbpl-aero',
    title: 'Industry-Scale Drone Integration & Aerial Autonomy',
    speaker: 'Dr. Pranay Kumar, COO of BBPL Aero',
    quote:
      '"How drone technology is transforming agriculture, infrastructure, logistics, and establishing a roadmap for intelligent UAV adoption in India."',
    tag: 'Industrial UAVs',
  },
  {
    id: 'corteva-agriscience',
    title: 'Drone-Powered Precision Agriculture & Crop Scouting',
    speaker: 'Teja, Corteva Agriscience',
    quote:
      '"From precision spraying to crop canopy monitoring, drone technology is driving sustainable yields for millions of Indian farmers."',
    tag: 'AgriTech Innovation',
  },
  {
    id: 'cropwings-tech',
    title: 'Addressing the Agri Crisis with Certified Drone Pilots',
    speaker: 'Gowrav Reddy, Founder of CropWings',
    quote:
      '"Reducing pesticide exposure and connecting farmers with DGCA-certified operators for safer, smarter farming."',
    tag: 'Pilot Impact',
  },
];
