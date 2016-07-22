import express from 'express';
import fetch from 'isomorphic-fetch';

const router = express.Router();


//个人中心首页
router.get('/', (req, res, next) => res.render('user/user'));


//订单详情 
router.get('/orderdetails', (req, res, next) => res.render('user/orderdetails'));

//优惠券详情
router.get('/coupondetails', (req, res, next) => res.render('user/coupondetails'));


router.get('/:aid',(req, res, next) => {
	fetch('http://10.10.16.173/test/selciname/bycinemaID?cinemaID=2')
	.then(response => response.json())
	.then(book => {
		console.log(book);
		res.render('active/details', { book:book.resl });
	});
});

export default router;