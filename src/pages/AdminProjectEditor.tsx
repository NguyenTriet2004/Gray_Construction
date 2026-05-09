import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, auth, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { Save, ArrowLeft, Image as ImageIcon, LayoutGrid, MapPin, Calendar } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminProjectEditor() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Biệt Thự',
    year: new Date().getFullYear().toString(),
    location: '',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2071',
    description: '',
    details: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate('/login');
        return;
      }
      
      if (user.email === 'triet1509w@gmail.com') {
        setIsAdmin(true);
        return;
      }

      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error("Error checking admin status:", err);
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const path = 'projects';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp()
      });
      alert('Đã đăng dự án thành công!');
      navigate('/admin');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="pt-32 pb-24 bg-brown-light min-h-screen px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/admin" className="flex items-center gap-2 text-stone-500 hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest mb-10">
          <ArrowLeft size={16} /> Quay lại Dashboard
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 shadow-2xl border border-stone-100"
        >
          <div className="mb-12 border-b border-stone-100 pb-8">
            <h1 className="text-3xl font-serif font-bold text-brown-dark mb-2">Đăng Dự Án Mới</h1>
            <p className="text-stone-400 text-sm">Cập nhật hồ sơ năng lực của công ty.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">Tên dự án</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif text-lg text-brown-dark" 
                  placeholder="VD: Biệt Thự Tân Cổ Điển..." 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">Danh mục công trình</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all italic text-stone-500"
                >
                  <option>Biệt Thự</option>
                  <option>Nhà Phố</option>
                  <option>Nội Thất</option>
                  <option>Công Nghiệp</option>
                  <option>Thương Mại</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2 flex items-center gap-2">
                  <Calendar size={12} /> Năm thực hiện
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.year}
                  onChange={e => setFormData({...formData, year: e.target.value})}
                  className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif text-stone-500" 
                  placeholder="2024" 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2 flex items-center gap-2">
                  <MapPin size={12} /> Địa điểm
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif text-stone-500" 
                  placeholder="VD: Cần Thơ" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">Hình ảnh tiêu biểu (URL)</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="flex-1 bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif text-stone-500 text-sm" 
                  placeholder="Link ảnh công trình..." 
                />
                <div className="w-12 h-12 bg-stone-100 flex items-center justify-center text-stone-300">
                  <ImageIcon size={20} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">Giới thiệu dự án</label>
              <textarea 
                rows={3}
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif italic text-stone-500" 
                placeholder="Mô tả tổng quát về phong cách và yêu cầu của chủ đầu tư..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">Thông tin kỹ thuật / Chi tiết</label>
              <textarea 
                rows={6}
                required
                value={formData.details}
                onChange={e => setFormData({...formData, details: e.target.value})}
                className="w-full bg-stone-50 border border-stone-200 focus:border-gold outline-none p-6 transition-all font-serif leading-relaxed text-stone-600" 
                placeholder="Diện tích, quy mô, các hạng mục thi công cụ thể..."
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brown-dark text-gold font-bold py-6 uppercase tracking-[0.3em] text-xs hover:bg-gold hover:text-white transition-all shadow-xl flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Lưu và Công Bố Dự Án'} <Save size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
