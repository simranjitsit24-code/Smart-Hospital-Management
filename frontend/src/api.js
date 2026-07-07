import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getPatients = (params) => API.get('/patients', { params });
export const registerPatient = (data) => API.post('/patients', data);
export const dischargePatient = (id, data) => API.put(`/patients/${id}/discharge`, data);
export const getRooms = () => API.get('/rooms');
export const addRoom = (data) => API.post('/rooms', data);
export const suggestRoom = (ward) => API.get('/rooms/suggest', { params: { ward } });
export const createTransfer = (data) => API.post('/transfers', data);
export const getTimeline = (patientId) => API.get(`/transfers/timeline/${patientId}`);
export const getDashboardStats = () => API.get('/dashboard/stats');