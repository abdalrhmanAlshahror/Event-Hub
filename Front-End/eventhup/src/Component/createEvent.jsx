import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileAlt, faTag, faCalendarAlt, faClock, faMapMarkerAlt, faUpload, faTimes, faDollarSign, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';
import api from '../api/axios';

function CreateEvent() {
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    price: '',
    capacity: '',
    evaluation: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get('/api/category')
      .then(response => {
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else if (response.data && typeof response.data === 'object') {
          const possibleArray = Object.values(response.data).find(val => Array.isArray(val));
          if (possibleArray) setCategories(possibleArray);
        }
      })
      .catch(error => {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
      });
  }, []);

  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const validateStep = () => {
    let stepErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) stepErrors.title = "Event title is required";
      if (!formData.description.trim()) stepErrors.description = "Description is required";
      if (!formData.category) stepErrors.category = "Please select a category";
    }

    if (step === 2) {
      if (!formData.date) stepErrors.date = "Event date is required";
      if (!formData.time) stepErrors.time = "Event time is required";
      if (!formData.location.trim()) stepErrors.location = "Location address is required";
    }

    if (step === 3) {
      if (!formData.price.toString().trim()) stepErrors.price = "Ticket price is required (enter 0 for free)";
      if (!formData.capacity.toString().trim()) stepErrors.capacity = "Maximum capacity is required";
      if (!formData.evaluation.toString().trim()) stepErrors.evaluation = "Evaluation is required";
    }

    if (step === 4) {
      if (!formData.image) stepErrors.image = "Please upload a cover image";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File size looks too big! Max 5MB allowed.");
      return;
    }
    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category_id', parseInt(formData.category));
    data.append('date', formData.date);
    data.append('time', formData.time);
    data.append('location', formData.location);
    data.append('price', formData.price);
    data.append('maxcapacity', parseInt(formData.capacity));
    data.append('evaluation', parseFloat(formData.evaluation));
    if (formData.image) {
      data.append('image_path', formData.image);
    }

    try {
      await api.post('/api/CreateEvent', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });
      showToast('Event Published Successfully!', 'success');
    } catch (error) {
      console.error('Full error response:', error.response?.data);
      console.error('Error uploading event:', error);
      const backendErrors = error.response?.data?.message || error.response?.data?.errors;
      if (backendErrors && typeof backendErrors === 'object') {
        const mapped = {};
        if (backendErrors.category_id) mapped.category    = backendErrors.category_id[0];
        if (backendErrors.maxcapacity) mapped.capacity    = backendErrors.maxcapacity[0];
        if (backendErrors.image_path)  mapped.image       = backendErrors.image_path[0];
        if (backendErrors.title)       mapped.title       = backendErrors.title[0];
        if (backendErrors.description) mapped.description = backendErrors.description[0];
        if (backendErrors.date)        mapped.date        = backendErrors.date[0];
        if (backendErrors.time)        mapped.time        = backendErrors.time[0];
        if (backendErrors.location)    mapped.location    = backendErrors.location[0];
        if (backendErrors.price)       mapped.price       = backendErrors.price[0];
        setErrors(mapped);
        showToast('Please fix the errors and try again.', 'error');
      } else {
        showToast('Something went wrong. Please try again.', 'error');
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  return (
      <div className="container mx-auto pt-28 px-6 py-12">

        {toast && (
          <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold transition-all duration-300
            ${toast.type === 'success' 
              ? 'bg-emerald-600 shadow-emerald-600/30' 
              : 'bg-rose-600 shadow-rose-600/30'
            }`}
          >
            <span>{toast.type === 'success' ? '✅' : '❌'}</span>
            <span>{toast.message}</span>
          </div>
        )}

        <Link to="/home" 
          onClick={step > 1 ? prevStep : undefined}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 mb-8 transition-colors font-medium text-sm"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl text-slate-100 mb-3 font-extrabold">Create New Event</h1>
            <div className="text-sm font-semibold text-rose-400 mb-4">
              <span>Step {step} of 4</span>
            </div>

            <div className="flex items-center justify-between gap-2 max-w-xl mx-auto">
              {[1, 2, 3, 4].map((index) => (
                <div 
                  key={index}
                  className={`w-1/4 h-2 rounded-full transition-all duration-300
                    ${step >= index 
                      ? 'bg-gradient-to-r from-orange-500 to-rose-600' 
                      : 'bg-slate-800'
                    }`}
                ></div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">

            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-100 mb-4">Event Details</h2>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Event Title</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faFileAlt} className="absolute left-4 top-3.5 text-rose-400" />
                    <input 
                      type="text" 
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter event title" 
                      className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors ${errors.title ? 'border-rose-500' : 'border-slate-800'}`}
                    />
                  </div>
                  {errors.title && <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your event..." 
                    rows="4"
                    className={`w-full bg-slate-950 border rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors resize-none ${errors.description ? 'border-rose-500' : 'border-slate-800'}`}
                  />
                  {errors.description && <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Category</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faTag} className="absolute left-4 top-3.5 text-rose-400" />
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-rose-500 transition-colors appearance-none ${errors.category ? 'border-rose-500' : 'border-slate-800'}`}
                    >
                      <option value="" className="text-slate-500">Select a category</option>
                      {categories.map((category) => (
                        <option 
                          key={category.id || category.name} 
                          value={category.id || category.name}
                          className="bg-slate-900 text-slate-100"
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.category && <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.category}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-100 mb-4">Date & Time</h2>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Event Date</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCalendarAlt} className="absolute left-4 top-3.5 text-rose-400" />
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-rose-500 transition-colors [color-scheme:dark] ${errors.date ? 'border-rose-500' : 'border-slate-800'}`}
                    />
                  </div>
                  {errors.date && <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Event Time</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faClock} className="absolute left-4 top-3.5 text-rose-400" />
                    <input 
                      type="time" 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-rose-500 transition-colors [color-scheme:dark] ${errors.time ? 'border-rose-500' : 'border-slate-800'}`}
                    />
                  </div>
                  {errors.time && <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.time}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Location</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-4 top-3.5 text-rose-400" />
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter venue address" 
                      className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors ${errors.location ? 'border-rose-500' : 'border-slate-800'}`}
                    />
                  </div>
                  {errors.location && <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.location}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-100 mb-4">Pricing & Capacity</h2>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Ticket Price</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faDollarSign} className="absolute left-4 top-3.5 text-rose-400" />
                    <input 
                      type="number" 
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-rose-500 transition-colors ${errors.price ? 'border-rose-500' : 'border-slate-800'}`}
                    />
                  </div>
                  {errors.price && <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Maximum Capacity</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faUsers} className="absolute left-4 top-3.5 text-rose-400" />
                    <input 
                      type="number" 
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      placeholder="No limit"
                      min="1"
                      className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-rose-500 transition-colors ${errors.capacity ? 'border-rose-500' : 'border-slate-800'}`}
                    />
                  </div>
                  {errors.capacity && <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.capacity}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Evaluation</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faStar} className="absolute left-4 top-3.5 text-rose-400" />
                    <input 
                      type="number" 
                      name="evaluation"
                      value={formData.evaluation}
                      onChange={handleChange}
                      placeholder="Range 1 to 5"
                      min="1"
                      className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-rose-500 transition-colors ${errors.evaluation ? 'border-rose-500' : 'border-slate-800'}`}
                    />
                  </div>
                  {errors.evaluation && <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.evaluation}</p>}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-100 mb-4">Cover Image</h2>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg, image/png"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[260px]
                    ${errors.image ? 'border-rose-500 bg-rose-500/5' : dragActive ? 'border-rose-500 bg-rose-500/10' : 'border-slate-800 bg-slate-950 hover:border-rose-500/50'}
                  `}
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full max-h-[220px] rounded-xl overflow-hidden group">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 pointer-events-none">
                      <div className="text-rose-500 text-4xl">
                        <FontAwesomeIcon icon={faUpload} />
                      </div>
                      <p className="text-slate-200 text-base font-medium">
                        Drag and drop your image here, or <span className="text-rose-400 font-semibold">click to browse</span>
                      </p>
                      <p className="text-slate-500 text-xs">
                        Supported formats: JPG, PNG (Max 5MB)
                      </p>
                    </div>
                  )}
                </div>
                {errors.image && <p className="text-rose-400 text-xs text-center mt-1">{errors.image}</p>}
              </div>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
              <button 
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Back
              </button>

              <button 
                type="button"
                onClick={step === 4 ? handleSubmit : nextStep}
                className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-semibold transition-all shadow-lg shadow-rose-500/20"
              >
                {step === 4 ? 'Submit' : 'Next'}
              </button>
            </div>

          </div>
        </div>
      </div>
  );
}

export default CreateEvent;
