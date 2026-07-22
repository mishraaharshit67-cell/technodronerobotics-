import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import BlogPost from './models/BlogPost.js';
import Job from './models/Job.js';
import Admin from './models/Admin.js';

dotenv.config();

const products = [
  { name: 'TDR-FPV Racer', slug: 'tdr-fpv-racer', category: 'FPV Drone', description: 'The TDR-FPV Racer is built for speed freaks and competitive drone racers. Featuring a lightweight carbon-fiber airframe, high-KV brushless motors, and a low-latency HD digital FPV system, it delivers an immersive flight experience at speeds up to 120 km/h.', specs: ['120km/h Top Speed', 'HD FPV 120fps', '15min Flight', '4km Range', 'Digital VTX'], price: '$1,299', features: ['High-speed FPV racing', 'Carbon-fiber airframe', 'Low-latency HD digital transmission'], image: 'https://images.unsplash.com/photo-1774553988130-ccda57774818?w=600&q=80', active: true },
  { name: 'TDR-FPV Explorer', slug: 'tdr-fpv-explorer', category: 'FPV Drone', description: 'The TDR-FPV Explorer pushes the boundaries of long-range FPV flight. Equipped with a 4K stabilized gimbal camera, dual-band Crossfire receiver, and a high-capacity Li-Ion pack.', specs: ['25min Flight', '4K FPV Feed', '8km Range', 'Stabilized Gimbal', 'Return-to-Home'], price: '$2,499', image: 'https://images.unsplash.com/photo-1507582020474-09a35b7d455d9?w=600&q=80', active: true },
  { name: 'TDR-Agri Spray', slug: 'tdr-agri-spray', category: 'Agricultural', description: 'The TDR-Agri Spray revolutionizes precision farming with automated crop treatment. Its 30-liter chemical tank paired with a 6-meter carbon-fiber spray boom delivers uniform coverage at 2 hectares per hour.', specs: ['30L Tank', '6m Spray Width', '35min Flight', 'RTK GPS', 'Auto Path Planning'], price: '$8,999', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', active: true },
  { name: 'TDR-Agri Survey', slug: 'tdr-agri-survey', category: 'Agricultural', description: 'The TDR-Agri Survey is a sophisticated crop health monitoring platform that captures multi-spectral imagery across 5 bands for precision farming.', specs: ['Multi-spectral', 'NDVI/NDRE/RE', '60min Flight', 'AI Analytics', 'Field Reports'], price: '$11,999', image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80', active: true },
  { name: 'TDR-Fire Scout', slug: 'tdr-fire-scout', category: 'Fire Fighting', description: 'The TDR-Fire Scout is a first-response aerial asset with 640x512 radiometric thermal camera for wildfire detection and hot spot mapping.', specs: ['Thermal 640×512', '40min Flight', '10km Range', 'FireProof Coating', 'Real-time Feed'], price: '$14,999', image: 'https://images.unsplash.com/photo-1506942596041-5f7d17c1bc2b?w=600&q=80', active: true },
  { name: 'TDR-Fire Response', slug: 'tdr-fire-response', category: 'Fire Fighting', description: 'Heavy-lift hexacopter engineered for direct fire suppression with 20-liter retardant deployment system.', specs: ['20L Retardant', 'IR Camera', '50min Flight', 'Wind Resistant', 'Night Ops'], price: '$28,999', image: 'https://images.unsplash.com/photo-1533063319369-0de118afe00a?w=600&q=80', active: true },
  { name: 'TDR-Kamikaze Strike', slug: 'tdr-kamikaze-strike', category: 'Kamikaze', description: 'Compact, rapidly deployable loitering munition system designed for surgical precision strikes with AI-powered targeting.', specs: ['15min Loiter', '50km Range', 'Autonomous Targeting', 'Encrypted Link', 'CFRP Airframe'], price: 'Custom', image: 'https://images.unsplash.com/photo-1514043370531-a00dbd95c42e?w=600&q=80', active: true },
  { name: 'TDR-Kamikaze Swarm', slug: 'tdr-kamikaze-swarm', category: 'Kamikaze', description: 'Multi-unit loitering munition swarm with collaborative target selection and coordinated strikes via mesh network.', specs: ['8-Unit Swarm', 'Mesh Network', 'AI Target Select', '40km Range', 'Electronic Warfare'], price: 'Custom', image: 'https://images.unsplash.com/photo-1517926135831-72893b617719?w=600&q=80', active: true },
  { name: 'TDR-Custom Platform', slug: 'tdr-custom-platform', category: 'Customization', description: 'Fully bespoke drone built to your exact specifications — airframe, payload, avionics and mission-specific software.', specs: ['Custom Airframe', 'Payload Integration', 'Custom Avionics', 'Mission Software', 'Certification'], price: 'Contact Us', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', active: true },
];

const blogPosts = [
  { title: 'The Future of Autonomous Drone Swarms in Disaster Response', slug: 'autonomous-drone-swarms-disaster-response', excerpt: 'How swarms of AI-coordinated drones are revolutionizing search and rescue operations in disaster zones.', content: 'Full article content here...', author: 'Dr. Sarah Chen', tags: ['AI', 'Swarm Tech', 'Rescue'], featured: true, published: true },
  { title: 'TDR-X1 Pro Review: First 100 Hours of Flight', slug: 'tdr-x1-pro-review', excerpt: 'Our engineering team put the new TDR-X1 Pro through extreme testing. Here\'s what we found.', content: 'Full article content here...', author: 'Marcus Rivera', tags: ['Product', 'Review', 'Testing'], featured: true, published: true },
  { title: 'Beyond Visual Line of Sight: Regulatory Update 2026', slug: 'bvlos-regulatory-update-2026', excerpt: 'A comprehensive overview of evolving BVLOS regulations and what they mean for commercial drone operators.', content: 'Full article content here...', author: 'Alex Foster', tags: ['Regulation', 'BVLOS', 'Commercial'], published: true },
  { title: 'Thermal Imaging for Solar Farm Inspection', slug: 'thermal-imaging-solar-farm-inspection', excerpt: 'How TDR-M2 drones with thermal cameras helped a 200MW solar farm detect 94% of panel defects.', content: 'Full article content here...', author: 'Priya Sharma', tags: ['Case Study', 'Thermal', 'Energy'], published: true },
  { title: 'Building a Digital Twin: From Point Cloud to BIM', slug: 'digital-twin-point-cloud-bim', excerpt: 'Step-by-step guide to converting drone-captured LiDAR data into building information models.', content: 'Full article content here...', author: 'James Okonkwo', tags: ['Tutorial', 'LiDAR', 'BIM'], published: true },
  { title: 'Hydrogen Fuel Cells: The Next Frontier in Drone Endurance', slug: 'hydrogen-fuel-cells-drone-endurance', excerpt: 'How hydrogen-hybrid propulsion systems could extend drone flight times to 24+ hours.', content: 'Full article content here...', author: 'Dr. Sarah Chen', tags: ['Technology', 'Propulsion', 'R&D'], published: true },
  { title: 'TDR at AUVSI 2026: What We Showed', slug: 'tdr-auvisi-2026', excerpt: 'Recap of our presence at the world\'s largest unmanned systems conference and expo.', content: 'Full article content here...', author: 'Marketing Team', tags: ['Events', 'Conference'], published: true },
  { title: 'Precision Agriculture: How Drones Are Feeding the Future', slug: 'precision-agriculture-drones', excerpt: 'Multi-spectral imaging and AI analytics are transforming farming. Here\'s how.', content: 'Full article content here...', author: 'Aiko Tanaka', tags: ['Agriculture', 'Multi-spectral', 'AI'], published: true },
  { title: 'Drone Pilot Training: Beyond the Part 107 License', slug: 'drone-pilot-training-beyond-part-107', excerpt: 'Advanced training programs that separate professional operators from hobbyists.', content: 'Full article content here...', author: 'Training Team', tags: ['Training', 'Career', 'Education'], published: true },
];

const jobs = [
  { title: 'Senior Autonomy Engineer', dept: 'Engineering', location: 'San Jose, CA', type: 'Full-time', description: 'Design and implement autonomous flight algorithms for our next-generation drone platforms.', requirements: ['PhD or MS in Robotics/CS/EE', '5+ years autonomous systems', 'ROS/ROS2 expertise', 'C++/Python proficiency', 'Experience with sensor fusion'], active: true },
  { title: 'Computer Vision Engineer', dept: 'AI Research', location: 'San Jose, CA', type: 'Full-time', description: 'Develop cutting-edge computer vision models for real-time object detection and tracking.', requirements: ['MS/PhD in CV/ML', 'PyTorch/TensorFlow', 'Model optimization for edge', 'Object detection & tracking', 'Published research preferred'], active: true },
  { title: 'Hardware Design Engineer', dept: 'Engineering', location: 'San Jose, CA', type: 'Full-time', description: 'Design and validate drone airframes, propulsion systems, and payload integration.', requirements: ['BS/MS in Mechanical/Aerospace Eng', '3+ years UAV design', 'CAD (SolidWorks/Onshape)', 'CFD and FEA analysis', 'Composite materials experience'], active: true },
  { title: 'Full Stack Developer', dept: 'Software', location: 'Remote (US)', type: 'Full-time', description: 'Build and maintain our drone fleet management platform and ground control software.', requirements: ['5+ years full stack dev', 'React/Node.js/TypeScript', 'PostgreSQL/MongoDB', 'GraphQL API design', 'Real-time data visualization'], active: true },
  { title: 'Field Operations Specialist', dept: 'Operations', location: 'Multiple US Cities', type: 'Full-time', description: 'Conduct on-site drone flight operations for client projects.', requirements: ['FAA Part 107 certified', '500+ flight hours', 'Experience with enterprise drones', 'Excellent communication', 'Willingness to travel 60%'], active: true },
  { title: 'Technical Writer', dept: 'Product', location: 'Remote (US)', type: 'Contract', description: 'Create comprehensive technical documentation and user manuals.', requirements: ['3+ years technical writing', 'Experience with documentation tools', 'Ability to understand complex systems', 'Portfolio of work', 'STEM background preferred'], active: true },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tdr');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Product.deleteMany({}),
      BlogPost.deleteMany({}),
      Job.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Seed products
    const seededProducts = await Product.insertMany(products);
    console.log(`Seeded ${seededProducts.length} products`);

    // Seed blog posts (add createdAt dates)
    const postsWithDates = blogPosts.map((p, i) => ({
      ...p,
      createdAt: new Date(Date.now() - i * 86400000),
    }));
    const seededPosts = await BlogPost.insertMany(postsWithDates);
    console.log(`Seeded ${seededPosts.length} blog posts`);

    // Seed jobs
    const seededJobs = await Job.insertMany(jobs);
    console.log(`Seeded ${seededJobs.length} jobs`);

    // Check if admin exists
    const adminExists = await Admin.findOne({ email: 'admin@technodronerobotics.com' });
    if (!adminExists) {
      await Admin.create({
        name: 'TDR Admin',
        email: 'admin@technodronerobotics.com',
        password: 'Admin@2026!',
        role: 'admin',
      });
      console.log('Created default admin (email: admin@technodronerobotics.com, password: Admin@2026!)');
    } else {
      console.log('Admin already exists');
    }

    console.log('\nSeed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
