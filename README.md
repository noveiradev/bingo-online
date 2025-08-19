<a name="readme-top"></a>

<div align="center">
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img width="300px" alt="Logo Bingo Online" src="https://github.com/user-attachments/assets/8ba1177d-ba09-4ed2-8651-1f4d2be77a2d" />
  </a>

  # 🎲 Bingo Online Risas y Cartones 🎲
  
  Bingo Online Risas y Cartones: a fullstack web application that brings traditional bingo to the web, with real-time gameplay, game management, and automatic card validation.
</div>

## 🚀 Main Features

- 🔷 **Real-time gameplay:** all players see the numbers at the same time.  
- 🔷 **Admin panel:** create games, select patterns, and control the number broadcast with voice narration.  
- 🔷 **Card selection:** choose how many cards to play with.  
- 🔷 **Automatic validation:** verifies that marked numbers match both the drawn numbers and the selected pattern before declaring a winner.  
- 🔷 **Game history:** track numbers and card statuses in real time.  
- 🔷 **Roles & security:** access control for users and admins.  
- 🔷 **Device compatibility:** responsive and accessible interface.

## 📸 Live Game Screenshots
<img width="2241" height="1427" alt="Image" src="https://github.com/user-attachments/assets/c875c63c-1c9e-4eeb-b2d3-357fe681eeac" />

## 📝 Prerequisites

Before getting started, make sure you have installed:  

- [Node.js](https://nodejs.org/) (v18+ recommended)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  
- [Access to Turso](https://turso.tech/) – for storing and querying game data

## 💻 Installation

### 1. Clone the repository:  
```bash
git clone https://github.com/noveiradev/bingo-online.git
cd bingo-online
```

### 2. Install backend dependencies:
```bash
cd backend
npm install
```

### 3. Set environment variables (.env):
```bash
PORT=3000
JWT_SECRET=your_secret
TURSO_URL=your_turso_database_url
TURSO_TOKEN=your_turso_api_token
```

### 4. Start the backend:
```bash
npm run dev
```

### 5. Install frontend dependencies:
```bash
cd frontend
npm install
```

### 6. Start the frontend:
```bash
npm run dev
```

## 🛠️ Stack

- [![React][react-badge]][react-url] - Library for building interactive user interfaces.  
- [![React Router][router-badge]][router-url] - Routing management in React applications.  
- [![Tailwind CSS][tailwind-badge]][tailwind-url] - Utility-first CSS framework for rapidly building custom designs.  
- [![Node.js][node-badge]][node-url] - JavaScript runtime environment for backend.  
- [![Express][express-badge]][express-url] - Minimalist Node.js framework for APIs and servers.  
- [![Turso][turso-badge]][turso-url] - Distributed database for fast and scalable storage.  
- [![Socket.IO][socket-badge]][socket-url] - Real-time communication via WebSockets.  
- [![JWT][jwt-badge]][jwt-url] - Authentication and security based on JSON Web Tokens.

[react-url]: https://reactjs.org/
[router-url]: https://reactrouter.com/
[tailwind-url]: https://tailwindcss.com/
[node-url]: https://nodejs.org/
[express-url]: https://expressjs.com/
[turso-url]: https://turso.tech/
[socket-url]: https://socket.io/
[jwt-url]: https://jwt.io/

[react-badge]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black
[router-badge]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[tailwind-badge]: https://img.shields.io/badge/Tailwind-ffffff?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8
[node-badge]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[express-badge]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white
[turso-badge]: https://img.shields.io/badge/Turso-4ECCA3?style=for-the-badge&logo=turso&logoColor=white
[socket-badge]: https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white
[jwt-badge]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white

<p align="right">(<a href="#readme-top">Back to top</a>)</p>
