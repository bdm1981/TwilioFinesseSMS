exports.handler = function(context, event, callback) {
  const client = require("twilio")(context.ACCOUNT_SID, context.AUTH_TOKEN);

  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

  // check if the event has any data and if not assume this is the OPTIONS request
  if (Object.keys(event).length === 0) {
    response.setStatusCode(200);
    callback(null, response);
  } else {
    if (event.to == null || event.from == null) {
      callback("to and body are required");
    }
    client.messages
      .list({
        from: event.from,
        to: event.to,
        limit: 5
      })
      .then(messages => {
        messages.forEach(m => console.log(m.sid));
        response.setStatusCode(200);
        response.setBody(JSON.stringify(messages));
        callback(null, response);
      });
  }
};
