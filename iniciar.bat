@echo off
title Maromba Burguer
color 0A

echo.
echo  ==========================================
echo   Maromba Burguer - Iniciando sistema...
echo  ==========================================
echo.

REM Verifica se Node.js esta instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo  ERRO: Node.js nao encontrado.
  echo  Baixe em: https://nodejs.org
  pause
  exit /b 1
)

echo  [1/2] Iniciando servidor web...
start "Maromba - Servidor" cmd /k "cd /d %~dp0 && node server.js"

timeout /t 2 /nobreak >nul

echo  [2/2] Iniciando tunel publico...
start "Maromba - Tunel" cmd /k "cd /d %~dp0 && call tunel.bat"

echo.
echo  ==========================================
echo   Dois terminais vao abrir:
echo   1. Servidor local (porta 3000)
echo   2. Tunel publico (URL trycloudflare.com)
echo.
echo   Copie a URL do tunel e abra no navegador.
echo   Os QR Codes ja vao usar essa URL!
echo  ==========================================
echo.
pause
