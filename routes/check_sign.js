import express from 'express';
import fetch from 'isomorphic-fetch';
import jsSHA from 'jssha';

const router = express.Router();


var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

var sign = function (jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
  	var shaObj = new jsSHA(string, 'TEXT');
  	ret.signature = shaObj.getHash('SHA-1', 'HEX');

  return ret;
};


router.get('/', (req, res, next) => {

	var jsapires = sign('kgt8ON7yVITDhtdwci0qeUXr20JinHz1nkdrkx7NkKsu4371d-WLnc3ev-e0-8sAJMEiwhlFUpw0GsgPJBRXcg', 'http://10.10.12.40:3000/sign');
	res.render('sign/sign',{ jsapires });
});



export default router;
