const { MessageEmbed } = require("discord.js")


module.exports = {
    name: 'ip',
    category: 'Szerver',
    description: 'Egy IP parancs',
    run: async(client, message, args) => {

        let embed = new MessageEmbed()
        .addField('Szerver Ip', '\`f8 => connect atomrp.ddns.net\`')
        .setColor('BLUE')
        .setTimestamp()

        message.channel.send(embed)
    }
}
