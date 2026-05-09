import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'Villa Tân Cổ Điển Cần Thơ',
    category: 'Biệt Thự',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2071',
    year: '2023'
  },
  {
    title: 'Penthouse Skyline Luxury',
    category: 'Nội Thất',
    image: '/src/assets/images/regenerated_image_1778332918869.png',
    year: '2023'
  },
  {
    title: 'Nhà Phố Hiện Đại 3 Tầng',
    category: 'Nhà Phố',
    image: '/src/assets/images/regenerated_image_1778332923027.png',
    year: '2022'
  }
];

export default function FeaturedProjects() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 bg-brown-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-4">{t('projects.title')}</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brown-dark">Những Công Trình <span className="text-gold italic font-normal">Tiêu Biểu</span></h3>
          </motion.div>
          
          <Link 
            to="/projects" 
            className="flex items-center gap-2 text-stone-500 hover:text-gold transition-colors uppercase text-sm tracking-widest font-bold group"
          >
            {t('projects.viewAll')}
            <motion.div
              whileHover={{ x: 3, y: -3 }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden aspect-[3/4] shadow-xl"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-gold text-xs uppercase tracking-widest mb-2 block font-bold">{project.category} — {project.year}</span>
                <h4 className="text-2xl font-serif font-bold text-white mb-6 leading-tight">{project.title}</h4>
                <Link 
                  to={`/projects/${index}`} 
                  className="inline-flex items-center gap-2 text-white border-b border-gold/50 pb-1 text-sm font-bold uppercase tracking-widest hover:border-gold transition-all"
                >
                  Xem chi tiết
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
