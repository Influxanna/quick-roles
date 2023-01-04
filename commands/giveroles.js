const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('giveroles')
	.setDescription('Give a role to all users')
	.addStringOption(option => option.setName('role').setDescription('role name').setRequired(true)),
	async execute(interaction) {
		try {
			let inputRole = interaction.options.getString('role')
			await interaction.guild.members.fetch()
			const role = interaction.guild.roles.cache.find(role => role.name === inputRole)
			if(!role) {
				await interaction.reply('Specify an actual role.');
				return;
			}
			interaction.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(role))
			await interaction.reply(`${role} has been given to ${interaction.guild.members.cache.filter(m => !m.user.bot).size} users.`)
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};