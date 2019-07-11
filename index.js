const Discord = require('discord.js')
const bot = new Discord.Client()
const PREFIX = '~'
const fs = require('fs')
const commands = new Discord.Collection()
const modrole = require('./cmds/mod/modrole.json')
const gold = require('./cmds/simple/gold.json')
const levels = require('./cmds/simple/levels.json')
const channel = require('./cmds/simple/channel.json')
const XP = require('./cmds/simple/xp.json')
const welcome = require('./cmds/admin/welcome.json')
const admin = require('./cmds/admin/admin.json')
const wchannel = require('./cmds/admin/wchannel.json')
const lchannel = require('./cmds/admin/lchannel.json')
const muted = require('./cmds/admin/mute.json')
fs.readdir('./cmds/mod', (err, files)=>{
    if(err){throw err}
    let jsfiles = files.filter(f => f.split('.').pop() === 'js')
    if(jsfiles.length <= 0){
        console.log('no commands loaded')
        return
    }
    console.log('Loading ' + jsfiles.length + ' commands..')
    
    jsfiles.forEach((f,i)=>{
        let props = require(`./cmds/mod/${f}`)
        console.log(i + 1 + ': ' + f + ' is loaded!')
        commands.set(props.help.name,props)
    })
})
fs.readdir('./cmds/simple', (err, files)=>{
    if(err){throw err}
    let jsfiles = files.filter(f => f.split('.').pop() === 'js')
    if(jsfiles.length <= 0){
        console.log('no commands loaded')
        return
    }
    console.log('Loading ' + jsfiles.length + ' commands..')
    
    jsfiles.forEach((f,i)=>{
        let props = require(`./cmds/simple/${f}`)
        console.log(i + 1 + ': ' + f + ' is loaded!')
        commands.set(props.help.name,props)
    })
})
fs.readdir('./cmds/simple/Gold', (err, files)=>{
    if(err){throw err}
    let jsfiles = files.filter(f => f.split('.').pop() === 'js')
    if(jsfiles.length <= 0){
        console.log('no commands loaded')
        return
    }
    console.log('Loading ' + jsfiles.length + ' commands..')
    
    jsfiles.forEach((f,i)=>{
        let props = require(`./cmds/simple/Gold/${f}`)
        console.log(i + 1 + ': ' + f + ' is loaded!')
        commands.set(props.help.name,props)
    })
})
fs.readdir('./cmds/admin', (err, files)=>{
    if(err){throw err}
    let jsfiles = files.filter(f => f.split('.').pop() === 'js')
    if(jsfiles.length <= 0){
        console.log('no commands loaded')
        return
    }
    console.log('Loading ' + jsfiles.length + ' commands..')
    
    jsfiles.forEach((f,i)=>{
        let props = require(`./cmds/admin/${f}`)
        console.log(i + 1 + ': ' + f + ' is loaded!')
        commands.set(props.help.name,props)
    })
})
bot.on('ready', () => {
    console.log('Ready')
    bot.user.setActivity('how to use admin commands!', {type: 'WATCHING'})
    bot.guilds.forEach((guild) => {
        console.log('Servers: ' + guild.name)
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.id}`)
        })
    })
    
})

bot.on('message', (message)=>{
    if(message.author.bot){return}
    if(!modrole[message.guild.id]){
        modrole[message.guild.id] = {
            modrole: ''
        }
        fs.writeFile('./cmds/mod/modrole.json',JSON.stringify(modrole),(err)=>{
            if(err){throw err}
        })
    }
    if(!gold[message.author.id]){
        gold[message.author.id] = {
            amt: 0
        }
        fs.writeFile('./cmds/simple/gold.json',JSON.stringify(gold),(err)=>{
            if(err){throw err}
        })
    }
    if(!levels[message.author.id]){
        levels[message.author.id] = {
            amt: 0
        }
        fs.writeFile('./cmds/simple/levels.json',JSON.stringify(levels),(err)=>{
            if(err){throw err}
        })
    }
    if(!XP[message.author.id]){
        XP[message.author.id] = {
            amt: 0
        }
        fs.writeFile('./cmds/simple/xp.json',JSON.stringify(XP),(err)=>{
            if(err){throw err}
        })
    }
    if(!channel[message.guild.id]){
        channel[message.guild.id] = {
            id: ''
        }
        fs.writeFile('./cmds/simple/channel.json',JSON.stringify(channel),(err)=>{
            if(err){throw err}
        })
    }
    if(!welcome[message.guild.id]){
        welcome[message.guild.id] = {
            id: ''
        }
        fs.writeFile('./cmds/admin/welcome.json',JSON.stringify(welcome),(err)=>{
            if(err){throw err}
        })
    }
    if(!admin[message.guild.id]){
        admin[message.guild.id] = {
            admin: ''
        }
        fs.writeFile('./cmds/admin/admin.json',JSON.stringify(admin),(err)=>{
            if(err){throw err}
        })
    }
    if(!wchannel[message.guild.id]){
        wchannel[message.guild.id] = {
            id: ''
        }
        fs.writeFile('./cmds/admin/wchannel.json',JSON.stringify(wchannel),(err)=>{
            if(err){throw err}
        })
    }
    if(!lchannel[message.guild.id]){
        lchannel[message.guild.id] = {
            id: ''
        }
        fs.writeFile('./cmds/admin/lchannel.json',JSON.stringify(lchannel),(err)=>{
            if(err){throw err}
        })
    }
    if(!muted[message.guild.id]){
        muted[message.guild.id] = {
            id: ''
        }
        fs.writeFile('./cmds/admin/mute.json',JSON.stringify(muted),(err)=>{
            if(err){throw err}
        })
    }
    let args = message.content.substring(PREFIX.length).split(' ')
    let messageArray = message.content.split(/\s+/g)
    let command = messageArray[0]
    let cmd = commands.get(command.slice(PREFIX.length))
    if(cmd){
        cmd.run(message,args,modrole)
        return
    }
    let chance = Math.floor(Math.random()*35)+1
    if(chance == 1){
        let XPAmt = Math.floor(Math.random()*5)+1
        XP[message.author.id] = {
            amt: XP[message.author.id].amt + XPAmt
        }
        fs.writeFile('./cmds/simple/xp.json',JSON.stringify(XP),(err)=>{
            if(err){throw err}
        })
    }
    let reactionchance = Math.floor(Math.random()*1)+1
    if(reactionchance == 1){
        let reaction = Math.floor(Math.random()*28)+1
        if(reaction == 1){
            message.react('🤔')
        }else if(reaction == 2){
            message.react('😃')
        }else if(reaction == 3){
            message.react('👌')
        }else if(reaction == 4){
            message.react('🅱')
                .then(()=>{
                    message.react('🇺')
                        .then(()=>{
                            message.react('🇹')
                                .then(()=>{
                                    message.react('🇹')
                                        .then(()=>{
                                            message.react('🇪')
                                                .then(()=>{
                                                    message.react('🇷')
                                                })
                                        })
                                })
                        })
                })
        }else if(reaction == 5){
            message.react('🍏')
        }
    }
})

bot.on('guildMemberAdd', (member) => {
    if(!welcome[member.guild.id].id == ''){
        member.addRole(member.guild.roles.find('id',welcome[message.guild.id].id))
    }
    if(!wchannel[member.guild.id].id == ''){
        let channel = member.guild.channels.find('id',wchannel[message.guild.id].id)
        channel.send(`Hello ${member.user.username}! Welcome to "${member.guild.name}"! Hope you have fun!`)
    }
})

bot.on('guildMemberRemove', (member) => {
    if(!lchannel[message.guild.id].id == ''){
        let channel = member.guild.channels.find('id',lchannel[message.guild.id].id)
        channel.send(`${member.user.username} has left the server! :(`)
    }
})
bot.login('NTk2MTg5Njg3MTgyMjYyMjcy.XR174g.2-VaStfp1z1aJKMmSj6QINY3pSY')