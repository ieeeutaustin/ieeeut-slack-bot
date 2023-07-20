const { google } = require("googleapis");
const {
  formatDate,
  createWeeklyHeaderBlock,
  createEventBlock,
  noEventsMessage,
} = require("../blocks/events");
const { startOfWeek, endOfWeek } = require("date-fns");

require("dotenv").config();

const key = process.env.GCAL_API_KEY;
const calendarId =
  "c_75cfdbedac5660fc90614ee4b59b7119142550b0bc91be5826ab40e7482d6b0c@group.calendar.google.com";

const calendar = google.calendar({
  version: "v3",
  auth: key,
});

const today = new Date();
const thisWeekStart = new Date(startOfWeek(today, { weekStartsOn: 1 }));
const thisWeekEnd = new Date(endOfWeek(thisWeekStart, { weekStartsOn: 1 }));

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

const filterEventsForThisWeek = (events) => {
  const eventsThisWeek = events.filter((event) => {
    eventStart = new Date(event.start.dateTime);
    eventEnd = new Date(event.end.dateTime);
    return eventStart >= thisWeekStart && eventEnd <= thisWeekEnd;
  });

  return eventsThisWeek;
};

// Display messages into #events channel
const printUpcomingEvents = async () => {

  let section_blocks = [].concat(
    createWeeklyHeaderBlock(formatDate(thisWeekStart), formatDate(thisWeekEnd))
  );

  const events = await getUpcomingEvents();
  const eventsThisWeek = filterEventsForThisWeek(events);

  if (eventsThisWeek.length > 0) {
    eventsThisWeek.forEach((event) => {
      eventBlock = createEventBlock(event);
      section_blocks = section_blocks.concat(eventBlock);
    });
  } else {
    section_blocks = section_blocks.concat(noEventsMessage());
  }

  return section_blocks;
};

module.exports = { printUpcomingEvents };
