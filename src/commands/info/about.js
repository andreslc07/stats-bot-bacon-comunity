const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const info = require("../../../package.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Informacion sobre el bot."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setColor("LightGrey")
      .addFields([
        {
          name: "Stats info",
          value: `Proyecto de [Codigo abierto](https://github.com/andreslc07/stats-bot-bacon-comunity) \n Version: **${info.version}**`,
          inline: true,
        },
        {
          name: "Discord.js version",
          value: `**${info.dependencies["discord.js"]}**`,
          inline: true,
        },
        {
          name: "Tiempo de actividad",
          value: `Dias: **${days}** Horas: **${hours}**\n Minutos: **${minutes}** Segundos: **${seconds}**`,
          inline: true,
        },
        {
          name: "Desarrolladores",
          value:
            "**andreslc#0753** - Desarrollador principal & Dueño | [Github](https://github.com/andreslc07)",
          inline: true,
        },
        {
          name: "Soporte",
          value: `Contacta con **andreslc#0753** si necesitas ayuda.`,
        },
      ]);

    interaction.reply({ embeds: [embed] });
  },
};
