import express from 'express';
import fetch from 'isomorphic-fetch';
const router = express.Router();

const setdata = (req, res, next) => {
	//console.log(req.query.yc);
	var cid=req.session.cinemaid;
	if(cid){
		return next();
	}else{
		var yc=req.query.yc;
		fetch(api_url+'cinema/getcinemadetail?cinemaID='+yc)
		.then(response => response.json())
		.then(book => {
			//console.log(book.resl[0]['cinemaid']);
			req.session.cinemaid = book.resl[0]['cinemaid'];//写入至session   影院id
      req.session.cinemaname = book.resl[0]['cinemaname'];//写入至session   影院名称
			 return next();

			//console.log(req.session.cinemaid);
		});
	}





};

export default setdata;
