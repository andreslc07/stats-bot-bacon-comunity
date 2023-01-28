const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionsBitField,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Repitire lo que tu digas!")
    .addStringOption((option) =>
      option
        .setName("mensaje")
        .setDescription("Mensaje que quieres enviar")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const string = interaction.options.getString("mensaje");
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      )
    ) {
      return interaction.reply({
        content:
          "No tienes los suficientes permisos para hacer esto. `MANAGE_MESSAGES`",
      });
    }

    return interaction.reply({ content: `${string}` });
  },
};
