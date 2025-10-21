# Tea Pisac Benes Website Launcher
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Tea Pisac Benes Website Server" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in WSL or Windows
if (Get-Command wsl -ErrorAction SilentlyContinue) {
    Write-Host "WSL detected. Starting server in WSL environment..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Website will be available at: http://localhost:8000" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    # Start server in WSL
    wsl -e bash -c "cd /home/orisnik/Tea && python3 -m http.server 8000"
} else {
    Write-Host "Starting local HTTP server..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Website will be available at: http://localhost:8000" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    # Try Python 3 first, then Python
    try {
        python3 -m http.server 8000
    } catch {
        try {
            python -m http.server 8000
        } catch {
            Write-Host "Python not found. Please install Python or use WSL." -ForegroundColor Red
            Read-Host "Press Enter to exit"
        }
    }
}
