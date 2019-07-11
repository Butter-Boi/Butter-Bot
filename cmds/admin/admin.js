const admin = require('./admin.json')
const fs = require('fs')

module.exports.run = async (message,args) => {
    if(admin[message.guild.id].admin == ''){
        let role = message.mentions.roles.first()
        if(role){
            let adminrole = message.guild.roles.find('name',role.name)
            if(adminrole){
                 admin[message.guild.id] = {
                     admin: adminrole.id
                 }
                 fs.writeFileSync('./admin.json',JSON.stringify(admin),(err)=>{
                     if(err){throw err}
                 })
                 message.channel.send('Your administrator role was set to the ' + role.name + ' role!')
            }else{
                message.channel.send('Your mentioned role does not exist!')
            }
        }else{
            message.channel.send('You did not mention a role!')
        }
    }else{
        if(message.member.roles.find('id',admin[message.guild.id].admin)){
            let role = message.mentions.roles.first()
            if(role){
                let adminrole = message.guild.roles.find('name',role.name)
                if(adminrole){
                     admin[message.guild.id] = {
                         admin: role.id
                     }
                     fs.writeFileSync('./admin.json',JSON.stringify(admin),(err)=>{
                         if(err){throw err}
                     })
                     message.channel.send('Your administrator role was set to the ' + role.name + ' role!')
                }else{
                    message.channel.send('Your mentioned role does not exist!')
                }
            }else{
                message.channel.send('You did not mention a role!')
            }
        }else{
            message.delete()
        }
    }
}

module.exports.help = {
    name: 'administrator'
}