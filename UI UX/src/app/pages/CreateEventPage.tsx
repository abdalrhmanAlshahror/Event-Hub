import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Upload, Calendar, MapPin, DollarSign, Users, Tag, FileText, Image as ImageIcon } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface CreateEventPageProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const translations = {
  en: {
    back: 'Back to Dashboard',
    createEvent: 'Create New Event',
    step: 'Step',
    of: 'of',
    eventDetails: 'Event Details',
    eventTitle: 'Event Title',
    description: 'Description',
    category: 'Category',
    selectCategory: 'Select a category',
    dateTime: 'Date & Time',
    eventDate: 'Event Date',
    eventTime: 'Event Time',
    location: 'Location',
    venue: 'Venue',
    pricing: 'Pricing & Capacity',
    ticketPrice: 'Ticket Price',
    capacity: 'Maximum Capacity',
    coverImage: 'Cover Image',
    dragDrop: 'Drag and drop your image here, or click to browse',
    supportedFormats: 'Supported formats: JPG, PNG (Max 5MB)',
    back: 'Back',
    next: 'Next',
    publish: 'Publish Event',
    technology: 'Technology',
    music: 'Music',
    art: 'Art & Culture',
    food: 'Food & Drink',
    sports: 'Sports',
    business: 'Business',
  },
  ar: {
    back: 'العودة للوحة التحكم',
    createEvent: 'إنشاء فعالية جديدة',
    step: 'خطوة',
    of: 'من',
    eventDetails: 'تفاصيل الفعالية',
    eventTitle: 'عنوان الفعالية',
    description: 'الوصف',
    category: 'الفئة',
    selectCategory: 'اختر فئة',
    dateTime: 'التاريخ والوقت',
    eventDate: 'تاريخ الفعالية',
    eventTime: 'وقت الفعالية',
    location: 'الموقع',
    venue: 'المكان',
    pricing: 'التسعير والسعة',
    ticketPrice: 'سعر التذكرة',
    capacity: 'الحد الأقصى للسعة',
    coverImage: 'صورة الغلاف',
    dragDrop: 'اسحب وأفلت صورتك هنا، أو انقر للاستعراض',
    supportedFormats: 'الصيغ المدعومة: JPG، PNG (الحد الأقصى 5 ميجابايت)',
    back: 'رجوع',
    next: 'التالي',
    publish: 'نشر الفعالية',
    technology: 'التكنولوجيا',
    music: 'الموسيقى',
    art: 'الفن والثقافة',
    food: 'الطعام والشراب',
    sports: 'الرياضة',
    business: 'الأعمال',
  },
};

export function CreateEventPage({ language, setLanguage }: CreateEventPageProps) {
  const t = translations[language];
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    price: '',
    capacity: '',
    image: null as File | null,
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const categories = [
    t.technology,
    t.music,
    t.art,
    t.food,
    t.sports,
    t.business,
  ];

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-6 py-12">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          {t.back}
        </Link>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl text-white mb-4">{t.createEvent}</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>{t.step} {currentStep} {t.of} {totalSteps}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-1/4 h-2 rounded-full mx-1 transition-all ${
                    step <= currentStep
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8">
            {/* Step 1: Event Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-white mb-6">{t.eventDetails}</h2>

                <div>
                  <label className="block text-gray-300 mb-2">{t.eventTitle}</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-[#1a1a2e] border border-purple-500/20 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Enter event title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">{t.description}</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    className="w-full bg-[#1a1a2e] border border-purple-500/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                    placeholder="Describe your event..."
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">{t.category}</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#1a1a2e] border border-purple-500/20 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none"
                    >
                      <option value="">{t.selectCategory}</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-white mb-6">{t.dateTime}</h2>

                <div>
                  <label className="block text-gray-300 mb-2">{t.eventDate}</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#1a1a2e] border border-purple-500/20 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">{t.eventTime}</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#1a1a2e] border border-purple-500/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">{t.location}</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full bg-[#1a1a2e] border border-purple-500/20 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Enter venue address"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pricing & Capacity */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-white mb-6">{t.pricing}</h2>

                <div>
                  <label className="block text-gray-300 mb-2">{t.ticketPrice}</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-[#1a1a2e] border border-purple-500/20 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">{t.capacity}</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="w-full bg-[#1a1a2e] border border-purple-500/20 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Enter maximum capacity"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Cover Image */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl text-white mb-6">{t.coverImage}</h2>

                <div>
                  <label
                    htmlFor="image-upload"
                    className="block border-2 border-dashed border-purple-500/30 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-500/50 transition-colors bg-[#1a1a2e]/30"
                  >
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-4">
                      {formData.image ? (
                        <div className="space-y-4">
                          <ImageIcon className="text-green-400 mx-auto" size={48} />
                          <div className="text-white">{formData.image.name}</div>
                        </div>
                      ) : (
                        <>
                          <Upload className="text-purple-400" size={48} />
                          <div>
                            <div className="text-white mb-2">{t.dragDrop}</div>
                            <div className="text-sm text-gray-400">{t.supportedFormats}</div>
                          </div>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-purple-500/10">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-8 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.back}
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  {t.next}
                </button>
              ) : (
                <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all relative overflow-hidden group">
                  <span className="relative z-10">{t.publish}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
