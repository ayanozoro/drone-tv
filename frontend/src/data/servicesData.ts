import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'aerial-survey-mapping',
    title: 'Aerial Survey & Geospatial Mapping',
    category: 'Industrial Surveying',
    description:
      'High-precision LiDAR and photogrammetry mapping delivering millimeter-accuracy 3D orthomosaics, digital elevation models, and GIS contour data for infrastructure projects.',
    features: [
      'Sub-centimeter RTK/PPK precision',
      '3D volumetric stock measurement',
      'GIS and CAD compatible exports',
      'Fast turnaround cloud processing',
    ],
    iconName: 'MapPin',
    badge: 'High Precision',
  },
  {
    id: 'infrastructure-inspection',
    title: 'Industrial & Thermal Asset Inspection',
    category: 'Inspection & Maintenance',
    description:
      'Autonomous UAV inspections for power transmission grids, wind turbine blades, solar photovoltaic arrays, and oil & gas pipelines with dual radiometric thermal sensors.',
    features: [
      'Radiometric thermal hotspot detection',
      'Safe standoff high-voltage inspection',
      'AI-powered crack & rust defect detection',
      'Comprehensive compliance reporting',
    ],
    iconName: 'ShieldAlert',
    badge: 'Enterprise',
  },
  {
    id: 'precision-agriculture',
    title: 'Precision Agriculture & Crop Health',
    category: 'AgriTech Solutions',
    description:
      'Multispectral vegetation indexing (NDVI/NDRE), targeted micro-spraying payloads, and crop yield forecasting for commercial farms and agribusinesses.',
    features: [
      'Multispectral health & stress zoning',
      'Variable rate spraying prescription maps',
      'Pest and irrigation anomaly tracking',
      'Up to 80% water and chemical savings',
    ],
    iconName: 'Leaf',
    badge: 'Sustainable',
  },
  {
    id: 'aerial-cinematography',
    title: 'Aerial Cinematography & Live Broadcasting',
    category: 'Media & Broadcasting',
    description:
      'Cinema-grade heavy lifters and agile FPV camera drones equipped with 6K/8K RAW stabilization rigs for major film productions, sporting events, and live broadcast feeds.',
    features: [
      'Dual-operator heavy-lift gimbal setups',
      'Ultra-low latency HD broadcast streaming',
      'High-speed indoor & outdoor FPV chasing',
      'DGCA daytime & nighttime flight clearance',
    ],
    iconName: 'Video',
    badge: 'Cinema 8K',
  },
  {
    id: 'solar-wind-inspection',
    title: 'Solar PV & Wind Turbine Generator Inspections',
    category: 'Inspection & Maintenance',
    description:
      'Drone thermography replacing handheld testing. Thermographic inspection of 1,000+ MWp solar parks and wind turbine blades with radiometric infrared and high-optical zoom sensors.',
    features: [
      'Hotspot anomaly diagnosis for PV modules',
      'Wind turbine blade crack & leading-edge erosion detection',
      'High-voltage transmission line corona scanning',
      'IEC-compliant digital audit reports',
    ],
    iconName: 'Zap',
    badge: 'DroneTV Verified',
  },
  {
    id: 'perimeter-surveillance-247',
    title: 'Aerial Surveillance & Tactical 24/7 Monitoring',
    category: 'Security & Defense',
    description:
      'Proven field deployment in mission-critical search operations with state forest and police departments using dual RGB and thermal sensors for round-the-clock reconnaissance.',
    features: [
      '24/7 day and thermal night vision feed',
      'Rapid incident geofencing & real-time tracking',
      'Tethered endurance stations for continuous coverage',
      'Inter-agency command stream integration',
    ],
    iconName: 'ShieldAlert',
    badge: 'Mission Critical',
  },
  {
    id: 'disaster-surveillance',
    title: 'Security, Surveillance & Disaster Relief',
    category: 'Security & Defense',
    description:
      'Rapidly deployable tethered and autonomous UAVs for perimeter security monitoring, night-vision perimeter patrol, search-and-rescue, and disaster damage reconnaissance.',
    features: [
      'Long-endurance tethered flight stations',
      'Long-range optical zoom & IR night vision',
      'Real-time encrypted situational awareness feed',
      'Emergency payload delivery mechanisms',
    ],
    iconName: 'Radio',
    badge: 'Critical Mission',
  },
  {
    id: 'custom-uav-engineering',
    title: 'Custom UAV R&D & Fleet Integration',
    category: 'Aerospace Engineering',
    description:
      'End-to-end custom payload design, avionics calibration, autopilot configuration, and fleet management software tailored to specialized enterprise requirements.',
    features: [
      'Bespoke sensor and payload integration',
      'Open-source PX4 / ArduPilot customization',
      'Regulatory compliance consulting',
      'Fleet telemetry software architecture',
    ],
    iconName: 'Cpu',
    badge: 'R&D Lab',
  },
];
