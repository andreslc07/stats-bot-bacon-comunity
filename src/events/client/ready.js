const { Client, Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
   *
   * @param {Client} client
   */
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    client.user.setActivity({
      name: "actividad de los exploits 👀",
      type: ActivityType.Watching,
    });
  },
};
