    //constante
const Discord = require('discord.js');
const prefix = "/c.";
const ms = require('ms');
const fs = require('fs');
const ytdl = require('ytdl-core');

    //variables
var bot = new Discord.Client();

    //ready
    bot.on("ready", function() {
        bot.user.setActivity('{/c.}')
        bot.user.setStatus("online")
        console.log("Allumer !")
        
    });

    //Cmd:
bot.on('message', message => {

    let cmd = message.content.split(" ")[0];
    cmd = cmd.slice(prefix.length);

    if(message.content === "/c."){
        message.reply("Se que tu viens de mettre et mon prefix je t'invite a faire */c.aide* pour plus d'aides! 😇");
    }

    if(cmd === "aide"){
        var h_embed = new Discord.RichEmbed()
            .setAuthor("Chipos - Aide", bot.user.avatarURL)
            .setDescription("Voici Mon panneaux d'aide a votre entiere disposition")
            .addField("💬 /c.aide", "Je vous affiche le panneaux d'aide")
            .addField("📢 /c.sondage", "Cette command vous permet de crees un sondage")
            .addField("🚽 /c.efface", "Efface le nombre de message demander")
            .addField("🥁 /c.rep", "Cette command fait en sorte que je répète se que vous dite")
            .addField("Pour plus d'aide je t'invite a faire:", "``/c.h>[command]``")
            .setFooter("🛑 Certaine command sont en englais exemple statsuser mais leur contenu sont en francais.")
            .setTimestamp()
        message.channel.sendMessage(h_embed);
    }

    if(cmd === "h>aide"){
        var help_embed = new Discord.RichEmbed()
            .setDescription("Cette command n'existe pas.")
          message.channel.sendMessage(help_embed);  
    }

    if(cmd === "h>rep"){
        var hrep_embed = new Discord.RichEmbed()
            .setAuthor("Chipos - Aide-Command: /c.rep", bot.user.avatarURL)
            .setDescription("❗ Voici les Prerequis pour utiliser ``/c.rep``")
            .addField("specifier un  message", "Sans  message le bot ne pourras répète se que vous avez envoyer")
            .setTimestamp() 
            message.channel.sendMessage(hrep_embed);      
    }

    if(cmd === "h>efface"){
        var hefface_embed = new Discord.RichEmbed()
            .setAuthor("Chipos - Aide-Command: /c.efface", bot.user.avatarURL)
            .setDescription("❗ Voici les Prerequis pour utiliser ``/c.efface``")
            .addField("specifier un nombre de message", "Sans le nombre exact de message a effacer le bot ne pourras vous aider")
            .setTimestamp()
           message.channel.sendMessage(hefface_embed); 
    }

    if(cmd === "h>sondage"){
        var hsond_embed = new Discord.RichEmbed()
            .setAuthor("Chipos - Aide-Command: /c.sondage", bot.user.avatarURL)
            .setDescription("❗ Voici les Prerequis pour utiliser ``/c.sondage``")
            .addField("Creations de channel", "en effet cette command nécessite un salon specifique il s'agit de ``sondage`` sans se salon la command ne marcheras pas")
            .setTimestamp()
        message.channel.sendMessage(hsond_embed);    
    }

    if(cmd === "sondage") {
        let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            message.delete()
                var sond_embed = new Discord.RichEmbed()
                    .setAuthor("Chipos - Sondage", bot.user.avatarURL)
                    .addField(thingToEcho, "Repondre avec ✅ ou ❌")
                    .setFooter(`✍ Sondage Effectuer par ${message.author.tag}`)
                    .setTimestamp()
            message.guild.channels.find("name", "sondage").sendEmbed(sond_embed)
                    .then(function (message) {
                        message.react("✅")
                        message.react("❌")
                    }).catch(function() {
                    });
                }else{                       
    };

    if (cmd === "rep") {
        let args = message.content.split(" ").slice(1);
            message.delete()
                var rep_embed = new Discord.RichEmbed()
                    .setDescription(args.join(" "))
                    .setFooter(`Command effectuer par ${message.author.tag}`)
                message.channel.send(rep_embed)
    }else{
                
}});

    //Cmd-admin:
bot.on('message', message => {

    let cmd = message.content.split(" ")[0];
    cmd = cmd.slice(prefix.length);

    if(cmd === "efface") {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${author} je suis desoler mais tu n'en a pas les permission`);
            let args = message.content.split(" ").slice(1);
                if(!args[0]) return message.channel.send("🕵 tu doit specifier le nombre de message a supprimer")
                    message.channel.bulkDelete(args[0]).then(() => {
                        message.reply(`🚽 ${args[0]} message ont été suprimer`);
                    });

                    if(cmd === "utilisateur") {
                        var userCreateDate = message.author.createdAt.toString().split(" ");
                        var msgauthor = message.author.id;
                        
                         var stats_embed = new Discord.RichEmbed()
                            .setTitle("Chipos - Statistique", bot.user.avatarURL)
                            .addField("Date de creation de votre compte", userCreateDate[1] + ' ' + userCreateDate[2] + " " + userCreateDate[3])
                            .addField("Vos identifiant", msgauthor, true)
                            .setThumbnail(message.author.avatarURL)
                            .setTimestamp()
                          message.reply("Tu peut verifier t'es message priver, tu vien de recevoir des Information personnel !");
                          message.author.sendEmbed(stats_embed);
 
                    };
}});

bot.login(process.env.TOKEN);
