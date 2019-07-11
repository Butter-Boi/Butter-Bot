const admin = require('./admin.json')
const muted = require('./mute.json')
const fs = require('fs')

module.exports.run = async (message,args) => {
    if(admin[message.guild.id].admin == ''){
        let role = message.mentions.roles.first()
        if(role){
            let guildrole = message.guild.roles.find('name',role.name)
            if(guildrole){
                muted[message.guild.id] = {
                    muted: guildrole.id
                }
                fs.writeFileSync('./mute.json',JSON.stringify(muted),(err)=>{
                    if(err){throw err}
                })
                message.channel.send('You have set your muted role to the ' + role.name + ' role!')
            }else{
                message.channel.send('Your mentioned role does not exist!')
            }
        }else{
            message.channel.send('you need to mention a role!')
        }
    }else{
        if(message.member.roles.find('id',admin[message.guild.id].admin)){
            let role = message.mentions.roles.first()
            if(role){
                let guildrole = message.guild.roles.find('name',role.name)
                if(guildrole){
                    muted[message.guild.id] = {
                        muted: guildrole.id
                    }
                    fs.writeFileSync('./mute.json',JSON.stringify(muted),(err)=>{
                        if(err){throw err}
                    })
                    message.channel.send('You have set your muted role to the ' + role.name + ' role!')
                }else{
                    message.channel.send('Your mentioned role does not exist!')
                }
            }else{
                message.channel.send('you need to mention a role!')
            }
        }
    }
}

module.exports.help = {
    name: 'mutedrole'
}