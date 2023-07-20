const { format } = require("date-fns");

const formatTime = (date) => {
  return format(date, "h:mm a");
};

const formatDateWithWeekday = (date) => {
  return format(date, "eeee, MMMM do, yyyy");
};

const formatDate = (date) => {
  return format(date, "MMMM do, yyyy");
};

// weekly event header
const createWeeklyHeaderBlock = (startOfWeek, endOfWeek) => {
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
          text: `*${startOfWeek} - ${endOfWeek}*`,
          type: "mrkdwn",
        },
      ],
    },
  ];
  return headerBlock;
};

// event block
const createEventBlock = (event) => {
  const start = new Date(event.start.dateTime);
  const end = new Date(event.end.dateTime);

  const startTime = formatTime(start);
  const endTime = formatTime(end);
  const eventDate = formatDateWithWeekday(start);

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
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `:date: *Date*: ${eventDate}\n:clock1: *Time*: ${startTime} - ${endTime}\n:round_pushpin: *Location*: ${event.location}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${event.description}`,
      },
    },
  ];
  return eventBlock;
};

// no events block
const noEventsMessage = () => {
  noEvents = [
    {
      type: "context",
      elements: [
        {
          text: `:shrug: Looks like there are no events this week :shrug:`,
          type: "mrkdwn",
        },
      ],
    },
  ];
  return noEvents
};

module.exports = {
  formatDate,
  createWeeklyHeaderBlock,
  createEventBlock,
  noEventsMessage,
};
