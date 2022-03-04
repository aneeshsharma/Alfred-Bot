import Discord, { MessageAttachment } from 'discord.js';
import config from './config.js';

import axios from 'axios';

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const prefix = '-';

const inspiroAPI = 'https://inspirobot.me/api?generate=true';

const animePrefix = 'https://api.waifu.pics/sfw';

const defaultReply =
    'https://tenor.com/view/arrey-kehna-kya-chahte-ho-what-is-machine-scene-engineering-3idiots-gif-21332889';

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send(`Pong! ${message.author}`);
    } else if (command === 'inspire') {
        axios
            .get(inspiroAPI)
            .then((response) => {
                const image_uri = response.data;
                message.channel.send(`${image_uri}`);
            })
            .catch((err) => {
                console.log(err);
                message.reply('X_X');
            });
    } else if (command === 'do' || command === 'get') {
        const imageUrl = `${animePrefix}/${args[0]}`;
        console.log("Getting ", imageUrl);
        axios
            .get(imageUrl)
            .then((response) => {
                console.log("Attaching", response.data.url);
                message.channel.send(response.data.url);
            })
            .catch((err) => {
                console.log(err.message);
                message.reply(`No ${args[0]} for you`);
            });
    } else {
        message.reply(`${defaultReply}`);
    }
});

client.login(config.BOT_TOKEN);
