const { glob } = require("glob");
const { promisify } = require("util");
const proGlob = promisify(glob);

async function eventsHandler() {
  const events = await proGlob(
    `${process.cwd().replace(/\\/g, "/")}/src/events/**/*.js`
  );
  events.forEach((file) => delete require.cache[require.resolve(file)]);
  return events;
}

async function slashCommandHandler() {
  const commands = await proGlob(
    `${process.cwd().replace(/\\/g, "/")}/src/commands/**/*.js`
  );

  commands.forEach((file) => delete require.cache[require.resolve(file)]);
  return commands;
}

module.exports = { slashCommandHandler, eventsHandler };
