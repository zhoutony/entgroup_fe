import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

import ent_params from './ent_params.js';

const router = express.Router();


//个人中心首页
router.get('/', (req, res, next) => {
	var cinemaId = req.session.cinemaid;
	var customId = '1';
	fetch(api_url+`fake_personal/orderlist?customId=1&cinemaId=2`)
	.then(response => response.json())
	.then(orderlistres => {
		fetch(api_url+'fake_personal/couponlist?customId=1&cinemaId=2')
		.then(response => response.json())
		.then(couponlistres => {
			var get_params = new Object();
			get_params.cinemaid = "2";
			get_params.uid = "3";
			var username = 'user10377';
      //console.log(get_params.pop());
			console.log(ent_params(get_params,username));
			res.render('user/user',{ foot_on_5:'_on' , cinemaid:cinemaId , orderlist:orderlistres.resl , couponlist:couponlistres.resl })
		});
	});
});


//订单详情
router.get('/orderdetails', (req, res, next) => res.render('user/orderdetails'));

//优惠券详情
router.get('/coupondetails/:couponId', (req, res, next) =>{
	fetch(api_url+`fake_personal/couponDetail?couponId=${req.params.couponId}`)
	.then(response => response.json())
	.then(coupondetailres =>{
		res.render('user/coupondetails',{coupondetails:coupondetailres.resl})
	});

});


// 我的订单
router.get('/myOrder', (req, res, next) => res.render('user/myOrder'));


// 优惠券信息
router.get('/couponInfo', (req, res, next) => res.render('user/couponInfo'));
export default router;
