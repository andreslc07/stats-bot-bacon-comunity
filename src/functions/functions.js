const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");

const { slashCommandHandler } = require("./handlers/handler");
const { TOKEN, CLIENT_ID } = require("../config");

async function loadSlash(client) {
  let commandsArray = [];

  const files = await slashCommandHandler();
  files.forEach((file) => {
    const slashCommand = require(file);

    client.commands.set(slashCommand.data.name, slashCommand);

    commandsArray.push(slashCommand.data.toJSON());
  });

  const rest = new REST({ version: "10" }).setToken(TOKEN);
  try {
    console.log(
      `[STARTUP]: Started refreshing ${commandsArray.length} application (/) commands.`
    );

    const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commandsArray,
    });

    console.log(
      `[STARTUP]: Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}
module.exports = {  loadSlash };
