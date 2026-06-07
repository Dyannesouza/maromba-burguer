@echo off
title Maromba Burguer - Tunel Publico
color 0A

echo.
echo  =========================================
echo   Maromba Burguer - Iniciando tunel...
echo  =========================================
echo.

REM Verifica se o cloudflared ja existe na pasta
if exist "%~dp0cloudflared.exe" goto :iniciar

echo  Baixando cloudflared (Cloudflare Tunnel)...
echo  Aguarde...
echo.

REM Baixa o cloudflared direto da Cloudflare (sem cadastro)
powershell -Command "Invoke-WebRequest -Uri 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' -OutFile '%~dp0cloudflared.exe'"

if not exist "%~dp0cloudflared.exe" (
  echo.
  echo  ERRO: Nao foi possivel baixar o cloudflared.
  echo  Verifique sua conexao com a internet.
  pause
  exit /b 1
)

echo  Download concluido!
echo.

:iniciar
echo  Iniciando tunel publico na porta 3000...
echo.
echo  =========================================
echo   IMPORTANTE: O servidor (node server.js)
echo   precisa estar rodando em outro terminal!
echo  =========================================
echo.
echo  Aguarde a URL aparecer abaixo...
echo  (Procure por: trycloudflare.com)
echo.

"%~dp0cloudflared.exe" tunnel --url http://localhost:3000

pause
