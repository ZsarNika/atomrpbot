const Discord = require('discord.js');

module.exports = {
    name: "ticket",

    async run (client, message, args) {

		if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Nekem nincs elég jogosultságom! Manage_Channels!')

		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('Neked már van egy hibajegyed megnyitva!');
		}

		message.delete();

		message.guild.channels.create(`ticket-${message.author.tag}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
			const ticket = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Ticket-e`)
			.setDescription(`**${message.author}, Üdv a hibejegyedben! Itt kérhetsz az Admin-tól segítséget! Ha beakarod zárni akkor írd be, hogy \`!close\`**`)
			.setColor('ORANGE')
			message.reply(`**Hibajegy ${message.author.id} létrehozva, Nyomj ide <#${channel.id}>, hogy megnézhesd!**`).then(m => m.delete({ timeout: 14000 }).catch(e => {}));
			channel.send(`${message.author}`, ticket);
		});
    }
}