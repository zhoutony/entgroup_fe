import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();


//个人中心首页
router.get('/', (req, res, next) => {
	var cinemaid=req.session.cinemaid;
	res.render('user/user',{ foot_on_5:'_on' , cinemaid:cinemaid})
});


//订单详情 
router.get('/orderdetails', (req, res, next) => res.render('user/orderdetails'));

//优惠券详情
router.get('/coupondetails', (req, res, next) => res.render('user/coupondetails'));


router.get('/:aid',(req, res, next) => {
	fetch(api_url+'selciname/bycinemaID?cinemaID=2')
	.then(response => response.json())
	.then(book => {
		console.log(book);
		res.render('active/details', { book:book.resl });
	});
});

export default router;