var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/commands$/;

  if (request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

    botResponse = "current commands:" + "\n" + "/cue supreme overlord" + "\n" + "/show admins" + "\n" + "/welcome" + "\n"
    + "/bow down" + "\n" + "/oprah overlord" + "\n" + "/welcome overlord" + "\n" + "/love yall" + "\n" + "/oligarchy or monarchy"
    + "\n" + "/doggos ftw" + "\n" + "/no cats" + "\n" + "/dropped" + "\n" + "/no thanks" + "\n" + "/yas" + "\n" + "/doggos"
    + "\n" + "/mother" + "\n" + "/attacked" + "\n" + "/headless" + "\n" + "/callsign" 

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
