var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cue supreme overlord$/;
      botRegec = /^\/show admins$/;
      botReged = /^\/welcome$/;
      botRegee = /^\/bow down$/;
      botRegef = /^\/oprah overlord$/;
      resp = 0;

  if(request.text && botRegex.test(request.text)) {
    resp = 1
  } else if(request.text && botRegec.test(request.text)) {
    resp = 2
  } else if(request.text && botReged.test(request.text)) {
    resp = 3
  } else if(request.text && botRegee.test(request.text)) {
    resp = 4
  } else if(request.text && botRegef.test(request.text)) {
    resp = 5
  }
  if(resp > 0) {
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

  if(resp == 1) {
    botResponse = 'I am Supreme Overlord Samantha Sprecace';
  } else if(resp == 2) {
    botResponse = 'Hello mods';
  } else if(resp == 3) {
    botResponse = 'Welcome to my domain! Make sure to read the chat description *cue imperial march theme*';
  } else if(resp == 4) {
    botResponse = 'Bow down to me ants';
  } else if(resp == 5) {
    botResponse = 'You get to worship me. You get to worship me. Everyone gets to worship me!';
  }

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
