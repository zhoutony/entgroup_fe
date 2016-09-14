import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';
import crypto from 'crypto';

const router = express.Router();

// 优惠券信息
router.get('/couponInfo', (req, res, next) => res.render('pay/couponInfo'));


//微信支付
router.get('/paywx',(req, res, next) => {

  res.render('pay/paywx');
});

//支付页面
router.get('/:orderNo', (req, res, next) => {
  var orderNo = req.params.orderNo;
	var cinemaid = '111';
  var userId = '1';
  var md5y = 'orderNo='+orderNo+'&userId='+userId+'6a567690e70e7096f97488fb25f1b1b9';

  var md5ys = 'cinemaId=409&openId=oFJk6wNzEZO0i7KV5B_306Zm0WgQ&orderNo='+orderNo+'&payAmount=1&payType=16a567690e70e7096f97488fb25f1b1b9';

  var hasher=crypto.createHash("md5");
  hasher.update(md5y);
  var hashmsg=hasher.digest('hex');

  var hashers=crypto.createHash("md5");
  hashers.update(md5ys);
  var hashmsgs=hashers.digest('hex');


  var jsonparam = {
    'orderNo' : orderNo,
    'userId' : userId,
    'sign' : hashmsg
  };
  var jsonparameter = JSON.stringify(jsonparam);

  var jsonparams = {
    'cinemaId' : '409',
    'openId' : 'oFJk6wNzEZO0i7KV5B_306Zm0WgQ',
    'orderNo' : orderNo,
    'payAmount' : '1',
    'payType' : '1',
    'sign' : hashmsgs
  };
  var jsonparameters = JSON.stringify(jsonparams);
  console.log(jsonparameters);
  var out_time = '2016-08-05 19:00:00';
  res.render('pay/payment',{ cinemaid:cinemaid , out_time:out_time });
  //fetch('http://10.10.12.5:8080/payserver/queryPayOrder/getPayInfo', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, body: 'jsonparam='+jsonparameter })
  //.then(response => response.json())
  //.then(orderinfores =>{
    //fetch('http://10.10.12.5:8080/payserver/payCommit/commitPayOrder', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, body: 'jsonparam='+jsonparameters })
    //.then(response => response.json())
    //.then(commitorder =>{
      //console.log(commitorder);
      //var out_time = '2016-08-05 19:00:00';
      //console.log(cinemaid);
      //res.render('pay/payment',{ cinemaid:cinemaid , out_time:out_time , orderinfo:orderinfores.resl});
    //});
  //});
});


export default router;
