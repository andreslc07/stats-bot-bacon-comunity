require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});
const { TOKEN } = require("./config");
const eventsLoader = require("./functions/event.js");
const { loadSlash } = require("./functions/functions.js");

client.commands = new Collection();
client.events = new Collection();

(async () => {
  await loadSlash(client);
  await eventsLoader(client);
  client.login(TOKEN);
})();
