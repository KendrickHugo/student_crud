import React, { useState } from 'react';
import {
  Edit2,
  Trash2,
  AlertTriangle,
  Check,
  X,
  GraduationCap,
  RefreshCw,
  Hash,
  BookOpen,
  Layers,
} from 'lucide-react';

export default function StudentList({
  students,
  isLoading,
  onEdit,
  onDelete,
  onRefresh,
  editingStudentId,
  isDeletingId,
}) {
  // State for which student row is currently showing inline delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleStartDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await onDelete(id);
    setConfirmDeleteId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table Header / Action Bar */}
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Student Directory</h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
            {students.length}
          </span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-xs disabled:opacity-50"
          title="Refresh list from server"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
          <span>Sync</span>
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100/70 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th scope="col" className="py-3 px-4 w-16">
                <div className="flex items-center space-x-1">
                  <Hash className="w-3.5 h-3.5 text-slate-400" />
                  <span>ID</span>
                </div>
              </th>
              <th scope="col" className="py-3 px-4">
                Student Name
              </th>
              <th scope="col" className="py-3 px-4">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Course</span>
                </div>
              </th>
              <th scope="col" className="py-3 px-4">
                <div className="flex items-center space-x-1">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Section</span>
                </div>
              </th>
              <th scope="col" className="py-3 px-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-150">
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: 4 }).map((_, index) => (
                <tr key={`skeleton-${index}`} className="animate-pulse">
                  <td className="py-4 px-4">
                    <div className="h-4 w-8 bg-slate-200 rounded"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-36 bg-slate-200 rounded"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-28 bg-slate-200 rounded"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-16 bg-slate-200 rounded"></div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="h-7 w-20 bg-slate-200 rounded inline-block"></div>
                  </td>
                </tr>
              ))
            ) : students.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500">
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">No students found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      No records match the current criteria or the database is currently empty.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              // Actual Student Rows
              students.map((student) => {
                const isBeingEdited = editingStudentId === student.id;
                const isConfirming = confirmDeleteId === student.id;
                const isDeleting = isDeletingId === student.id;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isBeingEdited
                        ? 'bg-amber-50/70 border-l-4 border-l-amber-500'
                        : isConfirming
                        ? 'bg-rose-50/50'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* ID Badge */}
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-slate-600">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                        #{student.id}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {student.firstname} {student.lastname}
                      </div>
                      <div className="text-xs text-slate-400 sm:hidden">
                        {student.course} • Sec: {student.section}
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {student.course || '—'}
                      </span>
                    </td>

                    {/* Section */}
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {student.section || '—'}
                      </span>
                    </td>

                    {/* Actions: NO MODAL, INLINE CONFIRMATION */}
                    <td className="py-3.5 px-4 text-right">
                      {isConfirming ? (
                        // Inline Delete Confirmation
                        <div className="inline-flex items-center space-x-1.5 p-1 rounded-lg bg-white border border-rose-200 shadow-sm">
                          <span className="text-xs font-semibold text-rose-700 px-1 flex items-center space-x-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                            <span>Delete?</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleConfirmDelete(student.id)}
                            disabled={isDeleting}
                            className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors disabled:opacity-50"
                          >
                            <Check className="w-3 h-3" />
                            <span>{isDeleting ? '...' : 'Yes'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelDelete}
                            disabled={isDeleting}
                            className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                          >
                            <X className="w-3 h-3" />
                            <span>No</span>
                          </button>
                        </div>
                      ) : (
                        // Normal Action Buttons
                        <div className="inline-flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => onEdit(student)}
                            className={`inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                              isBeingEdited
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 bg-slate-100/80'
                            }`}
                            title="Edit this student in the form"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">
                              {isBeingEdited ? 'Editing' : 'Edit'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStartDelete(student.id)}
                            className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-white hover:bg-rose-600 bg-rose-50 rounded-lg transition-colors"
                            title="Delete this student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
