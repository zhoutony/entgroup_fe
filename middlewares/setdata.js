import express from 'express';
import fetch from 'isomorphic-fetch';
const router = express.Router();

const setdata = router.get('/indexInit/:yc', (req, res, next) => {
	//console.log(req.params.yc);

	fetch(api_url+'selciname/bycinemaID?cinemaID='+req.params.yc)
	.then(response => response.json())
	.then(book => {
		//console.log(book.resl[0]['cinemaid']);
		req.session.cinemaid = book.resl[0]['cinemaid'];//写入至session   影院id
		//console.log(req.session.cinemaid);
	});
	return next();
	
});

export default setdata;
