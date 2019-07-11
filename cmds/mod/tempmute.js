const PREFIX = '-'
const modrole = require('./modrole.json')
module.exports.run = async (message, args) => {
    if(message.member.roles.find('id',modrole[message.guild.id].modrole)){
    if(args.length >= 4){
    let user = message.mentions.users.first()
    if(user){
        let member = message.guild.member(user)
        if(member){
            let role = message.guild.roles.find('name','commit no talk')
            if(role){
                let reason = message.content.slice(8 + PREFIX.length + member.id.length + 5 + args[2].length + 1)
                message.channel.send(user.username + ' has been tempmuted for "' + reason + '"')
                member.send('You were tempmuted from the ' + message.guild.name + ' server for "' + reason + '"')
                member.addRole(role)
                setTimeout(()=>{
                    member.removeRole(role)
                },args[2]*1000)
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
    name: 'tempmute'
}