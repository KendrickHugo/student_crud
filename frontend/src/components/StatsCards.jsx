import React from 'react';
import { Users, BookOpen, Layers, Edit3 } from 'lucide-react';

export default function StatsCards({ students = [], isEditing, editingStudent }) {
  const totalStudents = students.length;
  
  // Calculate unique courses
  const uniqueCourses = new Set(
    students
      .map((s) => s.course?.trim())
      .filter(Boolean)
  ).size;

  // Calculate unique sections
  const uniqueSections = new Set(
    students
      .map((s) => s.section?.trim())
      .filter(Boolean)
  ).size;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Students</p>
          <p className="text-2xl font-bold text-slate-900">{totalStudents}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
        <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Unique Courses</p>
          <p className="text-2xl font-bold text-slate-900">{uniqueCourses}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Sections</p>
          <p className="text-2xl font-bold text-slate-900">{uniqueSections}</p>
        </div>
      </div>

      <div className={`p-4 rounded-xl border shadow-sm flex items-center space-x-3.5 transition-colors ${
        isEditing 
          ? 'bg-amber-50/70 border-amber-300' 
          : 'bg-white border-slate-200'
      }`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isEditing 
            ? 'bg-amber-100 text-amber-700' 
            : 'bg-slate-100 text-slate-600'
        }`}>
          <Edit3 className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Form Mode</p>
          <p className={`text-sm font-semibold truncate ${
            isEditing ? 'text-amber-800' : 'text-slate-800'
          }`}>
            {isEditing ? `Editing #${editingStudent?.id}` : 'Create New'}
          </p>
        </div>
      </div>
    </div>
  );
}
