import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();
router.get('/', (req, res, next) => {
  //req.session.user = 'lastPage';//写入至session
  //delete req.session.user;
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  //console.log(user_id);
  // if(user_id==null||user_id==undefined){
  //     res.redirect('/weixin');
  //      return;
  //  }
  console.log(cinemaid);
  fetch(api_url+`selciname/bycinemaID?cinemaID=`+cinemaid)
  //fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)
    .then(response => response.json())

    .then(zzz =>{
    	console.log(zzz);
      res.render('cinema/cinemadetails', { zzz:zzz.resl , foot_on_1:'_on',cinemaid:cinemaid })
  	})
    //console.log(book)
    .catch(next);
});
export default router;
