import express from 'express';
import fetch from 'isomorphic-fetch';
const router = express.Router();

const setdata = (req, res, next) => {


  var cid=req.session.cinemaid; //读取sessionid
  var cinemaid = req.query.cinemaid;
  var cinemayc = req.session.cinemauser;
  var yc=req.query.yc;

  if(yc){
    if(yc != cinemayc){
        cid = '';
    }
  }



	if(cid){
    if(cinemaid){
        req.session.cinemaid = cinemaid;
        req.session.cinemaState = 0;
      }
		return next();
	}else{
		fetch(api_url+'cinema/getcinemalist?username='+yc)
		.then(response => response.json())
		.then(cinemaList => {
      req.session.cinemauser = yc;
			req.session.cinemaid = cinemaList.resl[0]['cinemaid'];//写入至session   影院id
      req.session.cinemaname = cinemaList.resl[0]['cinemaname'];//写入至session   影院名称
      req.session.entInits = cinemaList.resl[0]['platformId'];   //影投id
      req.session.userid = 1;
      if(cinemaid){
        req.session.cinemaState = 0;
      }else{
        if(cinemaList.total>1){
          req.session.cinemaState = 1;
        }
      }

      return next();
			//console.log(req.session.cinemaid);
		});
	}





};

export default setdata;
