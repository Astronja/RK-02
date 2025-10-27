import { setInterval } from "timers/promises";
import { GatewayIntentBits, Client, ActivityType } from "discord.js";
import { Command } from "./Ptilopsis/command.js";
import { PRTS } from "./Ptilopsis/prts.js";

export class Prototype {
    constructor(config, dctoken) {
        this.discordToken = dctoken;
        this.name = config.name;
        this.prefix = config.prefix;
        this.model = config.model;
        this.posthouse = config.posthouse;
        this.debugchannel = config.debugchannel;
        this.config = config;
        this.color = 0xd3d2e8;
        this.discordClient = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessageTyping
            ]
        });
    }

    log (message) {
        console.log(`[${this.name}] ${message}`);
    }

    async login() {
        await this.discordClient.login(this.discordToken);
        this.discordClient.once('clientReady', async (c) => {
            this.log(`Logged in as ${c.user.tag}`);
            const guild = this.discordClient.guilds.cache.get(this.config.guild);
            await guild.commands.set(Command.registerCommand());
            if (c.user.username.includes("Ada")) {
                this.discordClient.user.setPresence({
                    activities: [{ 
                        name: `🤓 · Testing as ${this.name}`, 
                        type: ActivityType.Custom
                    }]
                });
            } else for await (const _ of setInterval(60000)) await this.updateStatus();
        });
        this.discordClient.on('messageCreate', async (message) => {
            if (message.mentions.has(this.discordClient.user) && message.content.includes('about')) {
                await message.reply(await this.about());
            }
            if (message.content.startsWith(this.prefix)) {
                const command = message.content.replace(this.prefix, '').trim();
                const request = new Command();
                if (message.attachments.map(file => file).length > 0) {
                    const response = await request.attachmentCommand(command, message.attachments.map(file => file.url)[0]);
                    await message.reply(response);
                    return;
                }
                const response = await request.executeCommand(command);
                await message.reply(response);
            }
            if (message.author.bot && message.author.id != this.discordClient.user.id && message.content.startsWith(this.model)) {
                if (message.channel.id == this.posthouse) { //posthouse
                    const prts = new PRTS(this.discordClient, this.posthouse);
                    await prts.receive(message.content, message.attachments.map(a => a.url)[0]);
                    if (prts.result != undefined) {
                        await message.reply(prts.result);
                    }
                } else await message.reply("Please send PRTS messages to <#1408285577958391922>.");
            }
        });
        this.discordClient.on('interactionCreate', async (interaction) => {
            if (interaction.isCommand()) {
                await interaction.deferReply();
                const request = new Command();
                request.slashCommandHandler(interaction);
            }
        });
    }

    async updateStatus () {
        const latestVersion = Object.keys(this.config.versions)[Object.keys(this.config.versions).length - 1];
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const statusString = `🦉 · v${latestVersion}: ${days}d ${hours}h ${minutes}m`;
        this.discordClient.user.setPresence({
            activities: [{ 
                name: statusString,
                type: ActivityType.Custom 
            }]
        });
    }

    async about() { //returns a discord embed
        const versionList = this.config.versions;
        const latestVersion = Object.keys(versionList)[Object.keys(versionList).length - 1];
        const attributions = [
            'Art components - Arknights《明日方舟》',
            'Arknights Terra Wiki - https://arknights.wiki.gg/',
            'Closure Wiki - https://closure.wiki/',
            'Monster Siren Records - https://monster-siren.hypergryph.com/',
            'discord.js v14'
        ]
        return {
            embeds: [
                {
                    color: this.color,
                    title: this.name,
                    author: {
                        name: 'Estelle Z.',
                        icon_url: (await this.discordClient.users.fetch('1209318360714715210')).displayAvatarURL({ format: 'png', dynamic: true })
                    },
                    description: 'Provide services regarding Arknights Terra Wiki.',
                    thumbnail: {
                        url: 'https://arknights.wiki.gg/images/7/7e/Ptilopsis_icon.png?4688da',
                    },
                    fields: [
                        {
                            name: 'Prefix',
                            value: this.prefix,
                            inline: true
                        },
                        {
                            name: 'Version',
                            value: latestVersion,
                            inline: true
                        },
                        {
                            name: 'Liscence',
                            value: 'CC BY-NC 4.0',
                            inline: true
                        },
                        {
                            name: 'Version info',
                            value: versionList[latestVersion]
                        },
                        {
                            name: 'Attributions',
                            value: attributions.join('\n')
                        }
                    ]
                }
            ]
        }
    }
}