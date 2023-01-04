const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
require('dotenv').config();

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });
bot.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  bot.commands.set(command.data.name, command);
}

bot.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = bot.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, bot);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    });
  }
});

bot.login(process.env.TOKEN);