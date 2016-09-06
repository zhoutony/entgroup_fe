import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';
import crypto from 'crypto';

const router = express.Router();

//支付页面
router.get('/:orderNo', (req, res, next) => {
  var orderNo = req.params.orderNo;
	var cinemaid = '111';
  var userId = '1';
  var md5y = 'orderNo='+orderNo+'&userId='+userId+'6a567690e70e7096f97488fb25f1b1b9';

  var hasher=crypto.createHash("md5");
  hasher.update(md5y);
  var hashmsg=hasher.digest('hex');

  var jsonparam = {
    'orderNo' : orderNo,
    'userId' : userId,
    'sign' : hashmsg
  };
  var jsonparameter = JSON.stringify(jsonparam);
  console.log(jsonparameter);


  fetch('http://10.10.12.5:8080/payserver/queryPayOrder/getPayInfo', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, body: 'jsonparam='+jsonparameter })
  .then(response => response.json())
  .then(orderinfo =>{
    console.log(orderinfo);
    var out_time = '2016-08-05 19:00:00';
    //console.log(cinemaid);
    res.render('pay/payment',{ cinemaid:cinemaid , out_time:out_time});
  });
});


//微信支付
router.get('/paywx',(req, res, next) => {

	res.render('pay/paywx');
});

export default router;
