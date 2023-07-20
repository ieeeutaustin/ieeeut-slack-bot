const { format } = require("date-fns");

const formatTime = (date) => {
  return format(date, "h:mm a");
};

const formatDate = (date) => {
  return format(date, "eeee, MMMM do, yyyy");
};

// weekly event header
const createHeaderBlock = (startOfWeek, endOfWeek) => {
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
  const eventDate = formatDate(start);

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

module.exports = {
  formatTime,
  formatDate,
  createHeaderBlock,
  createEventBlock,
};
