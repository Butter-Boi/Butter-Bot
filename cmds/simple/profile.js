const gold = require('./gold.json')
const levels = require('./levels.json')
const channel = require('./channel.json')
const Discord = require('discord.js')
const XP = require('./xp.json')

module.exports.run = async (message, args) => {
    let user = message.mentions.users.first()
    if(message.channel.id == channel[message.guild.id].id){
    if(!user){
        var Profile = new Discord.RichEmbed()
            .setTitle(message.author.username)
            .setAuthor('Profile')
            .setThumbnail(message.author.avatarURL)
            .setColor(0x00FF00)
            .addField('Gold','Gold: ' + gold[message.author.id].amt)
            .addField('Blocks','Levels: ' + levels[message.author.id].amt)
            .addField('Experiance', 'XP: ' + XP[message.author.id].amt)
            .setFooter(message.author.id)
        message.channel.send(Profile).then(msg => {msg.delete(8000)})
    }else{
        var Profile = new Discord.RichEmbed()
            .setTitle(user.username)
            .setAuthor( user.username + "'s Profile")
            .setThumbnail(user.avatarURL)
            .setColor(0x00FF00)
            .addField('Gold','Gold: ' + gold[user.id].amt)
            .addField('Blocks','Blocks: ' + levels[user.id].amt)
            .addField('XP','XP: ' + XP[user.id].amt)
            .setFooter(message.author.id)
        message.channel.send(Profile).then(msg => {msg.delete(8000)})
        }
    }else{
        message.delete()
    }
}

module.exports.help = {
    name: 'Profile'
}