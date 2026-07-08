import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// ─── Patients ─────────────────────────────────────────────
export const getPatients = (params) => API.get('/patients', { params });
export const registerPatient = (data) => API.post('/patients', data);
export const getPatientById = (id) => API.get(`/patients/${id}`);
export const updatePatient = (id, data) => API.put(`/patients/${id}`, data);
export const dischargePatient = (id, data) => API.put(`/patients/${id}/discharge`, data);

// ─── Rooms ────────────────────────────────────────────────
export const getRooms = () => API.get('/rooms');
export const addRoom = (data) => API.post('/rooms', data);
export const suggestRoom = (ward) => API.get('/rooms/suggest', { params: { ward } });



export const updateRoom = (roomNumber, data) => API.put(`/rooms/${roomNumber}`, data);
// ─── Transfers ─────────────────────────────────────────────
export const createTransfer = (data) => API.post('/transfers', data);
export const getTimeline = (patientId) => API.get(`/transfers/timeline/${patientId}`);

// ─── Dashboard ─────────────────────────────────────────────
export const getDashboardStats = () => API.get('/dashboard/stats');

// ─── Equipment (optional) ────────────────────────────────
export const getEquipment = () => API.get('/equipment');
export const addEquipment = (data) => API.post('/equipment', data);

export default API;