const PREFIX = '-'
const modrole = require('./modrole.json')
const muted = require('../admin/mute.json')
module.exports.run = async (message, args) => {
    if(message.member.roles.find('id',modrole[message.guild.id].modrole)){
    if(args.length >= 3){
    let user = message.mentions.users.first()
    if(user){
        let member = message.guild.member(user)
        if(member){
            let role = message.guild.roles.find('name',muted[message.guild.id].id)
            if(role){
                let reason = message.content.slice(4 + PREFIX.length + member.id.length + 5)
                message.channel.send(user.username + ' has been muted for "' + reason + '"')
                member.send('You were muted from the ' + message.guild.name + ' server for "' + reason + '"')
                member.addRole(role)
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
}

module.exports.help = {
    name: 'mute'
}