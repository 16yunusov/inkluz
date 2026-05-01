const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// @command /start
bot.start((ctx) => {
  ctx.reply(
    `Welcome to Gourmet Express, ${ctx.from.first_name}! 🍔\nWhat can I help you with today?`,
    Markup.keyboard([
      ['📖 View Menu', '🛒 My Orders'],
      ['📍 Nearest Branch', '📞 Contact Support'],
    ]).resize()
  );
});

// @command /menu
bot.hears('📖 View Menu', (ctx) => {
  ctx.reply('Fetching today\'s specials...');
  // Logic to fetch from API would go here
  ctx.replyWithPhoto(
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    {
      caption: '🍔 *Truffle Burger* - $18.99\nPremium wagyu beef with black truffle sauce.',
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('Add to Cart 🛒', 'add_burger')]
      ])
    }
  );
});

// @command /location
bot.hears('📍 Nearest Branch', (ctx) => {
  ctx.reply('Please send your location to find the nearest branch:', 
    Markup.keyboard([
      [Markup.button.locationRequest('📍 Send My Location')]
    ]).resize()
  );
});

// Handle location
bot.on('location', (ctx) => {
  const { latitude, longitude } = ctx.message.location;
  ctx.reply(`Searching for branches near ${latitude.toFixed(2)}, ${longitude.toFixed(2)}...`);
  // Logic to find nearest branch via API
  ctx.reply('Found one! 📍 123 Gourmet St, Downtown.\nDistance: 1.2km');
});

bot.launch().then(() => {
  console.log('Telegram Bot is running...');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
