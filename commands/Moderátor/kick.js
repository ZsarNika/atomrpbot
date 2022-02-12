const { MessageEmbed } = require("discord.js")
const moment = require('moment')

module.exports = {
name: "kick",
category: "moderation",
description: "kick a user",
cooldown: 5,
userPerms: ["KICK_MEMBERS"],
clientPerms: ["KICK_MEMBERS"],
run: async(client, message, args) => {  
const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
const reason = args.slice(1).join(" ")
          if (!args[0]) return message.channel.send(":x: | Adj meg egy nevet!")
        if (!mentionedMember) return message.channel.send(":x: | Nem találom a játékost!")
        if (mentionedMember.id === message.author.id) return message.channel.send(":x: | Te nem tudod kirugni magadat")
        if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
            return message.channel.send(":x: | A játékos rangjai nagyobbak az enyémnél")
        }
        if (mentionedMember.kickable) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(mentionedMember.user.displayAvatarURL({dynamic: true}))
            .setColor(`RANDOM`)
            .setDescription(`
**Játékos:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Indok:** ${reason || "Nincs indok"}
            `)
        message.channel.send(embed)
        mentionedMember.kick()
        } else {
            return message.channel.send(":x: | A játékos rangjai nagyobbak az enyémnél!")
        }
        return undefined
    }
}