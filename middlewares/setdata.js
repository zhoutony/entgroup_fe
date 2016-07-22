import fetch from 'isomorphic-fetch';

const setdata = ( req, res, next) => {
	fetch('http://10.10.16.173/test/selciname/bycinemaID?cinemaID=3')
	.then(response => response.json())
	.then(book => {
		console.log(book);
	});
	return next();
	
};

export default setdata;
