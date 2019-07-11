const Telbot = require('telegraf');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const bot = new Telbot(process.env.BOT_TOKEN)

bot.use(Telbot.log());

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.command('id', (ctx) => {
    const info = ctx.from;
    return ctx.reply(`Hello ${info['first_name']},\nYour id is: ${info['id']}`);
});

bot.command('sync', (ctx) => {
    return ctx.reply('Sync your phone number', Extra.markup((markup) => {
        return markup.resize().keyboard([
            markup.contactRequestButton('Authorized'),
            markup.callbackButton('Cancel', 'cancel')
        ]).oneTime();
    }));
});

bot.launch()