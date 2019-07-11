const PREFIX = '-'
const modrole = require('./modrole.json')
module.exports.run = async (message,args) => {
    if(message.member.roles.find('id',modrole[message.guild.id].modrole)){
    if(args.length >= 3){
        let user = message.mentions.users.first()
        if(user){
            let member = message.guild.member(user)
            if(member){
                let reason = message.content.slice(3 + PREFIX.length + member.id.length + 5)
                message.channel.send(user.username + ' has been banned for "' + reason + '"')
                member.send('You have been banned from the ' + message.guild.name + ' server for "' + reason + '"')
                member.ban()
            }else{
                message.channel.send('Your mentioned user does not exist')
            }
        }else{
            message.channel.send('You did not mention a user.')
        }
    }
    }
}

module.exports.help = {
    name: 'ban'
}