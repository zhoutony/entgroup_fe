import fetch from 'isomorphic-fetch';

const setdata = ( req, res, next) => {
	fetch(api_url+'selciname/bycinemaID?cinemaID=1')
	.then(response => response.json())
	.then(book => {
		//console.log(book.resl[0]['cinemaid']);
		req.session.cinemaid = book.resl[0]['cinemaid'];//写入至session   影院id

	});
	return next();
	
};

export default setdata;
