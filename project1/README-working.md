# Movies & TV Shows Web App

A React-based web application for browsing and managing movies and TV shows.

## Features

- 🎬 Browse movies and TV shows
- 🔍 Search functionality
- 📱 Responsive design
- 🎯 Filter by type (Movies/TV Shows)
- ⭐ Modern UI with grid layout

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Styling**: CSS3 with modern layouts

## Project Structure

```
Movies-and-Tv-shows-web/
├── project1/                 # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── assets/          # Images and media
│   │   └── utils/           # Utility functions
│   └── public/              # Static files
├── server/                  # Node.js backend
│   ├── database-server.js   # MongoDB server
│   └── simple-server.js     # Development server
└── backend-workspace/       # TypeScript backend
    └── src/                 # TypeScript source
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (for database features)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SSSD-2001/Movies-and-Tv-shows-web.git
   cd Movies-and-Tv-shows-web
   ```

2. Install frontend dependencies:

   ```bash
   cd project1
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd server
   node database-server.js
   # or for simple development:
   node simple-server.js
   ```

2. Start the React frontend:

   ```bash
   cd project1
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app

## Available Scripts

### Frontend (project1/)

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

### Backend (server/)

- `node database-server.js` - Starts MongoDB-connected server
- `node simple-server.js` - Starts development server with mock data

## API Endpoints

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create new movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

- **Author**: SSSD-2001
- **Repository**: [Movies-and-Tv-shows-web](https://github.com/SSSD-2001/Movies-and-Tv-shows-web)

---

**Note**: Some files may have OneDrive sync dependencies. If you encounter file access issues, ensure OneDrive is running and files are fully synced locally.
