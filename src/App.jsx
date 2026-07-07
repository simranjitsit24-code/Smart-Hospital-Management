import { useState } from 'react'
import './App.css'

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

function App() {
  const [activeNav, setActiveNav] = useState('Patients')

  const handlePrint = () => {
    window.print()
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="ambient ambient-c" />

      <section className="dashboard-frame">
        <aside className="sidebar">
          <div className="brand-block">
            <div className="brand-mark">H+</div>
            <div>
              <p className="eyebrow">HealPlus</p>
              <h1>Smart Hospital</h1>
            </div>
          </div>

          <div className="profile-card">
            <div className="avatar avatar-doctor">GH</div>
            <div>
              <h2>Dr. Gregory House</h2>
              <p>Chief Medical Clerk</p>
              <p>Reception and Ward Control</p>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Hospital sections">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                className={item === activeNav ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveNav(item)}
              >
                <span className="nav-bullet" aria-hidden="true" />
                {item}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button type="button" className="ghost-btn">
              Settings
            </button>
            <button type="button" className="ghost-btn ghost-btn-muted">
              Logout
            </button>
          </div>
        </aside>

        <section className="workspace">
          <header className="topbar">
            <label className="search-bar">
              <span className="search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                </svg>
              </span>
              <input type="search" placeholder="Search patients, wards, bed numbers" />
            </label>

            <div className="topbar-actions">
              <span className="date-pill">Thursday, 07 July 2026</span>
              <button type="button" className="icon-chip" aria-label="Messages">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 7.5h12v8H10l-4 3v-3H6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="icon-chip" aria-label="Notifications">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5a4 4 0 0 0-4 4v2.7c0 .7-.2 1.4-.6 2l-1 1.6h11.2l-1-1.6c-.4-.6-.6-1.3-.6-2V9a4 4 0 0 0-4-4Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M10 18a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <div className="user-chip">
                <div className="avatar avatar-small">EB</div>
                <div>
                  <strong>Elisabeth Beck</strong>
                  <span>Administrator</span>
                </div>
              </div>
            </div>
          </header>

          <section className="overview-grid">
            <article className="patient-card panel glass">
              <div className="label-row">
                <span className="tag tag-warm">Trauma</span>
                <span className="tag tag-cool">Diabetic</span>
              </div>

              <div className="patient-heading">
                <p className="eyebrow">Active Admission</p>
                <h2>Abhishek Kohli</h2>
                <p>28, Male | 180 cm | 78 kg | O+ve</p>
                <p>Admitted on 29th June 2026, 10:20 A.M.</p>
              </div>

              <div className="case-note">
                <div>
                  <span className="section-title">Head Trauma</span>
                  <p>Blurred vision and signs of external bleeding.</p>
                </div>
                <div>
                  <span className="section-title accent">Myocardial Contusion</span>
                  <p>Cardiac concern with abnormal heartbeat.</p>
                </div>
                <div>
                  <span className="section-title warning">Debris Laceration</span>
                  <p>Minor bleeding from neck and cut injuries.</p>
                </div>
                <div>
                  <span className="section-title gold">Pulmonary Edema</span>
                  <p>Fluid buildup noted in both lungs.</p>
                </div>
              </div>
            </article>

            <article className="figure-card panel glass">
              <div className="figure-capsule">
                <span className="figure-pin head">Head Trauma</span>
                <span className="figure-pin chest">Myocardial Contusion</span>
                <span className="figure-pin left">Debris Laceration</span>
                <span className="figure-pin lung">Pulmonary Edema</span>

                <div className="figure silhouette" aria-hidden="true">
                  <span className="pulse pulse-head" />
                  <span className="pulse pulse-chest" />
                  <span className="pulse pulse-lungs" />
                </div>
              </div>
            </article>

            <aside className="status-column">
              <article className="severity-card panel glass">
                <div>
                  <p className="eyebrow">Severity Level</p>
                  <h2>Critical</h2>
                </div>
                <div>
                  <p className="eyebrow align-right">Survival Rate</p>
                  <strong className="big-number">33.8%</strong>
                </div>
                <div className="severity-meter" aria-hidden="true">
                  <span />
                </div>
              </article>

              <article className="summary-card panel glass">
                <h3>Accident, Trauma</h3>
                <p>
                  A 28-year-old male presents with head trauma, contusion,
                  chest laceration, and wound care under observation.
                </p>
                <button type="button" className="text-link">
                  Read More
                </button>
              </article>

              <div className="vitals-grid">
                {vitals.map((item) => (
                  <article key={item.label} className={`vital-card ${item.tone}`}>
                    <span className="vital-label">{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>

              <article className="resp-card panel glass">
                <div className="resp-header">
                  <p className="eyebrow">Respiratory Rate</p>
                  <strong>546 bph</strong>
                </div>
                <div className="resp-bars" aria-hidden="true">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <span key={index} style={{ '--bar-h': `${28 + (index % 5) * 12}px` }} />
                  ))}
                </div>
              </article>

              <article className="mini-panel panel glass purple">
                <div className="mini-icon">QR</div>
                <div>
                  <p className="eyebrow">SpO2 Level</p>
                  <strong>89%</strong>
                </div>
                <span className="status-dot" />
              </article>
            </aside>
          </section>

          <section className="workflow-section panel glass">
            <div className="section-head">
              <div>
                <p className="eyebrow">Hospital Clerk Workflow</p>
                <h2>Operational Features</h2>
              </div>
              <div className="section-actions">
                <span className="chip chip-soft">Occupied 146</span>
                <span className="chip chip-soft">Beds Available 27</span>
              </div>
            </div>

            <div className="workflow-grid">
              {workflowItems.map((item) => (
                <article key={item.title} className="workflow-card">
                  <span className="workflow-value">{item.value}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="receipt-grid">
            <article className="receipt-summary panel glass">
              <p className="eyebrow">Patient Receipt Feature</p>
              <h2>Printable admission slip and discharge flow</h2>
              <p>
                The backend can generate receipt data, while this screen shows a
                clean admission slip layout for clerks to print or export.
              </p>

              <div className="feature-pills">
                <span className="chip">Hospital logo</span>
                <span className="chip">Receipt number</span>
                <span className="chip">QR code</span>
                <span className="chip">Print-ready</span>
              </div>

              <div className="receipt-actions">
                <button type="button" className="primary-btn" onClick={handlePrint}>
                  Print Admission Slip
                </button>
                <button type="button" className="secondary-btn">
                  Print Discharge Summary
                </button>
              </div>
            </article>

            <article className="receipt-card panel receipt-printable">
              <div className="receipt-top">
                <div className="hospital-mark">
                  <span className="brand-mark small">H+</span>
                  <div>
                    <p>HealPlus Hospital</p>
                    <span>Smart Room Management System</span>
                  </div>
                </div>
                <div className="receipt-number">
                  <span>Receipt No.</span>
                  <strong>REC-2026-0001</strong>
                </div>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-title-block">
                <p className="receipt-heading">HOSPITAL ADMISSION SLIP</p>
                <p className="receipt-subheading">Printable patient registration receipt</p>
              </div>

              <div className="receipt-grid-fields">
                <div>
                  <span>Patient ID</span>
                  <strong>P1001</strong>
                </div>
                <div>
                  <span>Patient Name</span>
                  <strong>Simranjit Singh</strong>
                </div>
                <div>
                  <span>Age</span>
                  <strong>21</strong>
                </div>
                <div>
                  <span>Gender</span>
                  <strong>Male</strong>
                </div>
                <div>
                  <span>Ward</span>
                  <strong>General</strong>
                </div>
                <div>
                  <span>Room Number</span>
                  <strong>A-101</strong>
                </div>
                <div>
                  <span>Bed Number</span>
                  <strong>B-1</strong>
                </div>
                <div>
                  <span>Admission Date</span>
                  <strong>07/07/2026</strong>
                </div>
                <div>
                  <span>Registered By</span>
                  <strong>Clerk</strong>
                </div>
                <div>
                  <span>Registration Fee</span>
                  <strong>₹500</strong>
                </div>
              </div>

              <div className="receipt-bottom">
                <div className="qr-block" aria-hidden="true">
                  {Array.from({ length: 25 }).map((_, index) => (
                    <span key={index} className={index % 4 === 0 ? 'on' : ''} />
                  ))}
                </div>

                <div className="receipt-note">
                  <p>Thank You</p>
                  <span>Keep this slip for room allocation and billing.</span>
                </div>
              </div>
            </article>
          </section>

          <section className="feature-strip panel glass">
            <div className="section-head compact">
              <div>
                <p className="eyebrow">Project Report Feature List</p>
                <h2>What this interface covers</h2>
              </div>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <div key={feature} className="feature-item">
                  <span className="feature-dot" aria-hidden="true" />
                  {feature}
                </div>
              ))}
            </div>
          </section>
        </section>
      </section>
    </main>
  )
}

export default App
