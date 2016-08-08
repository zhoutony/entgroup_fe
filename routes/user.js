import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();


//个人中心首页
router.get('/', (req, res, next) => {
	//var cinemaId = req.session.cinemaid; 
	var cinemaId = '2';
	var customId = '1';
	fetch(api_url+`fake_personal/orderlist?customId=1&cinemaId=2`)
	.then(response => response.json())
	.then(orderlistres => {
		fetch(api_url+'fake_personal/couponlist?customId=1&cinemaId=2')
		.then(response => response.json())
		.then(couponlistres => {
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



export default router;