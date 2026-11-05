import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Notification from './components/Notification';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './api/studentApi';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [notification, setNotification] = useState(null);

  const showToast = useCallback((type, message) => {
    setNotification({ type, message });
  }, []);

  const clearToast = useCallback(() => {
    setNotification(null);
  }, []);

  // Fetch all students from API
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      showToast('error', `Could not connect to API: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // Initial load
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Extract unique courses for filter dropdown
  const availableCourses = useMemo(() => {
    return Array.from(
      new Set(
        students
          .map((s) => s.course?.trim())
          .filter(Boolean)
      )
    ).sort();
  }, [students]);

  // Filtered students by search term and course filter
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        !searchTerm ||
        `${student.firstname || ''} ${student.lastname || ''}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (student.section &&
          student.section.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (student.course &&
          student.course.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCourse =
        !courseFilter ||
        (student.course &&
          student.course.trim().toLowerCase() === courseFilter.trim().toLowerCase());

      return matchesSearch && matchesCourse;
    });
  }, [students, searchTerm, courseFilter]);

  // Save handler (Handles both Create and Update)
  const handleSaveStudent = async (studentData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent && editingStudent.id) {
        // Update existing student
        const updated = await updateStudent(editingStudent.id, studentData);
        showToast('success', `Student #${updated.id || editingStudent.id} successfully updated!`);
        setEditingStudent(null);
      } else {
        // Create new student
        const created = await createStudent(studentData);
        showToast('success', `Student "${created.firstname} ${created.lastname}" added successfully!`);
      }
      await fetchStudents();
    } catch (err) {
      console.error('Save failed:', err);
      showToast('error', `Operation failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Select student for editing
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    // Smooth scroll to form if needed
    const formElement = document.getElementById('student-form-panel');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    setIsDeletingId(id);
    try {
      await deleteStudent(id);
      showToast('info', `Student #${id} deleted successfully.`);
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      await fetchStudents();
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('error', `Failed to delete student #${id}: ${err.message}`);
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Toast Alert Notification */}
      <Notification notification={notification} onDismiss={clearToast} />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <StatsCards
          students={students}
          isEditing={Boolean(editingStudent)}
          editingStudent={editingStudent}
        />

        {/* 2-Column Responsive In-Page Layout (NO MODAL) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: In-Page Add / Edit Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <StudentForm
              editingStudent={editingStudent}
              onSave={handleSaveStudent}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Column: Search & Student Directory Table */}
          <div className="lg:col-span-7 space-y-6">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              courseFilter={courseFilter}
              setCourseFilter={setCourseFilter}
              availableCourses={availableCourses}
              filteredCount={filteredStudents.length}
              totalCount={students.length}
            />

            <StudentList
              students={filteredStudents}
              isLoading={isLoading}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              onRefresh={fetchStudents}
              editingStudentId={editingStudent?.id}
              isDeletingId={isDeletingId}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 Student Management System • React & Vite CRUD</p>
          <p className="font-mono">API: /hugo/students</p>
        </div>
      </footer>
    </div>
  );
}
