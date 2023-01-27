const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    interaction.reply({ content: "Pong!" });
  },
};
