/**
 * Resolves the backend base URL dynamically:
 * - When deployed on Render or provided via VITE_API_BASE_URL: uses the full remote URL
 * - In local dev (when unset): uses relative path '' so Vite's dev proxy forwards to localhost:8080
 */
function getApiRoot() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    const withoutProto = clean.replace(/^https?:\/\//i, '');
    if (!withoutProto.includes('.') && !withoutProto.includes('localhost')) {
      clean = `https://${withoutProto}.onrender.com`;
    } else if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `https://${clean}`;
    }
    return clean;
  }
  return '';
}

const BASE_URL = `${getApiRoot()}/hugo/students`;

/**
 * Fetch all students
 * @returns {Promise<Array>}
 */
export async function getAllStudents() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to fetch students (Status ${response.status})`);
  }
  return response.json();
}

/**
 * Fetch a single student by ID
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function getStudentById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Student #${id} not found`);
  }
  return response.json();
}

/**
 * Create a new student
 * @param {Object} student - { firstname, lastname, course, section }
 * @returns {Promise<Object>}
 */
export async function createStudent(student) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create student (Status ${response.status})`);
  }
  return response.json();
}

/**
 * Update an existing student
 * @param {number|string} id
 * @param {Object} student - { firstname, lastname, course, section }
 * @returns {Promise<Object>}
 */
export async function updateStudent(id, student) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to update student #${id} (Status ${response.status})`);
  }
  return response.json();
}

/**
 * Delete a student by ID
 * @param {number|string} id
 * @returns {Promise<string>}
 */
export async function deleteStudent(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(responseText || `Failed to delete student #${id} (Status ${response.status})`);
  }
  return responseText;
}
