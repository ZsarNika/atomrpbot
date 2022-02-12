const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'poll',
    category: 'Moderátor',
    description: 'Egy szavazás parancs',
    run: async(client, message, args) => {
        let lockPermErr = new MessageEmbed()
        .setTitle("**Játékos jogosultság error!**")
        .setDescription("**Neked nincs jogosultságod a parancshoz! ❌**")
        
        if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR") ) return message.channel.send(lockPermErr);
        const query = args.join(" ");
        if(!query) return message.reply('Adj meg egy szavazást');

        let pollembed = new MessageEmbed()
        .setTitle('Szavazás')
        .setColor('ORANGE')
        .addField('Szavazás tárgya', query)
        .setTimestamp()
        .setFooter(
            `Szavazást indította: ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )

          message.channel.send(pollembed).then(async msg => {
            msg.react("✅")
            msg.react("❎")
        })
    }
}