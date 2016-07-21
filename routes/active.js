import express from 'express';
import fetch from 'isomorphic-fetch';

const router = express.Router();

//活动列表
router.get('/', (req, res, next) => {
	var jsonparameter = '888';
	console.log(jsonparameter);
	res.render('active/active');
});


//活动详情
router.get('/:aid',(req, res, next) => {
	fetch(`http://10.10.16.173/test/selciname/selciname/bycinemaID?cinemaID=${req.params.aid}`)
	.then(response => response.json())
	.then(book => {
		fetch('http://10.10.16.173/test/selciname/bycinemaID?cinemaID=2')
		.then(response => response.json())
		.then(cinema => {
			console.log(req.params);
			console.log(cinema);
			res.render('active/details',{ book:book.resl , cinema:cinema.resl});
		});
	});
});

export default router;