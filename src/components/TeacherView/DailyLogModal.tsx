import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Camera,
  Image as ImageIcon,
  Send,
  Sparkles,
  Utensils,
  Moon,
  BookOpen,
  Palette,
  Blocks,
  Sun
} from 'lucide-react';

interface DailyLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyLogModal: React.FC<DailyLogModalProps> = ({ isOpen, onClose }) => {
  const { t, language, selectedClass, addDailyLog, setTeacherTab } = useApp();

  const [title, setTitle] = useState(
    language === 'he' ? 'פעילות יצירה בסתיו וצבעי מים' : 'Autumn Watercolors Workshop'
  );
  const [category, setCategory] = useState(
    language === 'he' ? 'יצירה ומוטוריקה' : 'Arts & Crafts'
  );
  const [notes, setNotes] = useState(
    language === 'he'
      ? 'היום הילדים חקרו עלים יבשים ויצרו הדפסים יפהפיים. כולם שיתפו פעולה בהתרגשות!'
      : 'Today the children explored natural leaves and painted beautiful leaf prints!'
  );
  const [mealNotes, setMealNotes] = useState(
    language === 'he' ? 'ארוחת עשר: כריכים עם טחינה וירקות טריים' : 'Snack: Whole grain bread & veggies'
  );
  const [napNotes, setNapNotes] = useState(
    language === 'he' ? 'שעת מנוחה שקטה 13:00 - 14:00' : 'Quiet rest time 13:00 - 14:00'
  );

  // Preset photo gallery for instant rich prototyping
  const presetPhotos = [
    {
      id: 'painting',
      label: t.teacherModules.presetPhotos.painting,
      icon: Palette,
      url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'blocks',
      label: t.teacherModules.presetPhotos.buildingBlocks,
      icon: Blocks,
      url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'reading',
      label: t.teacherModules.presetPhotos.readingCircle,
      icon: BookOpen,
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'outdoor',
      label: t.teacherModules.presetPhotos.outdoorPlay,
      icon: Sun,
      url: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState<string>(presetPhotos[0].url);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    addDailyLog({
      time: timeStr,
      authorHe: language === 'he' ? 'רונית כהן (גננת)' : 'Ronit Cohen (Teacher)',
      authorEn: 'Ronit Cohen (Teacher)',
      titleHe: title,
      titleEn: title,
      textHe: notes,
      textEn: notes,
      categoryHe: category,
      categoryEn: category,
      photoUrl: selectedPhoto,
      mealNotesHe: mealNotes,
      mealNotesEn: mealNotes,
      napNotesHe: napNotes,
      napNotesEn: napNotes,
    });

    onClose();
    setTeacherTab('feed');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t.teacherModules.createDailyLog}
              </h3>
              <span className="text-xs text-slate-500">
                {language === 'he' ? selectedClass.nameHe : selectedClass.nameEn}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          
          {/* Title & Category */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {t.teacherModules.activityTitle}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {t.teacherModules.category}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value={language === 'he' ? 'יצירה ומוטוריקה' : 'Arts & Crafts'}>
                {language === 'he' ? 'יצירה ומוטוריקה' : 'Arts & Crafts'}
              </option>
              <option value={language === 'he' ? 'תנועה ומוזיקה' : 'Movement & Music'}>
                {language === 'he' ? 'תנועה ומוזיקה' : 'Movement & Music'}
              </option>
              <option value={language === 'he' ? 'מפגש בוקר ושיח' : 'Morning Circle & Language'}>
                {language === 'he' ? 'מפגש בוקר ושיח' : 'Morning Circle & Language'}
              </option>
              <option value={language === 'he' ? 'משחקי חצר וחול' : 'Outdoor & Sand Play'}>
                {language === 'he' ? 'משחקי חצר וחול' : 'Outdoor & Sand Play'}
              </option>
              <option value={language === 'he' ? 'הזנה ובריאות' : 'Nutrition & Health'}>
                {language === 'he' ? 'הזנה ובריאות' : 'Nutrition & Health'}
              </option>
            </select>
          </div>

          {/* Activity Notes for Parents */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {t.teacherModules.activityNotes}
            </label>
            <textarea
              rows={3}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
            />
          </div>

          {/* Photo Placeholder & Preset Photo Picker */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {t.teacherModules.photoAttachment}
            </label>
            
            {/* Selected Photo Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-16/9 mb-2">
              <img
                src={selectedPhoto}
                alt="Selected activity"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 start-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                ✓ {language === 'he' ? 'תמונה מצורפת לעדכון' : 'Photo attached'}
              </div>
            </div>

            {/* Quick Preset Selector Buttons */}
            <div className="text-[11px] text-slate-500 mb-1.5">
              {t.teacherModules.selectPresetPhoto}:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {presetPhotos.map((preset) => {
                const Icon = preset.icon;
                const isSelected = selectedPhoto === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPhoto(preset.url)}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500/30'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-teal-600" />
                    <span className="text-[10px] truncate max-w-full">
                      {preset.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Meal & Nap optional fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div>
              <label className="flex items-center gap-1 font-semibold text-slate-700 mb-1">
                <Utensils className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.teacherModules.mealNotes}</span>
              </label>
              <input
                type="text"
                value={mealNotes}
                onChange={(e) => setMealNotes(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 font-semibold text-slate-700 mb-1">
                <Moon className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.teacherModules.napNotes}</span>
              </label>
              <input
                type="text"
                value={napNotes}
                onChange={(e) => setNapNotes(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs min-h-[44px]"
            >
              {t.teacherModules.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>{t.teacherModules.publishLog}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
