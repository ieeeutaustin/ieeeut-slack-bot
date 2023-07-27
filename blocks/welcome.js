const createWelcomeMessage = () => {
  welcomeMessage = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: ":tada: Welcome to the IEEE UT Austin Slack!",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Whether you're a returning member or a new one, we're glad to have you here! :star-struck: Here are some things you need to know so you get the most out of IEEE! :point_down:",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*:student: #students*\n*Only super important updates in here!* Every single current IEEE member will be listed in this channel. Useful if you're trying to look for someone!",
      },
      accessory: {
        type: "image",
        image_url:
          "https://storage.googleapis.com/ieeeut-slack-bot-welcome/mari_shout.JPG",
        alt_text: "Redwood Suite",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":necktie: *#opportunities*\n*Internships? Career fair? Workshops?* Any professional or career development opportunities will be listed here. We got you!",
      },
      accessory: {
        type: "image",
        image_url:
          "https://storage.googleapis.com/ieeeut-slack-bot-welcome/armaan_professional.JPG",
        alt_text: "Redwood Suite",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*:sparkles: #events*\n*Weekly event updates and sign ups!* Find info about general meetings, socials, and special events. A silly little slack bot will update you every Monday at 9:00 AM!",
      },
      accessory: {
        type: "image",
        image_url:
          "https://storage.googleapis.com/ieeeut-slack-bot-welcome/fun.jpg",
        alt_text: "Redwood Suite",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":point_up::nerd_face: *Join the Discord!*\nWhile our Slack is mainly used for sending updates, our Discord is a great way to get academic help, chat with officers, and make friends through our family system!",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Join",
          },
          style: "primary",
          url: "https://discord.gg/puVJ7kPHC5",
        }
      ],
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":wave: *We hope to see you at our events!*",
      },
    },
  ];
  return welcomeMessage;
};

module.exports = { createWelcomeMessage };
