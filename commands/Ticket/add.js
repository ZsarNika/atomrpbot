const Discord = require('discord.js');

module.exports = {
    name: "add",

    async run (client, message, args) {

		if(!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.channel.send('Nincs jogom ehez!')

		if(message.channel.name.includes('ticket-')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return message.channel.send(`Helyes használat -add @felhasználó!`);
			}
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				}).then(() => {
					message.channel.send(`Sikeresen hozzáadva ${member} ehez a hibajegyhez ${message.channel}`);
				});
			}
			catch(e) {
				return message.channel.send('Egy hiba lépett fel!');
			}
		}
	}
}