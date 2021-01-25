const Discord = require("discord.js"),
client = new Discord.Client();
const alexa = require("alexa-bot-api")
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const prefix = "!";

client.on("ready", () => {
client.user.setActivity(`${prefix}help | www.evabot.ga` , {
   type: "PLAYING",
})});

client.on('message', message => {
  if(message.content.startsWith(prefix + "set")) { 
  if(message.author.bot)return;
if (message.channel.type === "dm") return;
			if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(` > ** ${message.author.username}  You do not have MANAGE_CHANNELS **`);
        let chatroom = message.mentions.channels.first();
        if (!chatroom) return message.channel.send(`${message.author.username} I can't find this channel !`);
                db.set(`channel_${message.guild.id}`, chatroom.id);
        message.channel.send(`> ** Success! The \`AI-CHAT\` channel has been set to ${chatroom} **`)  
}});

const chatbot = new alexa();
client.on('message', async message => {
  const chat = db.get(`channel_${message.guild.id}`)
     if(chat != null){
  if(message.channel.id == chat){
if(message.author.bot)return;
let content = message.content;
if(!content)return;
chatbot.getReply(content).then(r => message.channel.send(`>>> <@${message.author.id}>, ** ${content} **\n<@${client.user.id}> , \`${r}\``))
}}});


client.on('message', message => {
if(message.content.startsWith(prefix + "help")) {
  let embed = new Discord.MessageEmbed()
.setDescription(`[EvaBot |  إيفُآ بوت](https://evabot.ga/)`)
.addField("**support serve :**","**[support](https://discord.gg/JwKatybjhJ)**", true)
.addField("**invite bot :**","**[invite](https://discord.com/oauth2/authorize?client_id=765625130675732551&permissions=8&scope=bot)**", true)
.addField("**commands :**","**[commands](http://evabot.ga/commands)**",true)
.setImage("https://cdn.discordapp.com/attachments/776454054540083251/801074941855531028/pngaaa_1_3.png")
message.channel.send("** Bot site ** http://evabot.ga/")
message.channel.send(embed)
}})
client.login("token")
