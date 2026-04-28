// PM2 production konfiguratsiyasi (npm install -g pm2)
// Ishga tushirish: pm2 start ecosystem.config.cjs

module.exports = {
  apps: [{
    name: 'mutaxasis',
    script: 'backend/server.js',
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3001
    }
  }]
};
