import { useEffect, useState } from 'react';
import {
  getPatients,
  getRooms,
  getDashboardStats,
  registerPatient,
  addRoom,
  createTransfer,
  dischargePatient,
} from './api';

const navItems = ['Dashboard', 'Patients', 'Rooms', 'Receipts', 'Reports'];

const dischargeSteps = [
  'Verify booking and room history',
  'Clear room and bed',
  'Generate discharge slip',
  'Print handover receipt',
];

const roomStatusLegend = [
  { label: 'Available', tone: 'bg-emerald-400' },
  { label: 'Occupied', tone: 'bg-rose-400' },
  { label: 'Reserved / Cleaning', tone: 'bg-amber-300' },
];

function App() {
  const [activeNav, setActiveNav] = useState('Patients');
  const [patients, setPatients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // ── Form states ──────────────────────────────────────────
  const [newRoom, setNewRoom] = useState({ roomNumber: '', ward: '', totalBeds: '' });
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

  // ── Fetch all data ────────────────────────────────────────
  const fetchAllData = async () => {
    try {
      const [patientsRes, roomsRes, statsRes] = await Promise.all([
        getPatients(),
        getRooms(),
        getDashboardStats(),
      ]);
      setPatients(patientsRes.data);
      setRooms(roomsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data. Check backend or network.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ── Handlers ──────────────────────────────────────────────
  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await addRoom(newRoom);
      setNewRoom({ roomNumber: '', ward: '', totalBeds: '' });
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add room');
    }
  };

  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    try {
      await registerPatient(newPatient);
      setNewPatient({ name: '', age: '', gender: '', disease: '', ward: '', roomNumber: '', contact: '' });
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to register patient');
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      await createTransfer(transferData);
      setTransferData({ patientId: '', fromRoom: '', toRoom: '', reason: '' });
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Transfer failed');
    }
  };

  const handleDischarge = async (e) => {
    e.preventDefault();
    try {
      await dischargePatient(dischargePatientId, { dischargeNotes });
      setDischargePatientId('');
      setDischargeNotes('');
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Discharge failed');
    }
  };

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-2xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background gradients - unchanged */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.14),transparent_26%),radial-gradient(circle_at_60%_90%,rgba(249,115,22,0.10),transparent_20%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-4 p-4 lg:flex-row">
        {/* Sidebar - unchanged */}
        <aside className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:w-[260px] lg:flex-shrink-0 lg:flex-col">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-600 text-sm font-black text-slate-950">
              H+
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-cyan-200/70">HealPlus</p>
              <h1 className="text-lg font-semibold text-white">Smart Hospital</h1>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/10 bg-slate-900/70 text-xs font-bold text-white">
              GH
            </div>
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
            <button className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10">
              Settings
            </button>
            <button className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-400 transition hover:bg-white/10 hover:text-slate-200">
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 rounded-[32px] border border-white/10 bg-slate-900/70 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:p-5">
          {/* Header - unchanged */}
          <header className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 max-xl:w-full xl:max-w-xl">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
              </svg>
              <input
                className="w-full border-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
                type="search"
                placeholder="Search bookings, wards, room numbers"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2 justify-self-end">
              <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                Thursday, 07 July 2026
              </span>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M6 7.5h12v8H10l-4 3v-3H6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M12 5a4 4 0 0 0-4 4v2.7c0 .7-.2 1.4-.6 2l-1 1.6h11.2l-1-1.6c-.4-.6-.6-1.3-.6-2V9a4 4 0 0 0-4-4Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M10 18a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-xs font-bold text-slate-950">
                  EB
                </div>
                <div className="leading-tight">
                  <strong className="block text-sm font-semibold text-white">Elisabeth Beck</strong>
                  <span className="block text-xs text-slate-400">Administrator</span>
                </div>
              </div>
            </div>
          </header>

          {/* ── Dashboard Cards & Room Distribution ── */}
          <section className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.95fr_0.95fr]">
            <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {stats.totalBeds || 0} Rooms
                </span>
                <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200">
                  {stats.wardStats?.length || 0} Wards
                </span>
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Room Operations</p>
                <h2 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
                  Ward distribution for every floor
                </h2>
                <p className="text-sm text-slate-300">
                  This layout focuses on room booking, slip generation, transfers, and discharge.
                </p>
                <p className="text-sm text-slate-300">
                  No patient monitoring panel, only room and floor management controls.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { title: 'Register Booking', value: '01', detail: 'Capture patient name, ward need, and admission date' },
                  { title: 'Generate Slip ID', value: 'SL-2026-001', detail: 'Unique room booking slip number for tracking' },
                  { title: 'Assign Floor & Ward', value: 'F2 / General', detail: 'System suggests an empty room automatically' },
                  { title: 'Transfer Room', value: '02', detail: 'Move a booking to another room or floor' },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-sm font-semibold text-cyan-200">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.detail}</p>
                    <span className="mt-3 inline-flex rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/5 p-5 xl:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Room Distribution</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    All Rooms – {rooms.length} total
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {roomStatusLegend.map((item) => (
                    <span key={item.label} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                      <span className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${item.tone}`} />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {rooms.map((room) => (
                  <article key={room.roomNumber} className="rounded-[24px] border border-white/10 bg-slate-950/45 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-white">{room.roomNumber}</p>
                        <p className="text-sm text-slate-400">{room.ward}</p>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
                        {room.occupiedBeds}/{room.totalBeds} beds
                      </span>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${
                          room.status === 'Occupied'
                            ? 'bg-rose-400'
                            : room.status === 'Reserved'
                            ? 'bg-amber-300'
                            : room.status === 'Cleaning'
                            ? 'bg-violet-400'
                            : 'bg-emerald-400'
                        }`}
                        style={{ width: `${(room.occupiedBeds / room.totalBeds) * 100}%` }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                      <span>{room.status}</span>
                      <span>{Math.round((room.occupiedBeds / room.totalBeds) * 100)}% occupied</span>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <aside className="grid gap-4">
              {[
                { label: 'Total Rooms', value: stats.totalBeds || 0, tone: 'cyan' },
                { label: 'Occupied Rooms', value: stats.occupiedBeds || 0, tone: 'rose' },
                { label: 'Available Rooms', value: stats.availableBeds || 0, tone: 'emerald' },
                { label: 'Occupancy %', value: `${stats.occupancyPercent || 0}%`, tone: 'violet' },
              ].map((card) => (
                <article
                  key={card.label}
                  className={`rounded-[28px] border border-white/10 bg-white/5 p-5 ${
                    card.tone === 'rose'
                      ? 'ring-1 ring-rose-400/10'
                      : card.tone === 'emerald'
                      ? 'ring-1 ring-emerald-400/10'
                      : card.tone === 'violet'
                      ? 'ring-1 ring-violet-400/10'
                      : 'ring-1 ring-cyan-400/10'
                  }`}
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">{card.label}</p>
                  <strong className="mt-2 block text-3xl text-white">{card.value}</strong>
                </article>
              ))}

              <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Room Availability Highlights</h3>
                <div className="mt-4 grid gap-3">
                  {stats.wardStats?.slice(0, 4).map((ward) => (
                    <div
                      key={ward.ward}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm"
                    >
                      <span className="text-slate-200">{ward.ward}</span>
                      <span className="text-slate-400">{ward.available} vacant</span>
                    </div>
                  ))}
                </div>
              </article>
            </aside>
          </section>

          {/* ── Room Adding and Discharging Interface ── */}
          <section className="mt-4 rounded-[30px] border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">
                  Room Adding and Discharging Interface
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Add room, transfer booking, and discharge in one workflow
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  Occupied {stats.occupiedBeds || 0}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  Available {stats.availableBeds || 0}
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.95fr]">
              {/* Left column: Add Room & Register Patient */}
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Add / Assign Room</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Create a room booking slip, assign ward, and reserve an available bed.
                  </p>
                  <form onSubmit={handleAddRoom} className="mt-4 grid gap-3">
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Room Number (e.g., A-101)"
                      value={newRoom.roomNumber}
                      onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                      required
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="Ward (General / ICU)"
                        value={newRoom.ward}
                        onChange={(e) => setNewRoom({ ...newRoom, ward: e.target.value })}
                        required
                      />
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="Total Beds"
                        type="number"
                        value={newRoom.totalBeds}
                        onChange={(e) => setNewRoom({ ...newRoom, totalBeds: e.target.value })}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950"
                    >
                      Add Room
                    </button>
                  </form>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Register Patient</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Admit a new patient and assign them to an available room.
                  </p>
                  <form onSubmit={handleRegisterPatient} className="mt-4 grid gap-3">
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Patient Name"
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      required
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="Age"
                        type="number"
                        value={newPatient.age}
                        onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="Gender (Male/Female)"
                        value={newPatient.gender}
                        onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                      />
                    </div>
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Disease / Reason"
                      value={newPatient.disease}
                      onChange={(e) => setNewPatient({ ...newPatient, disease: e.target.value })}
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="Ward"
                        value={newPatient.ward}
                        onChange={(e) => setNewPatient({ ...newPatient, ward: e.target.value })}
                        required
                      />
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="Room Number"
                        value={newPatient.roomNumber}
                        onChange={(e) => setNewPatient({ ...newPatient, roomNumber: e.target.value })}
                        required
                      />
                    </div>
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Contact"
                      value={newPatient.contact}
                      onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
                    />
                    <button
                      type="submit"
                      className="mt-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950"
                    >
                      Register Patient
                    </button>
                  </form>
                </div>
              </div>

              {/* Right column: Transfer and Discharge */}
              <div className="grid gap-4">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Room Inventory</h3>
                  <div className="mt-4 grid gap-3">
                    {rooms.slice(0, 4).map((room) => (
                      <div
                        key={room.roomNumber}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div>
                          <p className="font-semibold text-white">
                            {room.roomNumber} · {room.occupiedBeds}/{room.totalBeds} beds
                          </p>
                          <p className="text-sm text-slate-400">{room.ward} Ward</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            room.status === 'Available'
                              ? 'bg-emerald-400/10 text-emerald-200'
                              : room.status === 'Occupied'
                              ? 'bg-rose-400/10 text-rose-200'
                              : room.status === 'Reserved'
                              ? 'bg-amber-300/10 text-amber-200'
                              : 'bg-violet-400/10 text-violet-200'
                          }`}
                        >
                          {room.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transfer form */}
                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Transfer Booking</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Move a booking between wards without losing slip history.
                  </p>
                  <form onSubmit={handleTransfer} className="mt-4 grid gap-3">
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Patient ID (e.g., P1001)"
                      value={transferData.patientId}
                      onChange={(e) => setTransferData({ ...transferData, patientId: e.target.value })}
                      required
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="From Room"
                        value={transferData.fromRoom}
                        onChange={(e) => setTransferData({ ...transferData, fromRoom: e.target.value })}
                        required
                      />
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="To Room"
                        value={transferData.toRoom}
                        onChange={(e) => setTransferData({ ...transferData, toRoom: e.target.value })}
                        required
                      />
                    </div>
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Reason (optional)"
                      value={transferData.reason}
                      onChange={(e) => setTransferData({ ...transferData, reason: e.target.value })}
                    />
                    <button
                      type="submit"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                    >
                      Transfer Booking
                    </button>
                  </form>
                </div>

                {/* Discharge form */}
                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Discharge Booking</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Close the booking, free the room, and generate the discharge slip.
                  </p>
                  <form onSubmit={handleDischarge} className="mt-4 grid gap-3">
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Patient ID to discharge"
                      value={dischargePatientId}
                      onChange={(e) => setDischargePatientId(e.target.value)}
                      required
                    />
                    <textarea
                      className="min-h-28 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Discharge notes, handover info, cleaning status"
                      value={dischargeNotes}
                      onChange={(e) => setDischargeNotes(e.target.value)}
                    />

                    <div className="mt-4 grid gap-2 text-sm text-slate-300">
                      {dischargeSteps.map((step) => (
                        <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                          {step}
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                    >
                      Discharge Booking & Release Room
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* ── Booking Slip Feature ── */}
          <section className="mt-4 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[30px] border border-white/10 bg-white/5 p-5">
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Booking Slip Feature</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Printable room booking slip and discharge flow
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The backend can generate slip data, while this screen shows a clean room booking
                slip layout for clerks to print or export.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {['Hospital logo', 'Slip number', 'QR code', 'Print-ready'].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950"
                  onClick={handlePrint}
                >
                  Print Booking Slip
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                >
                  Print Discharge Slip
                </button>
              </div>
            </article>

            <article className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#f7fafc,#eef4f9)] p-5 text-slate-900 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
              {/* Static receipt example – you can later replace with real data */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-black text-white">
                    H+
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">HealPlus Hospital</p>
                    <span className="text-sm text-slate-500">Smart Room Management System</span>
                  </div>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <span className="block uppercase tracking-[0.24em]">Slip No.</span>
                  <strong className="block text-slate-900">SL-2026-001</strong>
                </div>
              </div>

              <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

              <div className="text-center">
                <p className="text-[0.8rem] font-black tracking-[0.35em] text-slate-800">ROOM BOOKING SLIP</p>
                <p className="mt-1 text-sm text-slate-500">Printable room booking and discharge receipt</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                {[
                  ['Patient ID', 'P1001'],
                  ['Patient Name', 'Simranjit Singh'],
                  ['Floor', 'Floor 2'],
                  ['Ward', 'General'],
                  ['Room Number', 'A-101'],
                  ['Bed Number', 'B-1'],
                  ['Admission Date', '07/07/2026'],
                  ['Registered By', 'Clerk'],
                  ['Fee / Deposit', '₹500'],
                  ['Status', 'Booked'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-white p-3">
                    <span className="block text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">{label}</span>
                    <strong className="mt-1 block text-slate-900">{value}</strong>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div className="grid h-24 w-24 grid-cols-5 gap-1 rounded-2xl border border-slate-200 bg-white p-3">
                  {Array.from({ length: 25 }).map((_, index) => (
                    <span key={index} className={`rounded-sm ${index % 4 === 0 ? 'bg-slate-900' : 'bg-slate-200'}`} />
                  ))}
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-900">Thank You</p>
                  <span className="text-sm text-slate-500">
                    Keep this slip for room allocation, transfer, and discharge.
                  </span>
                </div>
              </div>
            </article>
          </section>

          {/* ── Feature List ── */}
          <section className="mt-4 rounded-[30px] border border-white/10 bg-white/5 p-5">
            <div className="mb-4">
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Project Report Feature List</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">What this interface covers</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {[
                'Room Booking Slip Generation',
                'Auto Room Allocation',
                'Floor-wise Ward Distribution',
                'Room Transfer Management',
                'Bed Availability Dashboard',
                'QR Code Generation',
                'Admission Receipt Printing',
                'Discharge Slip Printing',
                'Search & Filter Bookings',
                'Occupancy Analytics',
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex min-h-18 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-b from-cyan-200 to-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.12)]" />
                  {feature}
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

export default App;