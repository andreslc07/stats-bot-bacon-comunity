const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get")
    .setDescription("Informacion de exploits (PC)")
    .addStringOption((option) =>
      option
        .setName("exploit")
        .setDescription(
          "Obten informacion de todos los exploits o uno en especifico"
        )
        .addChoices(
          {
            name: "All",
            value: "all",
          },
          {
            name: "Synapse",
            value: "Synapse",
          },
          {
            name: "Script-ware",
            value: "Script-Ware",
          },
          {
            name: "KRNL",
            value: "KRNL",
          },
          {
            name: "Electron",
            value: "Electron",
          },
          {
            name: "WeAreDevs API",
            value: "WeAreDevs",
          },
          {
            name: "Oxygen",
            value: "Oxygen",
          },
          {
            name: "Fluxus",
            value: "Fluxus",
          },
          { name: "DX9WARE", value: "DX9WARE" },
          {
            name: "Comet",
            value: "Comet",
          },
          {
            name: "Celestial",
            value: "Celestial",
          },
          {
            name: "Elexe",
            value: "elexe",
          }
        )
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const choice = interaction.options.getString("exploit");

    if (choice == "all") {
      fetch("https://api.whatexploitsare.online/status")
        .then((response) => response.json())
        .then((data) => {
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
                  }** | [\`Ultima actualizacion\`]: **<t:${
                    item[name].last_update_unix
                  }>**`,
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
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          });

          interaction.reply({ embeds: [allEmbed] });
        })
        .catch((err) => {
          interaction.reply({
            content: "Hubo un error en la API, intentalo mas tarde.",
          });
          return console.error(err.message, err);
        });
    } else {
      fetch(`https://api.whatexploitsare.online/status/${choice}`)
        .then((response) => response.json())
        .then((data) => {
          const emed = new EmbedBuilder();
          const fieldData = [];
          let name_exploit;
          let currentRobloxVersion1;
          let data4;
          let item = data[0];
          for (let name in item) {
            data4 = {
              name: `${name}`,
              value: `[\`Actualizado\`]: ${
                item[name].updated ? "✅ Operando" : ":❌ Desactualizado"
              } \n [\`Version\`]: **${
                item[name].exploit_version
              }** | [\`Ultima actualizacion\`]: **<t:${
                item[name].last_update_unix
              }>**`,
            };
            name_exploit = name;
            currentRobloxVersion1 = `${item[name].roblox_version}`;
            fieldData.push(data4);
          }
          emed.setDescription(` [\`Roblox\`]: ${currentRobloxVersion1}`);
          emed.addFields(fieldData);
          emed.setColor("LightGrey");
          emed.setAuthor({
            name: `${name_exploit}`,
            iconURL: client.user.displayAvatarURL(),
          });
          return interaction.reply({ embeds: [emed] });
        });
    }
  },
};
