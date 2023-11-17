import { REST, Routes,Client, GatewayIntentBits, Partials, ActivityType } from 'discord.js';
import fs from 'node:fs'
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const Master_Global = new Object({
  Commands: []
})

const AIO_Command = fs.readdirSync('./Src');

const commands = [];

for (let i of AIO_Command) {
  let Data_CMD = await import("file://" + path.join(__dirname, `Src/${i}`));
  if (Data_CMD.config.Name) {
    Data_CMD.config.Name = Data_CMD.config.Name.toLowerCase();
    Master_Global.Commands.push(Data_CMD)
    commands.push({
      name: Data_CMD.config.Name,
      description: Data_CMD.config.Description
    })
  }
}


void async function() {
const rest = new REST({ version: '10' }).setToken('your discord bot acc token');

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands('your bot id'), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

const client = new Client({ partials: [Partials.Channel,Partials.GuildMember,Partials.Message,Partials.User,],intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers],  shards: "auto",
failIfNotExists: false,
allowedMentions: {
  parse: ["everyone", "roles", "users"],
  users: [],
  roles: [],
  repliedUser: false,
}, });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity({
    name: `Lê Quý Đôn - QT Confession`,
    type: ActivityType.Watching,
  });
});


client.on('messageCreate', async(msg) => {
  const today = new Date().toLocaleString("vi-vn", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  console.group(`${chalk.bold.yellow("Tên : ")}${chalk.magenta(msg.author.username)}${chalk.bold.red(" | ")}${chalk.hex('#FF9900')(today)}${chalk.bold.red(" | ")}${chalk.bold.green("Nhóm : ")}${chalk.cyan(msg.guild.name)}`);
  console.log(`${chalk.hex('#33FF33').bold("Main")}${chalk.bold.red(" | ")}${chalk.hex('#FF00FF').bold(" Message ")}${chalk.hex('00FFFF')(": ")}${chalk.white(msg.content)}`);
  console.groupEnd();
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // if (interaction.commandName === 'ping') {
  //   await interaction.reply('Pong!');
  // }
  
  if (interaction.commandName === "link") {
    await interaction.reply('Trang của Discord LQĐ: https://www.facebook.com/lequydonqt.confessions')
  }
  

  const Command_Run = Master_Global.Commands.find(i => i.config.Name == interaction.commandName);
  let Interaction = interaction
  Command_Run.default({ Client: client ,Interaction });
});


client.login('your disscordbot token');

}()

//lấy post page https://graph.facebook.com/v13.0/104607641413497/posts?fields=attachments,message,created_time&limit=10&access_token=EAAGNO4a7r2wBALGw4PZB94tMyzFz5MXRc5ZBZAIOvxSc52H8rX2xqvjn8hFZA3YoVHyZBLZCNx3aot3ztqZAM5jxRiAGnpcWwbnZBoZCEbbi4Lt0W7xDmGDtvpVWbth8JSjY3Dy4dgKzjKAZCXhK3Ovg9Y6x5RTJXTkmGbPxKXt7hj7AbPZAh2ltqxZBs4YZAmgxDcg8ZD
