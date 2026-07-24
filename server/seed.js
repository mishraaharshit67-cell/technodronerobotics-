import { loadEnv } from './lib/env.js';
import db from './lib/database.js';
import { hashPassword } from './lib/hash.js';

loadEnv();

const products = [
  { name: 'TDR-FPV Racer', slug: 'tdr-fpv-racer', category: 'FPV Drone', description: 'Built for speed freaks and competitive drone racers. Lightweight carbon-fiber airframe, high-KV brushless motors, and low-latency HD digital FPV system.', specs: ['120km/h Top Speed', 'HD FPV 120fps', '15min Flight', '4km Range', 'Digital VTX'], price: '$1,299', features: ['High-speed FPV racing', 'Carbon-fiber airframe', 'Low-latency HD digital transmission'], image: 'https://images.unsplash.com/photo-1774553988130-ccda57774818?w=600&q=80', active: true },
  { name: 'TDR-FPV Explorer', slug: 'tdr-fpv-explorer', category: 'FPV Drone', description: 'Pushes the boundaries of long-range FPV flight with 4K stabilized gimbal camera and dual-band Crossfire receiver.', specs: ['25min Flight', '4K FPV Feed', '8km Range', 'Stabilized Gimbal', 'Return-to-Home'], price: '$2,499', image: 'https://images.unsplash.com/photo-1507582020474-09a35b7d455d9?w=600&q=80', active: true },
  { name: 'TDR-Agri Spray', slug: 'tdr-agri-spray', category: 'Agricultural', description: 'Revolutionizes precision farming with automated crop treatment. 30-liter chemical tank with 6-meter carbon-fiber spray boom.', specs: ['30L Tank', '6m Spray Width', '35min Flight', 'RTK GPS', 'Auto Path Planning'], price: '$8,999', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', active: true },
  { name: 'TDR-Agri Survey', slug: 'tdr-agri-survey', category: 'Agricultural', description: 'Sophisticated crop health monitoring platform capturing multi-spectral imagery across 5 bands.', specs: ['Multi-spectral', 'NDVI/NDRE/RE', '60min Flight', 'AI Analytics', 'Field Reports'], price: '$11,999', image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80', active: true },
  { name: 'TDR-Fire Scout', slug: 'tdr-fire-scout', category: 'Fire Fighting', description: 'First-response aerial asset with 640x512 radiometric thermal camera for wildfire detection.', specs: ['Thermal 640×512', '40min Flight', '10km Range', 'FireProof Coating', 'Real-time Feed'], price: '$14,999', image: 'https://images.unsplash.com/photo-1506942596041-5f7d17c1bc2b?w=600&q=80', active: true },
  { name: 'TDR-Fire Response', slug: 'tdr-fire-response', category: 'Fire Fighting', description: 'Heavy-lift hexacopter engineered for direct fire suppression with 20-liter retardant deployment.', specs: ['20L Retardant', 'IR Camera', '50min Flight', 'Wind Resistant', 'Night Ops'], price: '$28,999', image: 'https://images.unsplash.com/photo-1533063319369-0de118afe00a?w=600&q=80', active: true },
  { name: 'TDR-Kamikaze Strike', slug: 'tdr-kamikaze-strike', category: 'Kamikaze', description: 'Compact loitering munition system for surgical precision strikes with AI-powered targeting.', specs: ['15min Loiter', '50km Range', 'Autonomous Targeting', 'Encrypted Link', 'CFRP Airframe'], price: 'Custom', image: 'https://images.unsplash.com/photo-1514043370531-a00dbd95c42e?w=600&q=80', active: true },
  { name: 'TDR-Kamikaze Swarm', slug: 'tdr-kamikaze-swarm', category: 'Kamikaze', description: 'Multi-unit loitering munition swarm with collaborative target selection via mesh network.', specs: ['8-Unit Swarm', 'Mesh Network', 'AI Target Select', '40km Range', 'Electronic Warfare'], price: 'Custom', image: 'https://images.unsplash.com/photo-1517926135831-72893b617719?w=600&q=80', active: true },
  { name: 'TDR-Custom Platform', slug: 'tdr-custom-platform', category: 'Customization', description: 'Fully bespoke drone built to your specifications — airframe, payload, avionics and mission software.', specs: ['Custom Airframe', 'Payload Integration', 'Custom Avionics', 'Mission Software', 'Certification'], price: 'Contact Us', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', active: true },
];

const blogPosts = [
  { title: 'The Future of Autonomous Drone Swarms in Disaster Response', slug: 'autonomous-drone-swarms-disaster-response', excerpt: 'How swarms of AI-coordinated drones are revolutionizing search and rescue.', content: 'Full article content here...', author: 'Dr. Sarah Chen', tags: ['AI', 'Swarm Tech', 'Rescue'], featured: true, published: true },
  { title: 'TDR-X1 Pro Review: First 100 Hours of Flight', slug: 'tdr-x1-pro-review', excerpt: 'Our engineering team put the new TDR-X1 Pro through extreme testing.', content: 'Full article content here...', author: 'Marcus Rivera', tags: ['Product', 'Review', 'Testing'], featured: true, published: true },
  { title: 'Beyond Visual Line of Sight: Regulatory Update 2026', slug: 'bvlos-regulatory-update-2026', excerpt: 'Overview of evolving BVLOS regulations for commercial drone operators.', content: 'Full article content here...', author: 'Alex Foster', tags: ['Regulation', 'BVLOS', 'Commercial'], published: true },
  { title: 'Thermal Imaging for Solar Farm Inspection', slug: 'thermal-imaging-solar-farm-inspection', excerpt: 'How TDR-M2 drones helped a 200MW solar farm detect 94% of panel defects.', content: 'Full article content here...', author: 'Priya Sharma', tags: ['Case Study', 'Thermal', 'Energy'], published: true },
  { title: 'Building a Digital Twin: From Point Cloud to BIM', slug: 'digital-twin-point-cloud-bim', excerpt: 'Guide to converting drone-captured LiDAR data into building information models.', content: 'Full article content here...', author: 'James Okonkwo', tags: ['Tutorial', 'LiDAR', 'BIM'], published: true },
  { title: 'Hydrogen Fuel Cells: The Next Frontier in Drone Endurance', slug: 'hydrogen-fuel-cells-drone-endurance', excerpt: 'How hydrogen-hybrid propulsion could extend drone flight times to 24+ hours.', content: 'Full article content here...', author: 'Dr. Sarah Chen', tags: ['Technology', 'Propulsion', 'R&D'], published: true },
  { title: 'TDR at AUVSI 2026: What We Showed', slug: 'tdr-auvisi-2026', excerpt: 'Recap of our presence at the world\'s largest unmanned systems conference.', content: 'Full article content here...', author: 'Marketing Team', tags: ['Events', 'Conference'], published: true },
  { title: 'Precision Agriculture: How Drones Are Feeding the Future', slug: 'precision-agriculture-drones', excerpt: 'Multi-spectral imaging and AI analytics are transforming farming.', content: 'Full article content here...', author: 'Aiko Tanaka', tags: ['Agriculture', 'Multi-spectral', 'AI'], published: true },
  { title: 'Drone Pilot Training: Beyond the Part 107 License', slug: 'drone-pilot-training-beyond-part-107', excerpt: 'Advanced training programs that separate professionals from hobbyists.', content: 'Full article content here...', author: 'Training Team', tags: ['Training', 'Career', 'Education'], published: true },
];

const jobs = [
  { title: 'Senior Autonomy Engineer', dept: 'Engineering', location: 'San Jose, CA', type: 'Full-time', description: 'Design autonomous flight algorithms for next-gen drone platforms.', requirements: ['PhD or MS in Robotics/CS/EE', '5+ years autonomous systems', 'ROS/ROS2 expertise', 'C++/Python proficiency', 'Sensor fusion'], active: true },
  { title: 'Computer Vision Engineer', dept: 'AI Research', location: 'San Jose, CA', type: 'Full-time', description: 'Develop CV models for real-time object detection and tracking.', requirements: ['MS/PhD in CV/ML', 'PyTorch/TensorFlow', 'Model optimization for edge', 'Object detection & tracking', 'Published research preferred'], active: true },
  { title: 'Hardware Design Engineer', dept: 'Engineering', location: 'San Jose, CA', type: 'Full-time', description: 'Design drone airframes, propulsion systems, and payload integration.', requirements: ['BS/MS in Mechanical/Aerospace Eng', '3+ years UAV design', 'CAD (SolidWorks/Onshape)', 'CFD and FEA analysis', 'Composite materials experience'], active: true },
  { title: 'Full Stack Developer', dept: 'Software', location: 'Remote (US)', type: 'Full-time', description: 'Build drone fleet management platform and ground control software.', requirements: ['5+ years full stack dev', 'React/Node.js/TypeScript', 'PostgreSQL/MongoDB', 'GraphQL API design', 'Real-time data visualization'], active: true },
  { title: 'Field Operations Specialist', dept: 'Operations', location: 'Multiple US Cities', type: 'Full-time', description: 'Conduct on-site drone flight operations for client projects.', requirements: ['FAA Part 107 certified', '500+ flight hours', 'Enterprise drone experience', 'Excellent communication', 'Willingness to travel 60%'], active: true },
  { title: 'Technical Writer', dept: 'Product', location: 'Remote (US)', type: 'Contract', description: 'Create comprehensive technical documentation and user manuals.', requirements: ['3+ years technical writing', 'Documentation tools experience', 'Complex system comprehension', 'Portfolio of work', 'STEM background preferred'], active: true },
];

console.log('Seeding database...');

db.collection('products').deleteMany();
db.collection('products').insertMany(products);
console.log(`Seeded ${products.length} products`);

const postsWithDates = blogPosts.map((p, i) => ({ ...p, createdAt: new Date(Date.now() - i * 86400000).toISOString() }));
db.collection('blogPosts').deleteMany();
db.collection('blogPosts').insertMany(postsWithDates);
console.log(`Seeded ${blogPosts.length} blog posts`);

db.collection('jobs').deleteMany();
db.collection('jobs').insertMany(jobs);
console.log(`Seeded ${jobs.length} jobs`);

const existing = db.collection('admins').findOne({ email: 'admin@technodronerobotics.com' });
if (!existing) {
  db.collection('admins').insertOne({
    name: 'TDR Admin',
    email: 'admin@technodronerobotics.com',
    password: hashPassword('Admin@2026!'),
    role: 'admin',
  });
  console.log('Created default admin (email: admin@technodronerobotics.com, password: Admin@2026!)');
} else {
  console.log('Admin already exists');
}

console.log('\nSeed complete!');
