import express from 'express';
import fetch from 'isomorphic-fetch';
const router = express.Router();

const setdata = (req, res, next) => {
	// console.log(req.query.yc);
	var cid=req.session.cinemaid;
	if(cid){
		return next();
	}else{
		var yc=req.query.yc;
    console.log(yc);
		fetch(api_url+'cinema/getcinemalist?username='+yc)
		.then(response => response.json())
		.then(cinemaList => {
			console.log(cinemaList);
      req.session.cinemauser = yc;
			req.session.cinemaid = cinemaList.resl[0]['cinemaid'];//写入至session   影院id
      req.session.cinemaname = cinemaList.resl[0]['cinemaname'];//写入至session   影院名称
      req.session.entInits = cinemaList.resl[0]['platformId'];   //影投id

      if(cinemaList.total>1){
        req.session.cinemaState = 1;
      }
      return next();
			//console.log(req.session.cinemaid);
		});
	}





};

export default setdata;
