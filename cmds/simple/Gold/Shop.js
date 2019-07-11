const channel = require('../channel.json')
const Discord = require('discord.js')

module.exports.run = async (message,args) => {
    if(message.channel.id == channel[message.guild.id].id){
        let Shop = new Discord.RichEmbed()
            .setTitle('Shop')
            .setAuthor(message.member.user.username)
            .setColor(0x00FFFF)
            .setThumbnail('https://www.kisspng.com/png-gold-coin-cartoon-23897/')

        message.channel.send(Shop)
    }else{
        message.delete()
    }
}

module.exports.help = {
    name: 'Shop'
}