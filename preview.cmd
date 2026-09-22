@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 set "PATH=C:\Users\work\.codex-tools\blog\node-v22.23.2-win-x64;%PATH%"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 22 is required.
  pause
  exit /b 1
)
if not exist "node_modules\.bin\hexo.cmd" (
  call npm.cmd ci
  if errorlevel 1 exit /b 1
)
call npm.cmd run server -- --ip 127.0.0.1 --port 4000
