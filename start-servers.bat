@echo off
echo Starting Movies & TV Shows Application...
echo.

echo Starting Backend Server...
cd "C:\Users\ADMIN\OneDrive - engug.ruh.ac.lk\Documents\GitHub\Movies-and-Tv-shows-web\server"
start "Backend Server" cmd /k "node simple-server.js"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting React App...
cd "C:\Users\ADMIN\OneDrive - engug.ruh.ac.lk\Documents\GitHub\Movies-and-Tv-shows-web\project1"
start "React App" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
