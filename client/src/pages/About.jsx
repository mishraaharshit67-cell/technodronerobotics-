import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiAward, FiCpu, FiBookOpen, FiTool, FiUsers, FiTrendingUp, FiShield, FiFileText } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';

const coreServices = [
  { icon: FiCpu, title: 'Drone Manufacturing', desc: 'Industrial, educational, and customized drones built for diverse operational requirements.' },
  { icon: FiTool, title: 'Robotic Systems', desc: 'Design and development of intelligent robotic platforms and AI-enabled automation solutions.' },
  { icon: FiBookOpen, title: 'DIY STEM Kits', desc: 'Hands-on Drone & Robotics kits covering electronics, programming, aerodynamics, AI, and IoT.' },
  { icon: FiTarget, title: 'Lab Setup', desc: 'Turnkey Drone & Robotics laboratories for schools, colleges, universities, and skill centers.' },
  { icon: FiShield, title: 'RPTO Assistance', desc: 'End-to-end support for establishing Remote Pilot Training Organisations with DGCA compliance.' },
  { icon: FiUsers, title: 'Training & Certification', desc: 'Comprehensive programs in drone tech, UAV assembly, piloting, robotics, AI, and embedded systems.' },
  { icon: FiTrendingUp, title: 'R&D Solutions', desc: 'Research and development partnerships for cutting-edge drone and robotics innovation.' },
  { icon: FiAward, title: 'Annual Maintenance', desc: 'Technical support and maintenance services for sustained operational excellence.' },
];

export default function About() {
  return (
    <PageTransition>
      <SEOHead
        title="About Us | Techno Drone Robotics Private Limited"
        description="Techno Drone Robotics Private Limited - An innovative Indian technology company specializing in advanced UAVs, intelligent robotics, STEM education, and drone laboratory solutions."
        path="/about"
      />

      <main>
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">Techno Drone Robotics</span> Private Limited
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
              An innovative Indian technology company specializing in the design, development, manufacturing, and deployment of advanced Unmanned Aerial Systems (UAS), intelligent robotic solutions, and STEM education technologies. With a strong commitment to innovation, quality, and indigenous manufacturing, we strive to bridge the gap between cutting-edge technology and practical real-world applications across education, industry, agriculture, research, and government sectors.
            </motion.p>
          </div>

          {/* Full Description */}
          <div className="space-y-6 mb-20 max-w-5xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-gray-600 leading-relaxed">
              As a leading manufacturer of drones and robotic systems, we develop reliable, high-performance, and application-specific solutions tailored to meet diverse operational requirements. Our comprehensive product portfolio includes industrial drones, educational drones, autonomous robotic platforms, AI-enabled robots, and customized automation solutions designed to enhance productivity, learning, and technological advancement.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="text-gray-600 leading-relaxed">
              Recognizing the importance of skill development and future-ready education, Techno Drone Robotics offers a wide range of DIY STEM Drone and Robotics Kits that provide hands-on learning experiences for students, educators, makers, and innovators. These kits are carefully designed to promote practical understanding of electronics, programming, aerodynamics, embedded systems, artificial intelligence, IoT, and robotics while aligning with modern educational standards.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-gray-600 leading-relaxed">
              We are also a trusted partner for establishing Drone and Robotics Laboratories in schools, colleges, universities, polytechnic institutes, engineering institutions, Industrial Training Institutes (ITIs), skill development centers, and research organizations. Our turnkey laboratory solutions include infrastructure planning, equipment procurement, curriculum integration, installation, faculty development, training programs, technical documentation, and long-term technical support, enabling institutions to build world-class innovation ecosystems.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-gray-600 leading-relaxed">
              In addition to manufacturing and laboratory solutions, Techno Drone Robotics provides professional consultancy and assistance for the establishment of Remote Pilot Training Organisations (RPTOs). Our expert team supports organizations throughout the setup process, including regulatory guidance, DGCA compliance assistance, infrastructure planning, procurement support, documentation, operational planning, and implementation strategies to facilitate successful RPTO establishment.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-600 leading-relaxed">
              To address the growing demand for skilled professionals in the drone and robotics sector, we conduct comprehensive training and certification programs for students, educators, professionals, government personnel, startups, and industry participants. Our training covers drone technology, UAV assembly and maintenance, drone piloting, robotics, embedded systems, AI, IoT, computer vision, automation, and emerging technologies through a combination of theoretical instruction and extensive practical exposure.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }} className="text-gray-700 leading-relaxed font-medium">
              At Techno Drone Robotics, we believe that innovation is driven by knowledge, hands-on experience, and continuous technological advancement. Our mission is to empower educational institutions, industries, government organizations, and aspiring technologists with high-quality products, practical training, and comprehensive technology solutions that contribute to India's vision of becoming a global leader in advanced manufacturing, robotics, and drone technology.
            </motion.p>
          </div>

          {/* Core Services */}
          <SectionTitle title="Our Core Services" subtitle="Comprehensive drone and robotics solutions from manufacturing to training and lab setup." />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {coreServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card text-center p-5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/10 to-electric-subtle flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="text-electric" size={24} />
                </div>
                <h3 className="text-sm font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Vision Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <FiEye className="text-electric mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                To be a global leader in advanced manufacturing, robotics, and drone technology — empowering industries and educational institutions with indigenous, cutting-edge solutions that drive innovation and technological self-reliance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <FiTarget className="text-electric mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                To empower educational institutions, industries, government organizations, and aspiring technologists with high-quality products, practical training, and comprehensive technology solutions that bridge the gap between cutting-edge innovation and real-world applications.
              </p>
            </motion.div>
          </div>

          {/* Core Services List */}
          <div className="max-w-4xl mx-auto">
            <SectionTitle title="What We Offer" subtitle="Driven by innovation, precision engineering, and a commitment to excellence." />

            <div className="space-y-3">
              {[
                'Manufacturing of Industrial, Educational, and Customized Drones',
                'Design and Development of Intelligent Robotic Systems',
                'DIY STEM Drone & Robotics Kits',
                'Drone & Robotics Laboratory Setup for Educational Institutions',
                'RPTO (Remote Pilot Training Organisation) Setup Assistance',
                'Drone Technology, Robotics, AI, IoT & Embedded Systems Training',
                'Research & Development Solutions',
                'Technical Consultancy and Project Development',
                'Annual Maintenance & Technical Support Services',
                'Customized Drone and Robotics Solutions for Industry and Government',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-electric to-electric-dark shrink-0" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Objects of the Company */}
          <div className="max-w-5xl mx-auto mt-24">
            <SectionTitle title="Main Objects of the Company" subtitle="As per the Memorandum of Association of Techno Drone Robotics Private Limited" />

            <div className="space-y-8">
              {[
                {
                  num: 1,
                  text: 'To carry on the business of designing, researching, developing, manufacturing, assembling, fabricating, processing, installing, testing, commissioning, repairing, maintaining, importing, exporting, buying, selling, distributing and otherwise dealing in drones, unmanned aerial vehicles (UAVs), remotely piloted aircraft systems (RPAS), autonomous systems, robots, robotic equipment, industrial automation systems, mechatronic systems, embedded systems, electronic and electromechanical equipment and allied machinery.'
                },
                {
                  num: 2,
                  text: 'To manufacture, assemble, develop, fabricate, calibrate, install and deal in drone and robotic components including airframes, motors, propellers, batteries, battery management systems, flight controllers, GPS, navigation systems, communication systems, telemetry systems, autopilot systems, sensors, cameras, LiDAR, radar, antennas, payloads, PCB assemblies, embedded controllers, robotic parts, spare parts, accessories and allied equipment.'
                },
                {
                  num: 3,
                  text: 'To undertake research, engineering, software development and innovation in Artificial Intelligence (AI), Machine Learning (ML), Computer Vision, Internet of Things (IoT), embedded systems, automation, cloud computing, data analytics, robotics, autonomous technologies and allied digital solutions, and to develop related software, firmware and applications.'
                },
                {
                  num: 4,
                  text: 'To manufacture, develop, supply and deal in educational products including STEM/STEAM kits, DIY drone kits, robotics kits, AI and IoT kits, electronics kits, laboratory equipment, educational software, training equipment and project-based learning solutions for schools, colleges, universities, industries and research institutions.'
                },
                {
                  num: 5,
                  text: 'To establish, design, supply, install, commission and maintain Drone Labs, Robotics Labs, Artificial Intelligence Labs, IoT Labs, Electronics Labs, Automation Labs, Makerspaces, Innovation Centres, Centres of Excellence, Skill Development Centres, Research Laboratories and Training Centres for educational institutions, industries, government organisations and private entities.'
                },
                {
                  num: 6,
                  text: 'To establish and operate training institutes, academies and research centres and to provide education, certification, consultancy, workshops, faculty development programmes, industrial training, internships, maintenance, technical support and related services in drones, robotics, AI, automation, electronics and allied technologies.'
                },
                {
                  num: 7,
                  text: 'To provide drone and robotic solutions and services including aerial surveying, GIS mapping, photogrammetry, agriculture, inspection, surveillance, logistics, disaster management, search and rescue, industrial automation, photography, videography and other lawful commercial, industrial and government applications.'
                },
                {
                  num: 8,
                  text: 'To acquire, develop, register, license, assign, protect and commercially exploit patents, trademarks, copyrights, industrial designs, software, firmware, technical know-how, intellectual property rights and proprietary technologies, and to undertake consultancy, turnkey projects, government contracts, import, export and other lawful business activities connected with the objects of the Company.'
                },
              ].map((obj) => (
                <motion.div
                  key={obj.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-5 p-6 rounded-xl border border-electric/10 bg-white shadow-sm hover:border-electric/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric to-electric-dark flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">
                    {obj.num}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{obj.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
      </main>
    </PageTransition>
  );
}
