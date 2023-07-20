const { App } = require("@slack/bolt");
const { printUpcomingEvents } = require("./modules/calendar");
const cron = require("node-cron");

require("dotenv").config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

const eventsChannel = "C05F5S10TA6";

const sendWeeklyEvents = async () => {
  const blocks = await printUpcomingEvents();
  try {
    await app.client.chat.postMessage({
      channel: eventsChannel,
      blocks: blocks,
      text: "uhhh I'm supposed to send a weekly update"
    });
  } catch (err) {
    console.error("Error sending weekly events", err);
  }
};

// sends the weekly update every Monday at 9:00 AM
cron.schedule("0 9 * * Monday", sendWeeklyEvents);

(async () => {
  // Start your app
  await app.start();
  console.log("Bot is running!");
})();
