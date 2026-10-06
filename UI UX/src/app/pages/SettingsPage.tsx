import { useState } from 'react';
import { User, Lock, Bell, Globe, Upload, Camera, Save, X } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface SettingsPageProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const translations = {
  en: {
    accountSettings: 'Account Settings',
    profileInfo: 'Profile Info',
    security: 'Security & Password',
    notifications: 'Notifications',
    language: 'Language & Region',
    fullName: 'Full Name',
    bio: 'Professional Bio',
    email: 'Email Address',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    emailNotifications: 'Email Notifications',
    eventReminders: 'Event Reminders',
    promotions: 'Promotions & Updates',
    weeklyNewsletter: 'Weekly Newsletter',
    preferredLanguage: 'Preferred Language',
    timezone: 'Timezone',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    uploadPhoto: 'Upload Photo',
    english: 'English',
    arabic: 'Arabic',
  },
  ar: {
    accountSettings: 'إعدادات الحساب',
    profileInfo: 'معلومات الملف الشخصي',
    security: 'الأمان وكلمة المرور',
    notifications: 'الإشعارات',
    language: 'اللغة والمنطقة',
    fullName: 'الاسم الكامل',
    bio: 'السيرة المهنية',
    email: 'البريد الإلكتروني',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    emailNotifications: 'إشعارات البريد الإلكتروني',
    eventReminders: 'تذكيرات الفعاليات',
    promotions: 'العروض والتحديثات',
    weeklyNewsletter: 'النشرة الأسبوعية',
    preferredLanguage: 'اللغة المفضلة',
    timezone: 'المنطقة الزمنية',
    saveChanges: 'حفظ التغييرات',
    cancel: 'إلغاء',
    uploadPhoto: 'رفع صورة',
    english: 'الإنجليزية',
    arabic: 'العربية',
  },
};

export function SettingsPage({ language, setLanguage }: SettingsPageProps) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'language'>('profile');
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

  const tabs = [
    { id: 'profile', icon: User, label: t.profileInfo },
    { id: 'security', icon: Lock, label: t.security },
    { id: 'notifications', icon: Bell, label: t.notifications },
    { id: 'language', icon: Globe, label: t.language },
  ];

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <h1 className="text-4xl text-white mb-8">{t.accountSettings}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Tab Menu */}
          <aside className="lg:col-span-1">
            <div className="bg-[#1a1a2e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Column - Main Workspace */}
          <div className="lg:col-span-3">
            <div className="bg-[#1a1a2e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl text-white mb-6">{t.profileInfo}</h2>

                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6 mb-8">
                    <div
                      className="relative"
                      onMouseEnter={() => setIsHoveringAvatar(true)}
                      onMouseLeave={() => setIsHoveringAvatar(false)}
                    >
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {isHoveringAvatar && (
                        <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center cursor-pointer">
                          <Camera className="text-white" size={24} />
                        </div>
                      )}
                    </div>
                    <div>
                      <button className="px-6 py-2 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors flex items-center gap-2">
                        <Upload size={18} />
                        {t.uploadPhoto}
                      </button>
                      <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF (Max 2MB)</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className="block text-gray-300 mb-2">{t.fullName}</label>
                    <input
                      type="text"
                      defaultValue="Ahmed Al-Mansouri"
                      className="w-full bg-[#0f0f1e] border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">{t.bio}</label>
                    <textarea
                      rows={4}
                      defaultValue="Event organizer and tech enthusiast. Passionate about creating memorable experiences."
                      className="w-full bg-[#0f0f1e] border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">{t.email}</label>
                    <input
                      type="email"
                      defaultValue="ahmed@example.com"
                      className="w-full bg-[#0f0f1e] border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl text-white mb-6">{t.security}</h2>

                  <div>
                    <label className="block text-gray-300 mb-2">{t.currentPassword}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0f0f1e] border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">{t.newPassword}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0f0f1e] border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">{t.confirmPassword}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0f0f1e] border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-6">
                    <p className="text-sm text-blue-300">
                      Password must be at least 8 characters and include uppercase, lowercase, and numbers.
                    </p>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl text-white mb-6">{t.notifications}</h2>

                  {[
                    { id: 'email', label: t.emailNotifications, defaultChecked: true },
                    { id: 'reminders', label: t.eventReminders, defaultChecked: true },
                    { id: 'promotions', label: t.promotions, defaultChecked: false },
                    { id: 'newsletter', label: t.weeklyNewsletter, defaultChecked: true },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-[#0f0f1e]/50 rounded-xl border border-purple-500/10">
                      <span className="text-white">{item.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={item.defaultChecked}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-blue-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Language Tab */}
              {activeTab === 'language' && (
                <div className="space-y-6">
                  <h2 className="text-2xl text-white mb-6">{t.language}</h2>

                  <div>
                    <label className="block text-gray-300 mb-2">{t.preferredLanguage}</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
                      className="w-full bg-[#0f0f1e] border border-purple-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    >
                      <option value="en">{t.english}</option>
                      <option value="ar">{t.arabic}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">{t.timezone}</label>
                    <select className="w-full bg-[#0f0f1e] border border-purple-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all">
                      <option>UTC +4:00 (Dubai, UAE)</option>
                      <option>UTC +3:00 (Riyadh, Saudi Arabia)</option>
                      <option>UTC +2:00 (Cairo, Egypt)</option>
                      <option>UTC +0:00 (London, UK)</option>
                      <option>UTC -5:00 (New York, USA)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-purple-500/10">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2">
                  <Save size={18} />
                  {t.saveChanges}
                </button>
                <button className="px-8 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                  <X size={18} />
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
