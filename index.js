const Discord = require("discord.js");
const config = require('./config.json');
const bot = new Discord.Client({
    disableEveryone: true,
    partials : ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"]
});
const fivereborn = require('fivereborn-query');
const sconfig = require('./sconfig.json');
































const fs = require("fs");















//////////////////////////////////////////////////////////


bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
});


bot.on("message", async message => {
    let prefix = config.prefix




    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    if(command)
    command.run(bot, message, args);

   
});

//////////////////////////////////////////////////////////////////////////////////////








let clientname = "AZESZ bot"
2


bot.once('ready', () => { // A function that is run once when the bot is onlince
    console.log('Bot is online') // Sends to the console that the bot is online
})

function activity(){ // Defines the function
    setTimeout(() => { // Starts a loop
        fivereborn.query(sconfig.SERVER_IP,sconfig.SERVER_PORT, (err, data) => { // Starts a function that allowes us to retrive data from our fivem server
            if (err) { // Checks for errors
                return console.log(err); // If a error is true then this will log that error and then stop it from going by
            } else { // If a error is not true then 
                bot.user.setActivity(`${data.clients} játékos ${sconfig.SERVER_NAME}-n`, { type: "PLAYING" }); // Serts the Status
            }
        });
        activity(); // Runs the function we defined at line 15
    }, 1000); // Waits 1 second
}
activity(); // Runs the function again





bot.login(config.token);