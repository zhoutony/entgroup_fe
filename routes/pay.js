import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//支付页面
router.get('/', (req, res, next) => {

	var cinemaid='111';

	var out_time = '2016-08-05 19:00:00';
	console.log(cinemaid);
	res.render('pay/payment',{ cinemaid:cinemaid , out_time:out_time});
});


//微信支付
router.get('/paywx',(req, res, next) => {

	res.render('pay/paywx');
});

export default router;