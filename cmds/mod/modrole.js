const fs = require('fs')
const modrole = require('./modrole.json')
const admin = require('../admin/admin.json')

module.exports.run = async (message,args) => {
    if(admin[message.guild.id].admin == ""){
        let role = message.mentions.roles.first()
        if(role){
            let mod = message.guild.roles.find('name',role.name)
            if(mod){
                 modrole[message.guild.id] = {
                     modrole: mod.id
                 }
                 fs.writeFileSync('./modrole.json',JSON.stringify(modrole),(err)=>{
                     if(err){throw err}
                 })
                 message.channel.send('Your mod role was set to the ' + role.name + ' role!')
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
                let mod = message.guild.roles.find('name',role.name)
                if(mod){
                     modrole[message.guild.id] = {
                         modrole: mod.id
                     }
                     fs.writeFileSync('./modrole.json',JSON.stringify(modrole),(err)=>{
                         if(err){throw err}
                     })
                     message.channel.send('Your mod role was set to the ' + role.name + ' role!')
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
    name: 'modrole'
}