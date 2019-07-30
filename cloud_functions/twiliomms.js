const accountSid = '<sid>';
const authToken = '<authtoken>';
const client = require('twilio')(accountSid, authToken);


function main(params) {
    return client.messages
  .create({
     body: params.message,
     from: '<phone-number>',
     to: params.receiver,
     mediaUrl: params.mediaUrl
   })
  .then(message => {
      return { status: "sent" }
  });
}
