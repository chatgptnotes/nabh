import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
};

export const usersApi = {
  getUsers: (params) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export const departmentsApi = {
  getDepartments: (params) => api.get('/departments', { params }),
  getDepartment: (id) => api.get(`/departments/${id}`),
  createDepartment: (data) => api.post('/departments', data),
  updateDepartment: (id, data) => api.put(`/departments/${id}`, data),
  deleteDepartment: (id) => api.delete(`/departments/${id}`),
};

export const checklistsApi = {
  getTemplates: (params) => api.get('/checklists/templates', { params }),
  getTemplate: (id) => api.get(`/checklists/templates/${id}`),
  createTemplate: (data) => api.post('/checklists/templates', data),
  updateTemplate: (id, data) => api.put(`/checklists/templates/${id}`, data),
  getEntries: (params) => api.get('/checklists/entries', { params }),
  getEntry: (id) => api.get(`/checklists/entries/${id}`),
  updateEntry: (id, data) => api.put(`/checklists/entries/${id}`, data),
};

export const documentsApi = {
  getDocuments: (params) => api.get('/documents', { params }),
  getDocument: (id) => api.get(`/documents/${id}`),
  createDocument: (data) => api.post('/documents', data),
  updateDocument: (id, data) => api.put(`/documents/${id}`, data),
  deleteDocument: (id) => api.delete(`/documents/${id}`),
  getExpiringDocuments: (params) => api.get('/documents/expiring', { params }),
};

export const alertsApi = {
  getAlerts: (params) => api.get('/alerts', { params }),
  createAlert: (data) => api.post('/alerts', data),
  markAsRead: (id) => api.put(`/alerts/${id}/read`),
  markAllAsRead: () => api.put('/alerts/mark-all-read'),
};

export const incidentsApi = {
  getIncidents: (params) => api.get('/incidents', { params }),
  getIncident: (id) => api.get(`/incidents/${id}`),
  createIncident: (data) => api.post('/incidents', data),
  updateIncident: (id, data) => api.put(`/incidents/${id}`, data),
  deleteIncident: (id) => api.delete(`/incidents/${id}`),
};

export const dashboardApi = {
  getStats: (params) => api.get('/dashboard/stats', { params }),
  getActivity: (params) => api.get('/dashboard/activity', { params }),
};

export default api;