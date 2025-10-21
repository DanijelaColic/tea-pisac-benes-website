@echo off
echo Starting Tea Pisac Benes website...
echo.
echo Opening browser at http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
python -m http.server 8000
