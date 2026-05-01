# Gourmet Express Ecosystem

A complete restaurant ecosystem featuring a Backend API, Web Frontend, Mobile App, and Telegram Bot.

## Project Structure

- `backend/`: Node.js Express API with MongoDB & JWT Auth.
- `frontend-web/`: React.js + Tailwind CSS + Framer Motion.
- `frontend-mobile/`: Flutter (Material 3 + Provider).
- `telegram-bot/`: Telegraf-based Telegram Bot.

## Getting Started

### 1. Backend
```bash
cd backend
npm install
# Update .env with your MONGO_URI and JWT_SECRET
npm run dev
```

### 2. Frontend Web
```bash
cd frontend-web
npm install
npm run dev
```

### 3. Telegram Bot
```bash
cd telegram-bot
npm install
# Update .env with your BOT_TOKEN
npm run dev
```

### 4. Mobile App
```bash
cd frontend-mobile
flutter pub get
flutter run
```

## Key Features

- **Authentication**: JWT-based login/register.
- **Menu Management**: Categories, search, and admin CRUD.
- **Ordering System**: Real-time cart and order status tracking.
- **Geolocation**: Find nearest branches via Web, Mobile, or Telegram.
- **Modern UI**: Uber Eats style aesthetics with smooth animations.

## Environment Variables (.env)

### Backend
- `PORT=5000`
- `MONGO_URI=your_mongodb_uri`
- `JWT_SECRET=your_jwt_secret`

### Telegram Bot
- `BOT_TOKEN=your_telegram_bot_token`
