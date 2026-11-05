import React, { useState, useEffect } from 'react';
import { UserPlus, Save, X, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

const INITIAL_FORM = {
  firstname: '',
  lastname: '',
  course: '',
  section: '',
};

export default function StudentForm({
  editingStudent,
  onSave,
  onCancelEdit,
  isSubmitting,
}) {
  const isEditing = Boolean(editingStudent && editingStudent.id);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sync form data when editingStudent changes
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
      setTouched({});
    } else {
      setFormData(INITIAL_FORM);
      setErrors({});
      setTouched({});
    }
  }, [editingStudent]);

  const validate = (data) => {
    const newErrors = {};
    if (!data.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!data.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!data.course.trim()) newErrors.course = 'Course is required';
    if (!data.section.trim()) newErrors.section = 'Section is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (touched[name]) {
      const fieldErrors = validate(updated);
      setErrors(fieldErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const currentErrors = validate(formData);
    setErrors(currentErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      firstname: true,
      lastname: true,
      course: true,
      section: true,
    });

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      course: formData.course.trim(),
      section: formData.section.trim(),
    });
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setTouched({});
  };

  return (
    <div
      id="student-form-panel"
      className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm ${
        isEditing
          ? 'border-amber-300 ring-2 ring-amber-400/20 shadow-amber-50'
          : 'border-slate-200 shadow-slate-100'
      }`}
    >
      {/* Form Header */}
      <div
        className={`px-5 py-4 border-b rounded-t-2xl flex items-center justify-between ${
          isEditing
            ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
            : 'bg-gradient-to-r from-slate-50 to-indigo-50/30 border-slate-200'
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
              isEditing
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-indigo-600 text-white shadow-sm'
            }`}
          >
            {isEditing ? <Save className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing ? `Edit Student #${editingStudent.id}` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing
                ? 'Modify details and save changes'
                : 'Fill in details to register student'}
            </p>
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-md bg-amber-100/80 text-amber-800 hover:bg-amber-200 font-medium transition-colors"
            title="Cancel editing"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* First Name & Last Name Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstname"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={formData.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. John"
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors border ${
                errors.firstname && touched.firstname
                  ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:ring-rose-200 focus:border-rose-500'
                  : 'border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-indigo-500/20 focus:border-indigo-500'
              } focus:outline-none focus:ring-2`}
            />
            {errors.firstname && touched.firstname && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.firstname}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastname"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Doe"
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors border ${
                errors.lastname && touched.lastname
                  ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:ring-rose-200 focus:border-rose-500'
                  : 'border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-indigo-500/20 focus:border-indigo-500'
              } focus:outline-none focus:ring-2`}
            />
            {errors.lastname && touched.lastname && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.lastname}</span>
              </p>
            )}
          </div>
        </div>

        {/* Course */}
        <div>
          <label
            htmlFor="course"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Course / Degree Program <span className="text-rose-500">*</span>
          </label>
          <input
            id="course"
            name="course"
            type="text"
            value={formData.course}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. BS Information Technology, BS Computer Science"
            className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors border ${
              errors.course && touched.course
                ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-indigo-500/20 focus:border-indigo-500'
            } focus:outline-none focus:ring-2`}
          />
          {errors.course && touched.course && (
            <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.course}</span>
            </p>
          )}
        </div>

        {/* Section */}
        <div>
          <label
            htmlFor="section"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Section <span className="text-rose-500">*</span>
          </label>
          <input
            id="section"
            name="section"
            type="text"
            value={formData.section}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. IT-3A, CS-2B"
            className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors border ${
              errors.section && touched.section
                ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-indigo-500/20 focus:border-indigo-500'
            } focus:outline-none focus:ring-2`}
          />
          {errors.section && touched.section && (
            <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.section}</span>
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          {!isEditing ? (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancelEdit}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel Edit</span>
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all shadow-sm ${
              isEditing
                ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 shadow-amber-200'
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Saving...</span>
              </>
            ) : isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>Update Student</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Save Student</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
