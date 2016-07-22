import express from 'express';
import fetch from 'isomorphic-fetch';

const router = express.Router();

//活动列表
router.get('/', (req, res, next) => {
	var jsonparameter = '888';
	console.log(global.name);
	res.render('active/active',{ foot_on_4:'_on' });
});


//活动详情
router.get('/:aid',(req, res, next) => {
	fetch(api_url+`selciname/bycinemaID?cinemaID=${req.params.aid}`)
	.then(response => response.json())
	.then(book => {
		fetch(api_url+'selciname/bycinemaID?cinemaID=2')
		.then(response => response.json())
		.then(cinema => {
			console.log(api_url);
			console.log(cinema);
			res.render('active/details',{ book:book.resl , cinema:cinema.resl});
		});
	});
});

export default router;