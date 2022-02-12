const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@játékos> <indok>",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`Nincs elég jogosultságod a parancshoz!`)
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`Nincs elég jogosultságom!`)
    
    if(!args[0]) return message.reply(`Említs meg valakit!`)
    
    if(!target) return message.reply(`Nem találom ezt az embert!`)
    
    if(target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
      return message.reply(`Nagyobb rangban van nálad!`)
    }
    
    if(target.id === message.author.id) return message.reply(`Nem tudlak kitiltani!`)
    
    if(target.bannable) {
      let embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Kitiltott ${target}\n\` indok: \`${reason || "Nincs indok megadva"}\``)
      
      message.channel.send(embed)
      
      target.ban()
      
      message.delete()
      
    } else {
      return message.reply(`Az én rangom kisebb mint az övé!`)
    }
    return undefined
  }
};