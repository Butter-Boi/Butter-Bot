const modrole = require('./modrole.json')
const muted = require('../admin/mute.json')
module.exports.run = async (message, args) => {
    let user = message.mentions.users.first()
    if(message.member.roles.find('id',modrole[message.guild.id].modrole)){
    if(user){
        let member = message.guild.member(user)
        if(member){
            let role = message.guild.roles.find('name',muted[message.guild.id].id)
            if(role){
                message.channel.send(user.username + ' has been unmuted!')
                member.removeRole(role)
            }else{
                message.channel.send('Muted role does not exist!')
            }
        }else{
            message.channel.send('Your mention user does not exist.')
        }
    }else{
        message.channel.send('You need to mention a user.')
    }
    }
}

module.exports.help = {
    name: 'unmute'
}