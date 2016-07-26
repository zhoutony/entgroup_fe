import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//影讯列表
router.get('/', (req, res, next) => {
	var cinemaid=req.session.cinemaid;
	res.render('filmnews/filmnews',{ foot_on_3:'_on' , cinemaid:cinemaid})
});


//影讯详情
router.get('/:aid',(req, res, next) => {
	fetch(api_url+'selciname/bycinemaID?cinemaID=2')
	.then(response => response.json())
	.then(book => {
		console.log(book);
		res.render('filmnews/details', { book:book.resl });
	});
});

export default router; 