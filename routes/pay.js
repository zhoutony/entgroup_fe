import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';
import crypto from 'crypto';

const router = express.Router();

// 优惠券信息
router.get('/couponInfo', (req, res, next) => res.render('pay/couponInfo'));


//微信支付
router.post('/paywx',(req, res, next) => {
  var orderNo = req.body.orderNo;
  var payAmount = req.body.payAmount;
  var payType = req.body.payType;
  var mobile = req.body.mobile;
  var cinemaid = req.session.cinemaid;
  var userId = req.session.userid;
  //var openId = req.session.openId;
  var openId = 'oFJk6wNzEZO0i7KV5B_306Zm0WgQ';


  var md5ys = 'cinemaId='+cinemaid+'&mobile='+mobile+'&openId='+openId+'&orderNo='+orderNo+'&payAmount='+payAmount+'&payType='+payType+'6a567690e70e7096f97488fb25f1b1b9';

  var hashers=crypto.createHash("md5");
  hashers.update(md5ys);
  var hashmsgs=hashers.digest('hex');


  var jsonparams = {
    'cinemaId' : cinemaid,
    'mobile' : mobile,
    'openId' : openId,
    'orderNo' : orderNo,
    'payAmount' : payAmount,
    'payType' : payType,
    'sign' : hashmsgs
  };
  var jsonparameters = JSON.stringify(jsonparams);

  console.log(jsonparameters);

  fetch('http://10.10.12.5:8080/payserver/payCommit/commitPayOrder', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, body: 'jsonparam='+jsonparameters })
    .then(response => response.json())
    .then(commitorder =>{
      console.log(commitorder)
      res.render('pay/paywx',{ commitorder });
    });

});

//支付页面
router.get('/payment/:orderNo', (req, res, next) => {
  var orderNo = req.params.orderNo;
	var cinemaid = req.session.cinemaid;
  var userId = req.session.userid;
  var md5y = 'orderNo='+orderNo+'&userId='+userId+'6a567690e70e7096f97488fb25f1b1b9';

  //var md5ys = 'cinemaId=409&openId=oFJk6wNzEZO0i7KV5B_306Zm0WgQ&orderNo='+orderNo+'&payAmount=1&payType=16a567690e70e7096f97488fb25f1b1b9';

  var hasher=crypto.createHash("md5");
  hasher.update(md5y);
  var hashmsg=hasher.digest('hex');

  //var hashers=crypto.createHash("md5");
  //hashers.update(md5ys);
  //var hashmsgs=hashers.digest('hex');


  var jsonparam1 = {
    'orderNo' : orderNo,
    'userId' : userId,
    'sign' : hashmsg
  };
  var jsonparameter = JSON.stringify(jsonparam1);

  /*
  var jsonparams = {
    'cinemaId' : '409',
    'openId' : 'oFJk6wNzEZO0i7KV5B_306Zm0WgQ',
    'orderNo' : orderNo,
    'payAmount' : '1',
    'payType' : '1',
    'sign' : hashmsgs
  };
  var jsonparameters = JSON.stringify(jsonparams);
  */
  console.log(jsonparameter);
  var out_time = '2016-08-05 19:00:00';
  //res.render('pay/payment',{ cinemaid:cinemaid , out_time:out_time });
  fetch('http://10.10.12.5:8080/payserver/queryPayOrder/getPayInfo', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, body: 'jsonparam='+jsonparameter })
  .then(response => response.json())
  .then(orderinfores =>{
    //fetch('http://10.10.12.5:8080/payserver/payCommit/commitPayOrder', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, body: 'jsonparam='+jsonparameters })
    //.then(response => response.json())
    //.then(commitorder =>{
      console.log(orderinfores);
      //var out_time = '2016-08-05 19:00:00';
      //console.log(cinemaid);
      orderinfores.data.planBeginTime = time_stamp(orderinfores.data.planBeginTime);
      orderinfores.data.createTime = time_stamp(orderinfores.data.createTime+1000*60*160);
      //var showprice = parseInt(vpObj[vok].showprice)/100;
      //var truePrice = showprice.toFixed(2);
      orderinfores.data.payPrice = (parseInt(orderinfores.data.totalChannelPrice)/100).toFixed(2);
      var cinemauser = req.session.cinemaname;
      res.render('pay/payment',{ cinemaid:cinemaid , orderinfo:orderinfores.data, cinemauser : cinemauser});
    //});
  });
});

//时间戳转成时间格式
var time_stamp = function (time_stamp) {
  var mydate = new Date();
  mydate.setTime(time_stamp);
  var str = "" + mydate.getFullYear() + "-";
  str += (mydate.getMonth()+1) + "-";
  str += mydate.getDate()+ " ";
  str += mydate.getHours()+ ":";
  str += mydate.getMinutes()+ ":";
  str += mydate.getSeconds();

  return str;
};

export default router;
