import { useState } from 'react'

const navItems = ['Dashboard', 'Patients', 'Rooms', 'Receipts', 'Reports']

const workflowItems = [
  {
    title: 'Register Booking',
    value: '01',
    detail: 'Capture patient name, ward need, and admission date',
  },
  {
    title: 'Generate Slip ID',
    value: 'SL-2026-001',
    detail: 'Unique room booking slip number for tracking',
  },
  {
    title: 'Assign Floor & Ward',
    value: 'F2 / General',
    detail: 'System suggests an empty room automatically',
  },
  {
    title: 'Transfer Room',
    value: '02',
    detail: 'Move a booking to another room or floor',
  },
  {
    title: 'Discharge & Vacate',
    value: '03',
    detail: 'Mark room as available and print discharge slip',
  },
  {
    title: 'Search Booking',
    value: 'Smart',
    detail: 'Filter by patient ID, room number, or ward',
  },
  {
    title: 'Bed Availability',
    value: '78%',
    detail: 'Live occupancy across all floors and wards',
  },
  {
    title: 'Print Slip',
    value: 'PDF',
    detail: 'Admission slip and discharge slip output',
  },
]

const dashboardCards = [
  { label: 'Total Rooms', value: '1,500', tone: 'cyan' },
  { label: 'Occupied Rooms', value: '1,170', tone: 'rose' },
  { label: 'Available Rooms', value: '330', tone: 'emerald' },
  { label: 'Occupancy %', value: '78%', tone: 'violet' },
]

const features = [
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
]

const floorDistribution = [
  {
    floor: 'Floor 1',
    rooms: 250,
    wards: 'Reception, Emergency, Diagnostics',
    status: 'Support',
    occupancy: 62,
  },
  {
    floor: 'Floor 2',
    rooms: 250,
    wards: 'General Ward A',
    status: 'General',
    occupancy: 81,
  },
  {
    floor: 'Floor 3',
    rooms: 250,
    wards: 'General Ward B, Observation',
    status: 'General',
    occupancy: 74,
  },
  {
    floor: 'Floor 4',
    rooms: 250,
    wards: 'Semi-Private, Private Rooms',
    status: 'Premium',
    occupancy: 68,
  },
  {
    floor: 'Floor 5',
    rooms: 250,
    wards: 'ICU, HDU, Isolation',
    status: 'Critical Care',
    occupancy: 89,
  },
  {
    floor: 'Floor 6',
    rooms: 250,
    wards: 'Maternity, Surgical Recovery, Admin',
    status: 'Special',
    occupancy: 53,
  },
]

const dischargeSteps = [
  'Verify booking and room history',
  'Clear room and bed',
  'Generate discharge slip',
  'Print handover receipt',
]

const roomStatusLegend = [
  { label: 'Available', tone: 'bg-emerald-400' },
  { label: 'Occupied', tone: 'bg-rose-400' },
  { label: 'Reserved / Cleaning', tone: 'bg-amber-300' },
]

function App() {
  const [activeNav, setActiveNav] = useState('Patients')

  const handlePrint = () => {
    window.print()
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.14),transparent_26%),radial-gradient(circle_at_60%_90%,rgba(249,115,22,0.10),transparent_20%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-4 p-4 lg:flex-row">
        <aside className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:w-[260px] lg:flex-shrink-0 lg:flex-col">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-600 text-sm font-black text-slate-950">
              H+
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-cyan-200/70">
                HealPlus
              </p>
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

          <nav className="mt-4 grid gap-2" aria-label="Hospital sections">
            {navItems.map((item) => {
              const active = item === activeNav
              return (
                <button
                  key={item}
                  type="button"
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${active ? 'bg-cyan-400/15 text-white shadow-inner shadow-cyan-300/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                  onClick={() => setActiveNav(item)}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-gradient-to-b from-cyan-200 to-blue-500' : 'bg-slate-500'}`}
                  />
                  {item}
                </button>
              )
            })}
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

        <section className="flex-1 rounded-[32px] border border-white/10 bg-slate-900/70 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:p-5">
          <header className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 max-xl:w-full xl:max-w-xl">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" aria-hidden="true">
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
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
                aria-label="Messages"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M6 7.5h12v8H10l-4 3v-3H6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
                aria-label="Notifications"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
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

          <section className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.95fr_0.95fr]">
            <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  1500 Rooms
                </span>
                <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200">
                  6 Floors
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
                {workflowItems.slice(0, 4).map((item) => (
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
                  <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Six Floor Distribution</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Suggested ward layout for 1,500 rooms</h2>
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
                {floorDistribution.map((floor) => (
                  <article key={floor.floor} className="rounded-[24px] border border-white/10 bg-slate-950/45 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-white">{floor.floor}</p>
                        <p className="text-sm text-slate-400">{floor.wards}</p>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
                        {floor.rooms} rooms
                      </span>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${floor.status === 'Critical Care' ? 'bg-rose-400' : floor.status === 'Premium' ? 'bg-violet-400' : floor.status === 'Special' ? 'bg-cyan-300' : floor.status === 'Support' ? 'bg-amber-300' : 'bg-emerald-400'}`}
                        style={{ width: `${floor.occupancy}%` }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                      <span>{floor.status}</span>
                      <span>{floor.occupancy}% occupied</span>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <aside className="grid gap-4">
              {dashboardCards.map((card) => (
                <article
                  key={card.label}
                  className={`rounded-[28px] border border-white/10 bg-white/5 p-5 ${card.tone === 'rose' ? 'ring-1 ring-rose-400/10' : card.tone === 'emerald' ? 'ring-1 ring-emerald-400/10' : card.tone === 'violet' ? 'ring-1 ring-violet-400/10' : 'ring-1 ring-cyan-400/10'}`}
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">{card.label}</p>
                  <strong className="mt-2 block text-3xl text-white">{card.value}</strong>
                </article>
              ))}

              <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Room Availability Highlights</h3>
                <div className="mt-4 grid gap-3">
                  {[
                    ['General Ward A', '72 vacant rooms'],
                    ['Private Rooms', '54 vacant rooms'],
                    ['ICU / HDU', '18 vacant rooms'],
                    ['Surgical Recovery', '31 vacant rooms'],
                  ].map(([title, value]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm"
                    >
                      <span className="text-slate-200">{title}</span>
                      <span className="text-slate-400">{value}</span>
                    </div>
                  ))}
                </div>
              </article>
            </aside>
          </section>

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
                  Occupied 1,170
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  Beds Available 330
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.95fr]">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Add / Assign Room</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Create a room booking slip, assign ward, and reserve an available bed.
                  </p>
                  <div className="mt-4 grid gap-3">
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Patient ID / Patient Name"
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="Ward (General / ICU)"
                      />
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="Floor Number"
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="Room Number"
                      />
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                        placeholder="Bed Number / Deposit"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950"
                  >
                    Generate Booking Slip
                  </button>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Discharge Booking</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Close the booking, free the room, and generate the discharge slip.
                  </p>
                  <div className="mt-4 grid gap-3">
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Search admitted booking"
                    />
                    <textarea
                      className="min-h-28 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="Discharge notes, handover info, cleaning status"
                    />
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-slate-300">
                    {dischargeSteps.map((step) => (
                      <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        {step}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Discharge Booking & Release Room
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Room Inventory</h3>
                  <div className="mt-4 grid gap-3">
                    {[
                      { ward: 'General', room: 'A-101', bed: 'B-1', status: 'Occupied' },
                      { ward: 'General', room: 'A-102', bed: 'B-2', status: 'Available' },
                      { ward: 'ICU', room: 'C-201', bed: 'B-1', status: 'Reserved' },
                      { ward: 'Private', room: 'D-301', bed: 'Suite', status: 'Cleaning' },
                    ].map((room) => (
                      <div
                        key={`${room.ward}-${room.room}`}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div>
                          <p className="font-semibold text-white">
                            {room.room} · {room.bed}
                          </p>
                          <p className="text-sm text-slate-400">{room.ward} Ward</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${room.status === 'Available' ? 'bg-emerald-400/10 text-emerald-200' : room.status === 'Occupied' ? 'bg-rose-400/10 text-rose-200' : 'bg-amber-300/10 text-amber-200'}`}
                        >
                          {room.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Transfer Booking</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Move a booking between wards without losing slip history.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="From Ward / Room"
                    />
                    <input
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                      placeholder="To Ward / Room"
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Transfer Booking
                  </button>
                </div>
              </div>
            </div>
          </section>

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

          <section className="mt-4 rounded-[30px] border border-white/10 bg-white/5 p-5">
            <div className="mb-4">
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">
                Project Report Feature List
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">What this interface covers</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {features.map((feature) => (
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
  )
}

export default App
