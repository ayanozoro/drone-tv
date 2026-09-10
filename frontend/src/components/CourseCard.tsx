import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseItem } from '../types';
import { Clock, BarChart3, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CourseCardProps {
  course: CourseItem;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleEnquire = () => {
    // Take user to the enquiry form and preselect the course & student user type
    navigate(`/enquire?interest=${encodeURIComponent(course.title)}&type=Student`);
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Advanced':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <div
      className={`glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group ${
        course.popular ? 'border-cyan-500/40 shadow-lg shadow-cyan-500/10' : ''
      }`}
    >
      {/* Popular Flag */}
      {course.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-l from-cyan-500 to-blue-600 text-white text-[10px] font-extrabold uppercase px-4 py-1 rounded-bl-xl shadow-md">
            Most Popular
          </div>
        </div>
      )}

      <div>
        {/* Badges: Pathway Level, Category & Level */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {course.pathwayLevel && (
            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {course.pathwayLevel}
            </span>
          )}
          <span
            className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${getLevelBadgeClass(
              course.level
            )}`}
          >
            {course.level}
          </span>
          <span className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-slate-800/80 rounded-full border border-slate-700">
            {course.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
          {course.title}
        </h3>

        {/* Metadata info: Duration & Fee Range */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-cyan-400" />
            {course.duration}
          </span>
          {course.feeRange && (
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <span className="text-[11px]">Fee:</span>
              {course.feeRange}
            </span>
          )}
          {course.rptoApproval && (
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              {course.rptoApproval}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-5 font-normal">
          {course.description}
        </p>

        {/* Learning Outcomes */}
        <div className="space-y-2 mb-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Key Syllabus Highlights:
          </p>
          <ul className="space-y-1.5">
            {course.keyOutcomes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Certificate Badge */}
        <div className="mb-6 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-xs text-cyan-300">
          <Award className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="truncate font-medium">{course.certification}</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleEnquire}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all hover:scale-[1.01]"
      >
        <span>Enquire Now</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
