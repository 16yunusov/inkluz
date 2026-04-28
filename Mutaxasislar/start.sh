#!/bin/bash
cd "$(dirname "$0")"

echo ""
echo "  Mutaxasis ishchilar — Backend ishga tushiryapti..."
echo ""

if [ ! -d "node_modules" ]; then
    echo "  npm install bajarilmoqda..."
    npm install || { echo "XATO: npm install muvaffaqiyatsiz."; exit 1; }
    echo ""
fi

if [ ! -d "backend/node_modules" ]; then
    echo "  Backend uchun npm install..."
    (cd backend && npm install) || { echo "XATO: Backend npm install muvaffaqiyatsiz."; exit 1; }
    echo ""
fi

echo "  Server ishga tushmoqda..."
echo ""
npm start
