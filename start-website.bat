@echo off
echo ========================================
echo   Tea Pisac Benes Website Server
echo ========================================
echo.
echo Starting local server...
echo.
echo Choose your option:
echo 1. Try Astro version (port 4321)
echo 2. Use HTML version (port 8000)
echo.

set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo Starting Astro server...
    npx astro dev --port 4321
) else (
    echo Starting HTML server...
    echo.
    echo Website will be available at: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
)

pause
