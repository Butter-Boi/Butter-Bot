const fs = require('fs')
const channel = require('./channel.json')
const modrole = require('../mod/modrole.json')

module.exports.run = async (message,args) => {
    if(modrole[message.guild.id].modrole == ""){
        let chann = message.mentions.channels.first()
        if(chann){
            let cmdchannel = message.guild.channels.find('name',chann.name)
            if(cmdchannel){
                channel[message.guild.id] = {
                    id: cmdchannel.id
                }
                fs.writeFile('./cmds/simple/channel.json',JSON.stringify(channel),(err)=>{
                    if(err){throw err}
                })
                message.channel.send('Your command channel was set to the ' + chann + ' channel!')
            }else{
                message.channel.send('Your mentioned channel does not exist!')
            }
        }else{
            message.channel.send('You need to mention a channel!')
        }
    }else{
        if(message.member.roles.find('id',modrole[message.guild.id].modrole)){
            let chann = message.mentions.channels.first()
            if(chann){
                let cmdchannel = message.guild.channels.find('name',chann.name)
                if(cmdchannel){
                    channel[message.guild.id] = {
                        id: cmdchannel.id
                    }
                    fs.writeFile('./cmds/simple/channel.json',JSON.stringify(channel),(err)=>{
                        if(err){throw err}
                    })
                    message.channel.send('Your command channel was set to the ' + chann + ' channel!')
                }else{
                    message.channel.send('Your mentioned channel does not exist!')
                }
            }else{
                message.channel.send('You need to mention a channel!')
            }
        }else{
            message.delete()
        }
    }
}

module.exports.help = {
    name: 'cmdchannel'
}