import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DailyLogModal } from './DailyLogModal';
import {
  MessageSquareText,
  Image as ImageIcon,
  Heart,
  Plus,
  Utensils,
  Moon,
  Clock,
  Sparkles,
  Send,
  Building2
} from 'lucide-react';

export const TeacherFeedTab: React.FC = () => {
  const { t, language, selectedClass, dailyLogs, likeDailyLog, showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4 pb-4">
      {/* Header and Post Button */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquareText className="w-5 h-5 text-teal-600" />
              <span>{t.nav.dailyFeed}</span>
            </h2>
            <span className="text-xs text-slate-500">
              {language === 'he' ? selectedClass.nameHe : selectedClass.nameEn} • {dailyLogs.length} {language === 'he' ? 'עדכונים פעילים' : 'active updates'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs min-h-[40px]"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'he' ? 'עדכון חדש' : 'New Post'}</span>
          </button>
        </div>

        {/* Live Posts Stream */}
        <div className="space-y-4">
          {dailyLogs.map((post) => {
            const author = language === 'he' ? post.authorHe : post.authorEn;
            const title = language === 'he' ? post.titleHe : post.titleEn;
            const text = language === 'he' ? post.textHe : post.textEn;
            const category = language === 'he' ? post.categoryHe : post.categoryEn;
            const mealNotes = language === 'he' ? post.mealNotesHe : post.mealNotesEn;
            const napNotes = language === 'he' ? post.napNotesHe : post.napNotesEn;

            return (
              <div
                key={post.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 transition-all hover:bg-white hover:shadow-2xs"
              >
                {/* Post Author & Category Header */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-xs">
                      {author.slice(0, 1)}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block leading-tight">
                        {author}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {post.time}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-teal-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {category}
                  </span>
                </div>

                {/* Title & Notes */}
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {text}
                </p>

                {/* Photo Attachment if present */}
                {post.photoUrl && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-16/9">
                    <img
                      src={post.photoUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Optional Meals & Nap Badges */}
                {(mealNotes || napNotes) && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {mealNotes && (
                      <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-start gap-1.5 text-slate-600">
                        <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-[11px]">{mealNotes}</span>
                      </div>
                    )}
                    {napNotes && (
                      <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-start gap-1.5 text-slate-600">
                        <Moon className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span className="text-[11px]">{napNotes}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Social Likes & Engagement */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60 text-xs text-slate-500">
                  <button
                    type="button"
                    onClick={() => {
                      likeDailyLog(post.id);
                      showToast(
                        language === 'he' ? 'סימנת לייק לעדכון' : 'Liked post',
                        'info'
                      );
                    }}
                    className="flex items-center gap-1.5 hover:text-rose-600 transition-colors font-medium min-h-[32px] px-2 py-1 rounded-lg hover:bg-white"
                  >
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span className="font-mono tabular-nums">{post.likes}</span>
                    <span className="text-[11px]">
                      {language === 'he' ? 'הורים אהבו' : 'parents liked'}
                    </span>
                  </button>

                  <span className="text-[11px] text-slate-400">
                    ✓ {language === 'he' ? 'נצפה ע״י 24 משפחות' : 'Seen by 24 families'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <DailyLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
