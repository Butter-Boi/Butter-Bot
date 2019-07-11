const fs = require('fs')
const lchannel = require('./lchannel.json')
const channel = require('../simple/channel.json')
const admin = require('./admin.json')
const PREFIX = '~'

module.exports.run = async (message,args) => {
    if(message.channel.id == channel[message.guild.id].id){
    if(admin[message.guild.id].admin == ''){
        if(args.length == 2){
            let mention = message.mentions.channels.first()
            if(mention){
                let channel = message.guild.channels.find('name',mention.name)
                if(channel){
                    lchannel[message.guild.id] = {
                        id: mention.id
                    }
                    fs.writeFileSync('./lchannel.json',JSON.stringify(lchannel),(err)=>{
                        if(err){throw err}
                    })
                    message.channel.send(`When someone leaves the server, a message will be sent in the ${mention.name} channel!`)
                }else{
                    message.channel.send('Your mentioned channel does not exist!')
                }
            }else{
                message.channel.send('you need to mention a channel!')
            }
        }
    }else{
        if(message.member.roles.find('id',admin[message.guild.id].admin)){
            if(args.length == 2){
                let mention = message.mentions.channels.first()
                if(mention){
                    let channel = message.guild.channels.find('name',mention.name)
                    if(channel){
                        lchannel[message.guild.id] = {
                            id: mention.id
                        }
                        fs.writeFileSync('./lchannel.json',JSON.stringify(lchannel),(err)=>{
                            if(err){throw err}
                        })
                        message.channel.send(`When someone leaves the server, a message will be sent in the ${mention.name} channel!`)
                    }else{
                        message.channel.send('Your mentioned channel does not exist!')
                    }
                }else{
                    message.channel.send('you need to mention a channel!')
                }
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
    name: 'leavemsg'
}