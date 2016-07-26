import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//活动列表
router.get('/', (req, res, next) => {

	var cinemaid=req.session.cinemaid;

	res.render('active/active',{ foot_on_4:'_on' , cinemaid:cinemaid});
});


//活动详情
router.get('/:aid',(req, res, next) => {
	var cinemaId = req.session.cinemaid; 
	fetch(api_url+`selciname/bycinemaID?cinemaID=${req.params.aid}`)
	.then(response => response.json())
	.then(book => {
		fetch(api_url+'selciname/bycinemaID?cinemaID=2')
		.then(response => response.json())
		.then(cinema => {
			console.log(cinemaId);
			console.log(book);
			res.render('active/details',{ book:book.resl , cinema:cinema.resl});
		});
	});
});

export default router;