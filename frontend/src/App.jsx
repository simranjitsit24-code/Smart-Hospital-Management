import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
import QRCode from 'react-qr-code';
import RoomsPage from './roomspage';
import {
  getPatients,
  getRooms,
  getDashboardStats,
  registerPatient,
  addRoom,
  updateRoom,            // ← added
  createTransfer,
  dischargePatient,
  getEquipment,
  addEquipment,
} from './api';

const navItems = ['Dashboard', 'Patients', 'Rooms', 'Receipts', 'Reports'];
const dischargeSteps = [
  'Verify booking and room history',
  'Clear room and bed',
  'Generate discharge slip',
  'Print handover receipt',
];
const WARD_OPTIONS = ['General', 'ICU', 'Private', 'Semi-Private', 'Maternity', 'Surgical'];
const STATUS_OPTIONS = ['Available', 'Occupied', 'Reserved', 'Cleaning'];

// ─── DASHBOARD PAGE (memoized) ─────────────────────────────
const DashboardPage = memo(({
  stats,
  newRoom, setNewRoom, handleAddRoom,
  newPatient, setNewPatient, handleRegisterPatient,
  transferData, setTransferData, handleTransfer,
  dischargePatientId, setDischargePatientId,
  dischargeNotes, setDischargeNotes, handleDischarge,
  newEquipment, setNewEquipment, handleAddEquipment,
  equipment,
}) => (
  <div className="space-y-6">
    {/* Stats Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
  { label: 'Total Rooms', value: stats.totalRooms || 0, tone: 'cyan' },
  { label: 'Occupied Rooms', value: stats.occupiedRooms || 0, tone: 'rose' },
  { label: 'Available Rooms', value: stats.availableRooms || 0, tone: 'emerald' },
  { label: 'Occupancy %', value: `${stats.occupancyPercent || 0}%`, tone: 'violet' },
].map((card) => (
        <div
          key={card.label}
          className={`rounded-2xl border border-white/10 bg-white/5 p-4 text-center ring-1 ${
            card.tone === 'rose'
              ? 'ring-rose-400/10'
              : card.tone === 'emerald'
              ? 'ring-emerald-400/10'
              : card.tone === 'violet'
              ? 'ring-violet-400/10'
              : 'ring-cyan-400/10'
          }`}
        >
          <p className="text-sm text-slate-400">{card.label}</p>
          <p className="text-3xl font-bold text-white">{card.value}</p>
        </div>
      ))}
    </div>

    {/* Forms grid */}
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Add Room */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h3 className="text-lg font-semibold text-white">Add Room</h3>
        <form onSubmit={handleAddRoom} className="mt-3 grid gap-3">
          <input
            className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Room Number (e.g., 01-101)"
            value={newRoom.roomNumber}
            onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none"
              value={newRoom.ward}
              onChange={(e) => setNewRoom({ ...newRoom, ward: e.target.value })}
              required
            >
              <option value="">Ward</option>
              {WARD_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
            <select
              className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none"
              value={newRoom.totalBeds}
              onChange={(e) => setNewRoom({ ...newRoom, totalBeds: Number(e.target.value) })}
              required
            >
              <option value="">Beds</option>
              {[1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <select
            className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none"
            value={newRoom.status}
            onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
          >
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button type="submit" className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 py-3 font-semibold text-slate-950">
            Add Room
          </button>
        </form>
      </div>

      {/* Register Patient */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h3 className="text-lg font-semibold text-white">Register Patient</h3>
        <form onSubmit={handleRegisterPatient} className="mt-3 grid gap-3">
          <input
            className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Full Name"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              placeholder="Age"
              type="number"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              placeholder="Gender"
              value={newPatient.gender}
              onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
            />
          </div>
          <input
            className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Disease / Reason"
            value={newPatient.disease}
            onChange={(e) => setNewPatient({ ...newPatient, disease: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none"
              value={newPatient.ward}
              onChange={(e) => setNewPatient({ ...newPatient, ward: e.target.value })}
              required
            >
              <option value="">Ward</option>
              {WARD_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
            <input
              className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              placeholder="Room Number"
              value={newPatient.roomNumber}
              onChange={(e) => setNewPatient({ ...newPatient, roomNumber: e.target.value })}
              required
            />
          </div>
          <input
            className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Contact"
            value={newPatient.contact}
            onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
          />
          <button type="submit" className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 py-3 font-semibold text-slate-950">
            Register Patient
          </button>
        </form>
      </div>

      {/* Transfer */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h3 className="text-lg font-semibold text-white">Transfer Patient</h3>
        <form onSubmit={handleTransfer} className="mt-3 grid gap-3">
          <input
            className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Patient ID"
            value={transferData.patientId}
            onChange={(e) => setTransferData({ ...transferData, patientId: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              placeholder="From Room"
              value={transferData.fromRoom}
              onChange={(e) => setTransferData({ ...transferData, fromRoom: e.target.value })}
              required
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              placeholder="To Room"
              value={transferData.toRoom}
              onChange={(e) => setTransferData({ ...transferData, toRoom: e.target.value })}
              required
            />
          </div>
          <input
            className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Reason (optional)"
            value={transferData.reason}
            onChange={(e) => setTransferData({ ...transferData, reason: e.target.value })}
          />
          <button type="submit" className="rounded-2xl border border-white/10 bg-white/5 py-3 font-semibold text-white">
            Transfer
          </button>
        </form>
      </div>

      {/* Discharge */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h3 className="text-lg font-semibold text-white">Discharge Patient</h3>
        <form onSubmit={handleDischarge} className="mt-3 grid gap-3">
          <input
            className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Patient ID"
            value={dischargePatientId}
            onChange={(e) => setDischargePatientId(e.target.value)}
            required
          />
          <textarea
            className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Discharge Notes"
            rows="3"
            value={dischargeNotes}
            onChange={(e) => setDischargeNotes(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 text-sm">
            {dischargeSteps.map((step, i) => (
              <span key={i} className="rounded-full bg-white/5 px-3 py-1 text-slate-300">✓ {step}</span>
            ))}
          </div>
          <button type="submit" className="rounded-2xl border border-white/10 bg-white/5 py-3 font-semibold text-white">
            Discharge & Release Room
          </button>
        </form>
      </div>
    </div>

    {/* Equipment */}
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <h3 className="text-lg font-semibold text-white">Equipment Management</h3>
      <form onSubmit={handleAddEquipment} className="mt-3 grid gap-3 sm:grid-cols-4">
        <input
          className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
          placeholder="Equipment Name"
          value={newEquipment.name}
          onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
          required
        />
        <input
          className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
          placeholder="Room Number"
          value={newEquipment.roomNumber}
          onChange={(e) => setNewEquipment({ ...newEquipment, roomNumber: e.target.value })}
          required
        />
        <select
          className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none"
          value={newEquipment.status}
          onChange={(e) => setNewEquipment({ ...newEquipment, status: e.target.value })}
        >
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
        <button type="submit" className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 py-3 font-semibold text-slate-950">
          Add Equipment
        </button>
      </form>
      <div className="mt-4 grid gap-2">
        {equipment.length === 0 ? (
          <p className="text-slate-400 text-sm">No equipment added yet.</p>
        ) : (
          equipment.map(eq => (
            <div key={eq._id} className="flex justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
              <span className="text-white">{eq.name} (Room {eq.roomNumber})</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                eq.status === 'Available' ? 'bg-emerald-400/20 text-emerald-200' :
                eq.status === 'In Use' ? 'bg-rose-400/20 text-rose-200' :
                'bg-amber-400/20 text-amber-200'
              }`}>{eq.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
));

// ─── PATIENTS PAGE (memoized) ─────────────────────────────
const PatientsPage = memo(({ patients, searchTerm, handleDischarge, fetchAllData }) => {
  const filteredPatients = useMemo(() => 
    patients.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientId.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [patients, searchTerm]
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Patient Records</h2>
      {filteredPatients.length === 0 ? (
        <p className="text-slate-400">No patients found.</p>
      ) : (
        <div className="grid gap-3">
          {filteredPatients.map(p => (
            <div key={p.patientId} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 flex flex-wrap items-center justify-between">
              <div>
                <p className="font-semibold text-white">{p.name} <span className="text-sm text-slate-400">({p.patientId})</span></p>
                <p className="text-sm text-slate-300">Room: {p.roomNumber || 'N/A'} · Ward: {p.ward || 'N/A'} · Status: {p.status}</p>
                <p className="text-xs text-slate-400">Admitted: {new Date(p.admissionDate).toLocaleDateString()}</p>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

// ─── RECEIPTS PAGE (memoized) ─────────────────────────────
const ReceiptsPage = memo(({ patients, handlePrint }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-white">Receipt / Slip</h2>
      <button onClick={handlePrint} className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-6 py-3 font-semibold text-slate-950">
        🖨️ Print Slip
      </button>
    </div>
    <div id="slip-print-area" className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,#f7fafc,#eef4f9)] p-6 text-slate-900 shadow-xl print:shadow-none print:border-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-black text-white">H+</div>
          <div>
            <p className="font-semibold">HealPlus Hospital</p>
            <span className="text-sm text-slate-500">Smart Room Management</span>
          </div>
        </div>
        <div className="text-right text-sm text-slate-500">
          <span className="block uppercase tracking-wider">Slip No.</span>
          <strong className="block text-slate-900">SL-2026-001</strong>
        </div>
      </div>
      <hr className="my-4 border-slate-300" />
      <div className="text-center">
        <p className="text-sm font-black tracking-widest text-slate-800">ROOM BOOKING SLIP</p>
        <p className="text-sm text-slate-500">Printable room booking and discharge receipt</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        {[
          ['Patient ID', patients[0]?.patientId || 'P1001'],
          ['Patient Name', patients[0]?.name || 'Simranjit Singh'],
          ['Floor', patients[0]?.roomNumber?.split('-')[0] || '02'],
          ['Ward', patients[0]?.ward || 'General'],
          ['Room Number', patients[0]?.roomNumber || 'A-101'],
          ['Bed Number', 'B-1'],
          ['Admission Date', new Date().toLocaleDateString()],
          ['Registered By', 'Clerk'],
          ['Fee / Deposit', '₹500'],
          ['Status', patients[0]?.status || 'Booked'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-3">
            <span className="block text-[0.65rem] uppercase tracking-wider text-slate-500">{label}</span>
            <strong className="block text-slate-900">{value}</strong>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="grid place-items-center rounded-2xl border border-slate-200 bg-white p-2">
          <QRCode value={patients[0]?.patientId ? `http://localhost:5173/patient/${patients[0].patientId}` : 'http://localhost:5173'} size={80} />
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">Thank You</p>
          <span className="text-sm text-slate-500">Keep this slip for room allocation, transfer, and discharge.</span>
        </div>
      </div>
    </div>
  </div>
));

// ─── MAIN APP ──────────────────────────────────────────────
function App() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [patients, setPatients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [newRoom, setNewRoom] = useState({ roomNumber: '', ward: '', totalBeds: '', status: 'Available' });
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    disease: '',
    ward: '',
    roomNumber: '',
    contact: '',
  });
  const [transferData, setTransferData] = useState({ patientId: '', fromRoom: '', toRoom: '', reason: '' });
  const [dischargePatientId, setDischargePatientId] = useState('');
  const [dischargeNotes, setDischargeNotes] = useState('');
  const [newEquipment, setNewEquipment] = useState({ name: '', roomNumber: '', status: 'Available' });

  // ── Fetch all data ────────────────────────────────────────
  const fetchAllData = useCallback(async () => {
    try {
      const [patientsRes, roomsRes, statsRes, eqRes] = await Promise.all([
        getPatients(),
        getRooms(),
        getDashboardStats(),
        getEquipment(),
      ]);
      setPatients(patientsRes.data);
      setRooms(roomsRes.data);
      setStats(statsRes.data);
      setEquipment(eqRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data. Check backend or network.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // ── Handlers (wrapped in useCallback) ─────────────────────
  const handleAddRoom = useCallback(async (e) => {
    e.preventDefault();
    try {
      await addRoom(newRoom);
      setNewRoom({ roomNumber: '', ward: '', totalBeds: '', status: 'Available' });
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add room');
    }
  }, [newRoom, fetchAllData]);

  const handleRegisterPatient = useCallback(async (e) => {
    e.preventDefault();
    try {
      await registerPatient(newPatient);
      setNewPatient({ name: '', age: '', gender: '', disease: '', ward: '', roomNumber: '', contact: '' });
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to register patient');
    }
  }, [newPatient, fetchAllData]);

  const handleTransfer = useCallback(async (e) => {
    e.preventDefault();
    try {
      await createTransfer(transferData);
      setTransferData({ patientId: '', fromRoom: '', toRoom: '', reason: '' });
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Transfer failed');
    }
  }, [transferData, fetchAllData]);

  const handleDischarge = useCallback(async (patientId, notes) => {
    try {
      await dischargePatient(patientId, { dischargeNotes: notes });
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Discharge failed');
    }
  }, [fetchAllData]);

  const handleDischargeForm = useCallback(async (e) => {
    e.preventDefault();
    await handleDischarge(dischargePatientId, dischargeNotes);
    setDischargePatientId('');
    setDischargeNotes('');
  }, [dischargePatientId, dischargeNotes, handleDischarge]);

  const handleAddEquipment = useCallback(async (e) => {
    e.preventDefault();
    try {
      await addEquipment(newEquipment);
      setNewEquipment({ name: '', roomNumber: '', status: 'Available' });
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add equipment');
    }
  }, [newEquipment, fetchAllData]);

  // ── Update room status ────────────────────────────────────
  const handleUpdateRoomStatus = useCallback(async (roomNumber, status) => {
    try {
      await updateRoom(roomNumber, { status });
      fetchAllData(); // refresh rooms list
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update room status');
    }
  }, [fetchAllData]);

  const handlePrint = useCallback(() => window.print(), []);

  // ─── Render ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-2xl text-white">
        Loading...
      </div>
    );
  }

  const renderPage = () => {
    switch (activeNav) {
      case 'Dashboard':
        return (
          <DashboardPage
            stats={stats}
            newRoom={newRoom}
            setNewRoom={setNewRoom}
            handleAddRoom={handleAddRoom}
            newPatient={newPatient}
            setNewPatient={setNewPatient}
            handleRegisterPatient={handleRegisterPatient}
            transferData={transferData}
            setTransferData={setTransferData}
            handleTransfer={handleTransfer}
            dischargePatientId={dischargePatientId}
            setDischargePatientId={setDischargePatientId}
            dischargeNotes={dischargeNotes}
            setDischargeNotes={setDischargeNotes}
            handleDischarge={handleDischargeForm}
            newEquipment={newEquipment}
            setNewEquipment={setNewEquipment}
            handleAddEquipment={handleAddEquipment}
            equipment={equipment}
          />
        );
      case 'Patients':
        return (
          <PatientsPage
            patients={patients}
            searchTerm={searchTerm}
            handleDischarge={handleDischarge}
            fetchAllData={fetchAllData}
          />
        );
      case 'Rooms':
        return (
          <div>
            {/* Quick Add Room form on Rooms page */}
            <div className="mb-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <h3 className="text-lg font-semibold text-white">Add New Room</h3>
              <form onSubmit={handleAddRoom} className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white outline-none placeholder:text-slate-400"
                  placeholder="Room Number (e.g., 01-101)"
                  value={newRoom.roomNumber}
                  onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                  required
                />
                <select
                  className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white outline-none"
                  value={newRoom.ward}
                  onChange={(e) => setNewRoom({ ...newRoom, ward: e.target.value })}
                  required
                >
                  <option value="">Ward</option>
                  {WARD_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
                <select
                  className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white outline-none"
                  value={newRoom.totalBeds}
                  onChange={(e) => setNewRoom({ ...newRoom, totalBeds: Number(e.target.value) })}
                  required
                >
                  <option value="">Beds</option>
                  {[1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <select
                  className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white outline-none"
                  value={newRoom.status}
                  onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button type="submit" className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 py-2 font-semibold text-slate-950">
                  Add Room
                </button>
              </form>
            </div>
            <RoomsPage rooms={rooms} searchTerm={searchTerm} onStatusChange={handleUpdateRoomStatus} />
          </div>
        );
      case 'Receipts':
        return <ReceiptsPage patients={patients} handlePrint={handlePrint} />;
      case 'Reports':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-white">Reports & Analytics</h2>
            <p className="mt-4 text-slate-400">Coming soon – ward occupancy charts, discharge summaries, etc.</p>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  // ─── Main layout ───────────────────────────────────────────
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.14),transparent_26%),radial-gradient(circle_at_60%_90%,rgba(249,115,22,0.10),transparent_20%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-4 p-4 lg:flex-row">
        {/* Sidebar */}
        <aside className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl lg:w-[260px] lg:flex-shrink-0 lg:flex-col">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-600 text-sm font-black text-slate-950">H+</div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-cyan-200/70">HealPlus</p>
              <h1 className="text-lg font-semibold text-white">Smart Hospital</h1>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/10 bg-slate-900/70 text-xs font-bold text-white">GH</div>
            <h2 className="text-base font-semibold text-white">Dr. Gregory House</h2>
            <p className="mt-1 text-sm text-slate-300/80">Chief Medical Clerk</p>
            <p className="text-sm text-slate-300/80">Reception and Ward Control</p>
          </div>

          <nav className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                  activeNav === item
                    ? 'bg-cyan-400/15 text-white shadow-inner shadow-cyan-300/10'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setActiveNav(item)}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    activeNav === item ? 'bg-gradient-to-b from-cyan-200 to-blue-500' : 'bg-slate-500'
                  }`}
                />
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto grid gap-2 pt-4">
            <button className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10">Settings</button>
            <button className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-400 transition hover:bg-white/10 hover:text-slate-200">Logout</button>
          </div>
        </aside>

        {/* Main */}
        <section className="flex-1 rounded-[32px] border border-white/10 bg-slate-900/70 p-4 shadow-2xl backdrop-blur-xl lg:p-5">
          {/* Header – Search Bar */}
          <header className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 max-xl:w-full xl:max-w-xl">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
              </svg>
              <input
                className="w-full border-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
                type="search"
                placeholder="Search rooms, patients, wards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M6 7.5h12v8H10l-4 3v-3H6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M12 5a4 4 0 0 0-4 4v2.7c0 .7-.2 1.4-.6 2l-1 1.6h11.2l-1-1.6c-.4-.6-.6-1.3-.6-2V9a4 4 0 0 0-4-4Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 18a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </button>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-xs font-bold text-slate-950">EB</div>
                <div className="leading-tight">
                  <strong className="block text-sm font-semibold text-white">Elisabeth Beck</strong>
                  <span className="block text-xs text-slate-400">Administrator</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="mt-4">
            {renderPage()}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;