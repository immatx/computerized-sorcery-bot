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
      botRegeg = /^\/welcome overlord$/;
      botRegeh = /^\/love yall$/;
      botRegei = /^\/oligarchy or monarchy$/;
      botRegej = /^\/doggos ftw$/;
      botRegek = /^\/no cats$/;
      botRegel = /^\/dropped$/;
      botRegem = /^\/no thanks$/;
      botRegen = /^\/yas$/;
      botRegeo = /^\/doggos$/;
      botRegep = /^\/mother$/;
      botRegeq = /^\/attacked$/;
      botReger = /^\/headless$/;
      botReges = /^\/callsign$/;
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
  } else if(request.text && botRegeg.test(request.text)) {
    resp = 6
  } else if(request.text && botRegeh.test(request.text)) {
    resp = 7
  } else if(request.text && botRegei.test(request.text)) {
    resp = 8
  } else if(request.text && botRegej.test(request.text)) {
    resp = 9
  } else if(request.text && botRegek.test(request.text)) {
    resp = 10
  } else if(request.text && botRegel.test(request.text)) {
    resp = 11
  } else if(request.text && botRegem.test(request.text)) {
    resp = 12
  } else if(request.text && botRegen.test(request.text)) {
    resp = 13
  } else if(request.text && botRegeo.test(request.text)) {
    resp = 14
  } else if(request.text && botRegep.test(request.text)){
    resp = 15
  } else if(request.text && botRegeq.test(request.text)){
    resp = 16
  } else if(request.text && botReger.test(request.text)){
    resp = 17
  } else if(request.text && botReges.test(request.text)){
    resp = 18;
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
    botResponse = 'Bow down to me ants!';
  } else if(resp == 5) {
    botResponse = 'You get to worship me. You get to worship me. Everyone gets to worship me!';
  } else if(resp == 6) {
    botResponse = 'Welcome to my domain peasant!';
  } else if(resp == 7) {
    botResponse = 'I love you guys';
  } else if(resp == 8) {
    botResponse = 'Why have an oligarchy when you can have a monarchy!';
  } else if(resp == 9) {
    botResponse = 'DOGGOS FOR THE WIN!!!';
  } else if(resp == 10) {
    botResponse = 'How could you ever think cats are better than dogs?!';
  } else if(resp == 11) {
    botResponse = 'I think you were dropped on your head as a child....';
  } else if(resp == 12) {
    botResponse = 'No thanks';
  } else if(resp == 13) {
    botResponse = 'YAAAAAAAAAASSSSS!!!!!!';
  } else if(resp == 14) {
    botResponse = 'DOGGOS!';
  } else if(resp == 15) {
    botResponse = 'Child, I am your mother';
  } else if(resp == 16) {
    botResponse = 'I feel attacked';
  } else if(resp == 17) {
    botResponse = 'Off with your head!';
  } else if(resp == 18) {
    botResponse = 'work in progress';    //this is for the callsign/emojis
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
