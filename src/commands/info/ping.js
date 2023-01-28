const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    return interaction.reply({ content: `${client.ws.ping}ms :ping_pong:` });
  },
};
