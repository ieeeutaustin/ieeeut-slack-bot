const { google } = require("googleapis");

require("dotenv").config();

const key = process.env.GCAL_API_KEY;

const calendarId =
  "c_75cfdbedac5660fc90614ee4b59b7119142550b0bc91be5826ab40e7482d6b0c@group.calendar.google.com";

const calendar = google.calendar({
  version: "v3",
  auth: key,
});

// weekly event header
headerBlock = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":tada: *EVENTS THIS WEEK* :tada:",
    },
  },
  {
    type: "context",
    elements: [
      {
        text: "*November 12, 2023* - *November 19, 2023*",
        type: "mrkdwn",
      },
    ],
  },
];

let section_blocks = [].concat(headerBlock);

// Function to retrieve upcoming events from the public Google Calendar
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

const printUpcomingEvents = async ({ ack, say }) => {
  // acknowledge the action
  await ack();

  // Get upcoming events from the Google Calendar
  const events = await getUpcomingEvents();

  if (events.length > 0) {
    events.forEach((event) => {
      eventBlock = [
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${event.summary}*`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              emoji: true,
              text: "RSVP",
            },
            value: "click_me_123",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: ":date: *Date*: " + `${event.start.date}`,
            },
          ],
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: ":clock1: *Time*: " + `${event.start.dateTime}`,
            },
          ],
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: ":round_pushpin: *Location*: " + `${event.location}`,
            },
          ],
        },
      ];
      section_blocks = section_blocks.concat(eventBlock);
      //   const start = event.start.dateTime || event.start.date;
      //   eventList += `${start} - ${event.summary}\n`;
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
