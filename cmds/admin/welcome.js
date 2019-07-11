const fs = require('fs')
const welcome = require('./welcome.json')
const channel = require('../simple/channel.json')
const admin = require('./admin.json')

module.exports.run = async (message,args) => {
    if(message.channel.id == channel[message.guild.id].id){
    if(admin[message.guild.id].admin == ''){
    let role = message.mentions.roles.first()
    if(role){
        let welcomerole = message.guild.roles.find(role)
        if(welcomerole){
            welcome[message.guild.id] = {
                id: role.id
            }
            fs.writeFileSync('./welcome.json',JSON.stringify(welcome),(err)=>{
                if(err){throw err}
            })
            message.channel.send('Every time someone joins your server they get the ' + role.name + ' role!  ')
        }else{
            message.channel.send('Your mentioned role does not exist!')
        }
    }else{
        message.channel.send('You need to mention a role!')
    }
    }else{
        if(message.member.roles.find('id',admin[message.guild.id].admin)){
            let role = message.mentions.roles.first()
            if(role){
                let welcomerole = message.guild.roles.find(role)
                if(welcomerole){
                    welcome[message.guild.id] = {
                        id: role.id
                    }
                    fs.writeFileSync('./welcome.json',JSON.stringify(welcome),(err)=>{
                        if(err){throw err}
                    })
                    message.channel.send('Every time someone joins your server they get the ' + role.name + ' role!  ')
                }else{
                    message.channel.send('Your mentioned role does not exist!')
                }
            }else{
                message.channel.send('You need to mention a role!')
            }
        }else{
            message.delete()
        }
    }
    }else{
        message.delete()
    }
}

module.exports.help = {
    name: 'welcomerole'
}