var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cue supreme overlord$/;
      botRegec = /^\cue admin$/;

  if(request.text && botRegex.test(request.text)) {
    resp = 0
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else if(request.text && botRegec.test(request.text)) {
    resp = 1
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

  if(resp == 0) {
    botResponse = 'I am Supreme Overlord Samantha Sprecace';
  } else {
    botResponse = 'Hello mods';
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

  console.log('sending ' + botResponse + ' to ' + 9yHP2TK9WIEFnvnZKPacLXy5B97FztVCGSwq1n9p);

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
