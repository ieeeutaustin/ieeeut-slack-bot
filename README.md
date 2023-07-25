# ieeeut-slack-bot
Slack Bolt app for sending weekly event updates in #events channel. 

## Getting started 
First get all npm dependencies by running

```javascript
npm install
```
You need a ```.env``` file to store environment variables:

```env
SLACK_SIGNING_SECRET=<YOUR_SIGNING_SECRET>
SLACK_BOT_TOKEN=<YOUR_SLACK_BOT_TOKEN>
SLACK_APP_TOKEN=<YOUR_SLACK_APP_TOKEN>
GCAL_API_KEY=<YOUR_GCAL_API_KEY>
PORT=<PORT>
```

Also change the channel ID located in ```app.js``` (this isn't sensitive I hope)

```javascript
const eventsChannel = "C05F5S10TA6";
```

Now run this to start development environment
```javascript
npm run dev
```

## Schedule event reminders 
Slack bot sends weekly event updates using a cron job scheduler in ```app.js```. 

```javascript
// sends the weekly update every Monday at 9:00 AM
cron.schedule("0 9 * * Monday", sendWeeklyEvents);
```

## References 
- [Slack Bolt for Javascript](https://github.com/slackapi/bolt-js)
- [Google Calendar API](https://developers.google.com/calendar/api/guides/overview)
- [node-cron](https://github.com/node-cron/node-cron)

## How to host
Currently just hosting on a Raspberry Pi 400, which should be enough for a simple Slack bot. Leaving it constantly running so ```node-cron``` can send out weekly updates.
Can look into hosting on AWS Lambda or Render?

## Next steps?
- generate welcome modal for new members
- generate polls for members and officers
- officer contact info using ```/officers```
