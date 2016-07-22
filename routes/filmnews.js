import express from 'express';
import fetch from 'isomorphic-fetch';

const router = express.Router();

//影讯列表
router.get('/', (req, res, next) => res.render('filmnews/filmnews',{ foot_on_3:'_on' }));


//影讯详情
router.get('/:aid',(req, res, next) => {
	fetch('http://10.10.16.173/test/selciname/bycinemaID?cinemaID=2')
	.then(response => response.json())
	.then(book => {
		console.log(book);
		res.render('filmnews/details', { book:book.resl });
	});
});

export default router;