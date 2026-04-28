@echo off
chcp 65001 >nul
title Mutaxasis ishchilar — Backend
echo.
echo   Mutaxasis ishchilar — Backend ishga tushiryapti...
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo   npm install bajarilmoqda...
    call npm install
    if errorlevel 1 (
        echo   XATO: npm install muvaffaqiyatsiz.
        pause
        exit /b 1
    )
    echo.
)

if not exist "backend\node_modules" (
    echo   Backend uchun npm install...
    cd backend
    call npm install
    cd ..
    if errorlevel 1 (
        echo   XATO: Backend npm install muvaffaqiyatsiz.
        pause
        exit /b 1
    )
    echo.
)

echo.
echo   Server ishga tushmoqda...
echo   Tugagach quyidagi linklarni brauzerda oching:
echo.
echo     http://localhost:3001
echo     http://localhost:3001/foydalanuvchilar.html
echo.
call npm start

pause
