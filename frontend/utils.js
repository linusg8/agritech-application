const API_URL = 'http://localhost:3000';

/**
 * Perform a fetch request with proper headers.
 * @param {string} endpoint - The API endpoint (e.g., '/auth/login').
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
 * @param {object} body - The request body, if applicable.
 * @returns {Promise<object>} - The JSON response from the API.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

/**
 * Save the authentication token to localStorage.
 * @param {string} token - The JWT token.
 */
function saveToken(token) {
  localStorage.setItem('token', token);
}

/**
 * Retrieve the authentication token from localStorage.
 * @returns {string|null} - The JWT token, or null if not found.
 */
function getToken() {
  return localStorage.getItem('token');
}

/**
 * Remove the authentication token from localStorage.
 */
function clearToken() {
  localStorage.removeItem('token');
}

/**
 * Check if the user is logged in based on the presence of a token.
 * @returns {boolean} - True if logged in, false otherwise.
 */
function isLoggedIn() {
  return !!getToken();
}

/**
 * Redirect the user to the login page if not authenticated.
 */
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

export { apiRequest, saveToken, getToken, clearToken, isLoggedIn, requireAuth };
