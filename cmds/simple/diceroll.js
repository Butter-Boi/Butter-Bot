const channel = require('./channel.json')
module.exports.run = async (message,args) => {
    if(message.channel.id == channel[message.guild.id].id){
    let wl = Math.floor(Math.random()*3)+1
    if(wl == 1){
        let roll = Math.floor(Math.random()*5)+1
        message.channel.send('You rolled a ' + roll + ' which gives you ' + roll + ' gold!')
    }else{
        message.channel.send('The dice rolled of the table, bummer dude.')
    }
    }else{
        message.delete()
    }
}

module.exports.help = {
    name: 'roll'
}