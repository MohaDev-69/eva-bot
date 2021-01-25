const prefix = "!";
const { Client, MessageEmbed } = require("discord.js"), client = new Client({
    disableMentions: "everyone",
    presence: {
        activity: {
            name: `${prefix}help | www.evabot.ga`,
            type: "PLAYING",
        }
    }
});
const Alexa = require("alexa-bot-api"), chatbot = new Alexa();
const db = require("quick.db");


client.on("ready", () => console.log("Connected to Discord API"));

client.on("message", message => {
    if (message.author.bot || !message.guild) return;

    if (message.content.startsWith(prefix + "set")) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(` > **${message.author.username}  You do not have \`MANAGE_CHANNELS\`**`);

        const channel = message.mentions.channels.filter((c) => c.guild.id == message.guild.id).first();

        if (!channel) return message.channel.send(`${message.author.username} I can't find this channel !`);

        db.set(`channel_${message.guild.id}`, channel.id);

        message.channel.send(`> **Success! The \`AI-CHAT\` channel has been set to ${channel}**`);
    } else if (message.content.startsWith(prefix + "help")) {
        const embed = new MessageEmbed()
            .setDescription("[EvaBot |  إيفُآ بوت](https://evabot.ga/)")
            .addField("Support server :", "**[support](https://discord.gg/JwKatybjhJ)**", true)
            .addField("Invite bot :", "**[invite](https://discord.com/oauth2/authorize?client_id=765625130675732551&permissions=8&scope=bot)**", true)
            .addField("Commands :", "**[commands](http://evabot.ga/commands)**", true)
            .setImage("https://cdn.discordapp.com/attachments/776454054540083251/801074941855531028/pngaaa_1_3.png");
        message.channel.send({
            content: "**Bot Website!** http://evabot.ga/",
            embed: embed
        });
    }
});

client.on("message", message => {
    if (message.author.bot || !message.guild) return;

    const chat = db.get(`channel_${message.guild.id}`);
    if (!chat || chat !== message.channel.id) return;
    if (!message.content || !message.content.trim()) return;


    chatbot
        .getReply(message.content)
        .then(reply => {
            message.channel.send(`>>> ${message.author}, **${content}**\n${client.user}, \`${reply}\``);
        }).catch(console.error); // hmm something not good.
});

client.login("token");
