const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
  Client,
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get")
    .setDescription("Muestra el estado de los exploits")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("all")
        .setDescription("Muestra el estado actual de todos los exploits")
    ),
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const choice = interaction.options.getSubcommand();

    switch (choice) {
      case "all":
        fetch("https://api.whatexploitsare.online/status")
          .then(
            (response) => response.json()
          )
          .then((data) => {
            console.log(data);
            let data1 = new Object();
            const cateogires = [];
            let currentRobloxVersion;
            const allEmbed = new EmbedBuilder();
            for (let item of data) {
              for (let name in item) {
                if (name !== "ROBLOX") {
                  data = {
                    name: `${name}`,
                    value: `[\`Actualizado\`]: ${
                      item[name].updated ? "✅ Operando" : ":❌ Desactualizado"
                    } \n [\`Version\`]: **${
                      item[name].exploit_version
                    }** | [\`Ultima actualizacion\`]: ${
                      item[name].last_update
                    }`,
                  };
                  cateogires.push(data);
                } else {
                  currentRobloxVersion = item[name].version;
                }
              }
            }

            allEmbed.addFields(cateogires);
            allEmbed.setDescription(` [\`Roblox\`]: ${currentRobloxVersion}`);
            allEmbed.setColor("LightGrey");
            allEmbed.setAuthor({
              name: client.user.tag,
              iconURL: client.user.displayAvatarURL(),
            });

            interaction.reply({ embeds: [allEmbed] });
          })
          .catch((err) => {
            interaction.reply({
              content: "Hubo un error en la API, intentalo mas tarde.",
            });
            console.error(err.message, err);
          });

        break;

      default:
        interaction.reply({ content: "no option selected" });

        break;
    }
  },
};
