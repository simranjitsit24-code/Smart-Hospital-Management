Smart Hospital Room Management System
A full‑stack web application for hospital clerks to manage rooms, beds, patients, transfers, and discharges – with a beautiful dashboard, a 6‑floor × 100‑room grid, QR‑enabled admission slips, and real‑time occupancy statistics.

INTERN ID = CITS5354

🚀 Live Demo
Frontend: https://smart-hospital-management-4.onrender.com

Backend API: https://smart-hospital-management-1-7oqe.onrender.com

(Note: The frontend and backend are deployed separately on Render.)

🧱 Tech Stack
Frontend
React 19

Vite (build tool)

Tailwind CSS (styling)

React Router (navigation)

Axios (HTTP client)

react-qr-code (QR generation)

Recharts (for future charts)

Backend
Node.js + Express

MongoDB Atlas (cloud database)

Mongoose ODM

CORS, dotenv, QRCode (for server‑side generation)

Deployment
Frontend: Render Static Site

Backend: Render Web Service

Database: MongoDB Atlas

✨ Key Features
🛏️ Room Management
600 predefined rooms – 6 floors × 100 rooms, each with a ward assignment (General, ICU, Private, Semi‑Private, Maternity, Surgical).

Live room grid – colour‑coded by status (Available, Occupied, Reserved, Cleaning).

Add new rooms – with ward, bed count (1–3), and initial status.

Update room status – directly from the room card dropdown.

👤 Patient Management
Register patients – auto‑generates a unique Patient ID (e.g., P1001).

Assign patients to existing rooms – prevents assigning to fully occupied rooms.

Transfer patients – move them between rooms, with history tracking.

Discharge patients – frees the room and records discharge notes.

📊 Dashboard & Analytics
Key metrics cards: Total Rooms, Occupied Rooms, Available Rooms, Occupancy %.

Ward‑wise statistics – shows total beds, occupied, and available per ward.

Live updates – all data refreshes automatically after any action.

🧾 Printable Admission Slip
Clean, print‑optimised Room Booking Slip.

Includes patient details, room info, and a QR code that links to the patient’s record.

Prints only the slip – no extra page elements.

🧰 Equipment Tracking
Add and manage medical equipment (ventilators, monitors, etc.).

Assign equipment to rooms and track status (Available, In Use, Under Maintenance).

🔍 Search & Filter
Global search bar to filter rooms by number and patients by name or ID.

🗂️ Project Structure
text
smart-hospital-management/
├── backend/                     # Node.js + Express API
│   ├── models/                  # Mongoose schemas
│   │   ├── Patient.js
│   │   ├── Room.js
│   │   ├── Transfer.js
│   │   └── Equipment.js
│   ├── controllers/             # Route logic
│   │   ├── patientController.js
│   │   ├── roomController.js
│   │   ├── transferController.js
│   │   ├── dashboardController.js
│   │   └── equipmentController.js
│   ├── routes/                  # API endpoints
│   │   ├── patients.js
│   │   ├── rooms.js
│   │   ├── transfers.js
│   │   ├── dashboard.js
│   │   └── equipment.js
│   ├── server.js                # Entry point
│   ├── .env                     # Environment variables
│   └── seedRooms.js             # Script to populate 600 rooms
├── frontend/                    # React + Vite app
│   ├── src/
│   │   ├── api.js               # Axios client & API functions
│   │   ├── App.jsx              # Main application
│   │   ├── roomspage.jsx        # Floor‑wise room grid component
│   │   ├── index.css            # Global styles + print styles
│   │   └── main.jsx             # Entry
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
🛠️ Setup & Installation
Prerequisites
Node.js (v18+)

MongoDB Atlas account (or local MongoDB)

Git

1. Clone the repository
bash
git clone https://github.com/your-username/smart-hospital-management.git
cd smart-hospital-management
2. Backend setup
bash
cd backend
npm install
Create a .env file:

env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/smart_hospital?retryWrites=true&w=majority
PORT=5000
(Optional) Seed 600 rooms:

bash
node seedRooms.js
Start the backend:

bash
npm run dev   # for development (with nodemon)
npm start     # for production
3. Frontend setup
bash
cd ../frontend
npm install
Create a .env file (for local development):

env
VITE_API_URL=http://localhost:5000/api
Start the frontend:

bash
npm run dev   # runs on http://localhost:5173
Note: The Vite proxy is configured to forward /api requests to http://localhost:5000 during development. In production, the frontend uses the VITE_API_URL environment variable.

🚢 Deployment
Backend (Render Web Service)
Root Directory: backend

Build Command: npm install

Start Command: npm start

Environment variables: MONGO_URI, PORT (optional)

Frontend (Render Static Site)
Root Directory: frontend

Build Command: npm install && npm run build

Publish Directory: dist

Environment variables: VITE_API_URL = https://your-backend-url.onrender.com/api

Redirect/Rewrite rule: /* → /index.html (SPA support)

🧪 API Endpoints
Method	Endpoint	Description
GET	/api/patients	Get all patients (with search & filter)
POST	/api/patients	Register a new patient
PUT	/api/patients/:patientId/discharge	Discharge a patient
GET	/api/rooms	Get all rooms
POST	/api/rooms	Add a new room
PUT	/api/rooms/:roomNumber	Update room status
POST	/api/transfers	Transfer a patient to another room
GET	/api/transfers/timeline/:patientId	Get patient timeline
GET	/api/dashboard/stats	Get dashboard statistics
GET	/api/equipment	Get all equipment
POST	/api/equipment	Add a new equipment
📸 Screenshots
(Add your own screenshots here)

👨‍💻 Author
Your Name – GitHub

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

🙏 Acknowledgements
React, Vite, Tailwind CSS, MongoDB, Express, and all open‑source libraries used.

Inspired by real‑world hospital room management needs.

Happy Coding! 🚀

