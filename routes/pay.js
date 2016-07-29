import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//支付页面
router.get('/', (req, res, next) => {

	var cinemaid=req.session.cinemaid;

	var out_time = '2016-07-29 16:00:00';

	res.render('pay/payment',{ cinemaid:cinemaid , out_time:out_time});
});


//微信支付
router.get('/paywx',(req, res, next) => {

	res.render('pay/paywx');
});

export default router;