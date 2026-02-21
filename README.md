# RobCo Industries: Unified Guestbook Log
**Webprog-IT241 Final Project**

A full-stack web application featuring a Pip-Boy 3000 terminal aesthetic.

## 🛠 Tech Stack
- **Frontend:** React (Vite) + TypeScript
- **Backend:** NestJS (Node.js)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Custom CSS with CRT scanline effects

## 🚀 Execution Instructions
To run this project locally or in Codespaces, you must start both the backend and frontend simultaneously.

### Step 1: Backend Setup
1. Open a new terminal.
2. `cd personal-website-backend`
3. Create a `.env` file with your `SUPABASE_URL` and `SUPABASE_KEY`.
4. Run `npm run start:dev`

### Step 2: Frontend Setup
1. Open a second terminal.
2. `cd personal-website-frontend`
3. Create a `.env` file with `VITE_API_URL`.
4. Run `npm run dev`

### Step 3: Network Configuration
- Ensure Port **3000** is set to **Public** in the Ports tab.

## 📻 Key Features
* **Fallout Terminal UI**: Authentically styled "RobCo" interface featuring CRT scanline animations and vignette effects.
* **Interactive Audio**: Implemented a background terminal hum and tactile "click" sounds for button interactions and typing.
* **Input Validation**: Hardened frontend with character limits (200 max) and empty-field prevention to ensure database integrity.
* **Full-Stack Integration**: Real-time data synchronization between a React frontend, NestJS backend, and Supabase PostgreSQL database.
* **Secure Environment**: Utilizes `.env` configuration to protect API endpoints and database credentials.