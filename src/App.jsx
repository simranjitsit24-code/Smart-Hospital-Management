import { useState } from 'react'

const navItems = ['Dashboard', 'Patients', 'Rooms', 'Receipts', 'Reports']

const workflowItems = [
  {
    title: 'Register Patient',
    value: '01',
    detail: 'Capture demographics and admission reason',
  },
  {
    title: 'Generate Patient ID',
    value: 'P1001',
    detail: 'Unique hospital-wide patient record',
  },
  {
    title: 'Assign Room & Ward',
    value: 'A-101',
    detail: 'General ward bed allocation',
  },
  {
    title: 'Transfer Patient',
    value: '02',
    detail: 'Move between wards without losing history',
  },
  {
    title: 'Discharge Patient',
    value: '03',
    detail: 'Finalize summary and release bed',
  },
  {
    title: 'Search Records',
    value: 'Smart',
    detail: 'Filter by ID, name, ward, or status',
  },
  {
    title: 'Bed Availability',
    value: '84%',
    detail: 'Live occupancy dashboard for the clerk',
  },
  {
    title: 'Print Receipt',
    value: 'PDF',
    detail: 'Admission slip and discharge summary',
  },
]

const vitals = [
  { label: 'Heart Rate', value: '180 BPM', tone: 'danger' },
  { label: 'Blood Pressure', value: '148 / 96 mmHg', tone: 'warning' },
  { label: 'Glucose Level', value: '162 mg/dL', tone: 'success' },
  { label: 'SpO2 Level', value: '89%', tone: 'accent' },
]

const features = [
  'Patient Registration',
  'Auto Patient ID Generation',
  'Smart Room Allocation',
  'Room Transfer Management',
  'Bed Availability Dashboard',
  'QR Code Generation',
  'Patient Admission Receipt Printing',
  'Discharge Summary Printing',
  'Search & Filter Patients',
  'Occupancy Analytics',
]

const roomInventory = [
  { ward: 'General', room: 'A-101', bed: 'B-1', status: 'Occupied' },
  { ward: 'General', room: 'A-102', bed: 'B-2', status: 'Available' },
  { ward: 'ICU', room: 'C-201', bed: 'B-1', status: 'Critical' },
  { ward: 'Private', room: 'D-301', bed: 'Suite', status: 'Reserved' },
]

const dischargeSteps = [
  'Verify final diagnosis',
  'Clear room and bed',
  'Generate discharge summary',
  'Print receipt and handover',
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
                placeholder="Search patients, wards, bed numbers"
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

          <section className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_1fr_0.9fr]">
            <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-200">
                  Trauma
                </span>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  Diabetic
                </span>
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Active Admission</p>
                <h2 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">Abhishek Kohli</h2>
                <p className="text-sm text-slate-300">28, Male | 180 cm | 78 kg | O+ve</p>
                <p className="text-sm text-slate-300">Admitted on 29th June 2026, 10:20 A.M.</p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {workflowItems.slice(0, 4).map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-sm font-semibold text-cyan-200">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.detail}</p>
                    <span className="mt-3 inline-flex rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">{item.value}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="relative min-h-[480px] rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_18%,rgba(255,88,70,0.22),transparent_12%),linear-gradient(180deg,rgba(9,15,20,0.2),rgba(14,20,29,0.7))] p-4">
                <div className="absolute left-3 top-4 max-w-36 rounded-2xl border border-white/10 bg-slate-950/75 p-3 text-xs text-slate-100">
                  <p className="font-semibold text-orange-200">Head Trauma</p>
                  <p className="mt-1 text-slate-300">Blurred vision and external bleeding.</p>
                </div>
                <div className="absolute right-3 top-28 max-w-40 rounded-2xl border border-white/10 bg-slate-950/75 p-3 text-xs text-slate-100">
                  <p className="font-semibold text-rose-200">Myocardial Contusion</p>
                  <p className="mt-1 text-slate-300">Abnormal heartbeat under monitoring.</p>
                </div>
                <div className="absolute left-3 bottom-24 max-w-40 rounded-2xl border border-white/10 bg-slate-950/75 p-3 text-xs text-slate-100">
                  <p className="font-semibold text-amber-200">Debris Laceration</p>
                  <p className="mt-1 text-slate-300">Minor bleeding from neck and cut injuries.</p>
                </div>
                <div className="absolute right-3 bottom-10 max-w-36 rounded-2xl border border-white/10 bg-slate-950/75 p-3 text-xs text-slate-100">
                  <p className="font-semibold text-yellow-200">Pulmonary Edema</p>
                  <p className="mt-1 text-slate-300">Fluid buildup in both lungs.</p>
                </div>

                <div className="absolute inset-x-8 bottom-5 top-16 rounded-[40%] bg-[radial-gradient(circle_at_50%_12%,rgba(255,112,92,0.95)_0_6px,rgba(255,112,92,0.4)_7px,transparent_8px),radial-gradient(circle_at_50%_18%,rgba(240,245,255,0.95)_0_24px,rgba(255,255,255,0.18)_25px,transparent_26px),linear-gradient(180deg,rgba(255,255,255,0.13),rgba(255,255,255,0.02)_20%,rgba(255,255,255,0.12)_48%,rgba(255,255,255,0.02)_100%)] [clip-path:polygon(50%_0%,60%_5%,67%_14%,73%_27%,77%_42%,78%_58%,72%_70%,67%_85%,61%_100%,39%_100%,33%_85%,28%_70%,22%_58%,23%_42%,27%_27%,33%_14%,40%_5%)] shadow-[0_0_28px_rgba(120,220,255,0.22)]" aria-hidden="true">
                  <span className="absolute left-1/2 top-[18%] h-4 w-4 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_0_10px_rgba(255,94,77,0.12),0_0_28px_rgba(255,94,77,0.8)]" />
                  <span className="absolute left-1/2 top-[47%] h-4 w-4 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_0_10px_rgba(255,94,77,0.12),0_0_28px_rgba(255,94,77,0.8)]" />
                  <span className="absolute left-[44%] top-[54%] h-4 w-4 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_0_10px_rgba(255,94,77,0.12),0_0_28px_rgba(255,94,77,0.8)]" />
                </div>
              </div>
            </article>

            <aside className="grid gap-4">
              <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Severity Level</p>
                    <h2 className="mt-2 text-3xl font-semibold text-white">Critical</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Survival Rate</p>
                    <strong className="mt-2 block text-3xl text-white">33.8%</strong>
                  </div>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-gradient-to-r from-red-500 via-orange-400 via-yellow-300 via-blue-500 to-emerald-400">
                  <div className="h-full w-[18%] rounded-full bg-white/35" />
                </div>
              </article>

              <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Accident, Trauma</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  A 28-year-old male presents with head trauma, contusion, chest laceration,
                  and wound care under observation.
                </p>
                <button type="button" className="mt-4 text-sm font-semibold text-cyan-200">
                  Read More
                </button>
              </article>

              <div className="grid grid-cols-2 gap-3">
                {vitals.map((item) => (
                  <article key={item.label} className={`rounded-[24px] border border-white/10 p-4 ${item.tone === 'danger' ? 'bg-red-500/10' : item.tone === 'warning' ? 'bg-amber-500/10' : item.tone === 'success' ? 'bg-emerald-500/10' : 'bg-violet-500/10'}`}>
                    <p className="text-xs text-slate-300">{item.label}</p>
                    <strong className="mt-2 block text-lg text-white">{item.value}</strong>
                  </article>
                ))}
              </div>

              <article className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Respiratory Rate</p>
                  <strong className="text-xl text-white">546 bph</strong>
                </div>
                <div className="mt-4 flex h-24 items-end gap-2 rounded-2xl bg-black/20 px-3 py-2">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <span
                      key={index}
                      className="w-full rounded-full bg-gradient-to-t from-blue-600 to-cyan-300"
                      style={{ height: `${28 + (index % 5) * 12}px` }}
                    />
                  ))}
                </div>
              </article>

              <article className="flex items-center gap-4 rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-500/20 to-slate-900 p-5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-sm font-bold text-violet-100">
                  QR
                </div>
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">SpO2 Level</p>
                  <strong className="block text-2xl text-white">89%</strong>
                </div>
                <span className="ml-auto h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_10px_rgba(74,222,128,0.12)]" />
              </article>
            </aside>
          </section>

          <section className="mt-4 rounded-[30px] border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Room Adding and Discharging Interface</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Add room, transfer patient, and discharge in one workflow</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">Occupied 146</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">Beds Available 27</span>
              </div>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.95fr]">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Add / Assign Room</h3>
                  <p className="mt-2 text-sm text-slate-300">Create a room record, assign ward, and place the patient into an available bed.</p>
                  <div className="mt-4 grid gap-3">
                    <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400" placeholder="Patient ID / Patient Name" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400" placeholder="Ward (General / ICU)" />
                      <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400" placeholder="Room Number" />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400" placeholder="Bed Number" />
                      <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400" placeholder="Fee / Deposit" />
                    </div>
                  </div>
                  <button type="button" className="mt-4 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950">
                    Add Room & Admit Patient
                  </button>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Discharge Patient</h3>
                  <p className="mt-2 text-sm text-slate-300">Close the admission, free the bed, and generate the discharge summary.</p>
                  <div className="mt-4 grid gap-3">
                    <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400" placeholder="Search admitted patient" />
                    <textarea className="min-h-28 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400" placeholder="Discharge notes, diagnosis, follow-up instructions" />
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-slate-300">
                    {dischargeSteps.map((step) => (
                      <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        {step}
                      </div>
                    ))}
                  </div>

                  <button type="button" className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                    Discharge Patient & Release Bed
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Room Inventory</h3>
                  <div className="mt-4 grid gap-3">
                    {roomInventory.map((room) => (
                      <div key={`${room.ward}-${room.room}`} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div>
                          <p className="font-semibold text-white">{room.room} · {room.bed}</p>
                          <p className="text-sm text-slate-400">{room.ward} Ward</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${room.status === 'Available' ? 'bg-emerald-400/10 text-emerald-200' : room.status === 'Occupied' ? 'bg-rose-400/10 text-rose-200' : room.status === 'Critical' ? 'bg-amber-400/10 text-amber-200' : 'bg-blue-400/10 text-blue-200'}`}>
                          {room.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                  <h3 className="text-lg font-semibold text-white">Transfer Patient</h3>
                  <p className="mt-2 text-sm text-slate-300">Move a patient between wards without losing admission history.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400" placeholder="From Ward / Room" />
                    <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-400" placeholder="To Ward / Room" />
                  </div>
                  <button type="button" className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                    Transfer Patient
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[30px] border border-white/10 bg-white/5 p-5">
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Patient Receipt Feature</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Printable admission slip and discharge flow</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The backend can generate receipt data, while this screen shows a clean admission
                slip layout for clerks to print or export.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {['Hospital logo', 'Receipt number', 'QR code', 'Print-ready'].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">{item}</span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950" onClick={handlePrint}>
                  Print Admission Slip
                </button>
                <button type="button" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                  Print Discharge Summary
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
                  <span className="block uppercase tracking-[0.24em]">Receipt No.</span>
                  <strong className="block text-slate-900">REC-2026-0001</strong>
                </div>
              </div>

              <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

              <div className="text-center">
                <p className="text-[0.8rem] font-black tracking-[0.35em] text-slate-800">HOSPITAL ADMISSION SLIP</p>
                <p className="mt-1 text-sm text-slate-500">Printable patient registration receipt</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                {[
                  ['Patient ID', 'P1001'],
                  ['Patient Name', 'Simranjit Singh'],
                  ['Age', '21'],
                  ['Gender', 'Male'],
                  ['Ward', 'General'],
                  ['Room Number', 'A-101'],
                  ['Bed Number', 'B-1'],
                  ['Admission Date', '07/07/2026'],
                  ['Registered By', 'Clerk'],
                  ['Registration Fee', '₹500'],
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
                  <span className="text-sm text-slate-500">Keep this slip for room allocation and billing.</span>
                </div>
              </div>
            </article>
          </section>

          <section className="mt-4 rounded-[30px] border border-white/10 bg-white/5 p-5">
            <div className="mb-4">
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">Project Report Feature List</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">What this interface covers</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {features.map((feature) => (
                <div key={feature} className="flex min-h-18 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
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
