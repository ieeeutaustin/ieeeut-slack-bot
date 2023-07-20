const { google } = require("googleapis");
const { createHeaderBlock, createEventBlock } = require("../blocks/events");

require("dotenv").config();

const key = process.env.GCAL_API_KEY;
const calendarId =
  "c_75cfdbedac5660fc90614ee4b59b7119142550b0bc91be5826ab40e7482d6b0c@group.calendar.google.com";

const calendar = google.calendar({
  version: "v3",
  auth: key,
});

let section_blocks = [].concat(createHeaderBlock("Monday", "Friday"));

// Retrieve upcoming events from the public Google Calendar
const getUpcomingEvents = async () => {
  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    return response.data.items;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

// Display messages into #events channel
const printUpcomingEvents = async ({ ack, say }) => {
  await ack();

  const events = await getUpcomingEvents();

  if (events.length > 0) {
    events.forEach((event) => {
      eventBlock = createEventBlock(event);
      section_blocks = section_blocks.concat(eventBlock);
    });

    await say({
      blocks: section_blocks,
    });
  } else {
    await say({
      text: "No upcoming events found in the public Google Calendar.",
    });
  }
};

module.exports = { printUpcomingEvents };
