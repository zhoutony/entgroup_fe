import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//router.get('/', (req, res, next) => res.render('home'));
router.get('/', (req, res, next) => {
  //req.session.user = 'lastPage';//写入至session
  //delete req.session.user;
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  //console.log(user_id);
  // if(user_id==null||user_id==undefined){
  //     res.redirect('/weixin');
  //      return;
  //  }
  fetch(api_url+`selmovie/bycinemaID?cinemaID=`+cinemaid)
  //fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)

    .then(response => response.json())

    .then(zzz =>{
      console.log(zzz.resl)
      res.render('index_home', { zzz:zzz.resl , foot_on_1:'_on' })
  })
    //console.log(book)
    .catch(next);
});
//********************影片轮播页面*******************2016-7
router.get('/indexInit', (req, res, next) => {
  //req.session.user = 'lastPage';//写入至session
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  console.log(cinemaid);

  fetch(api_url+`selmovie/bycinemaID?cinemaID=1`)
    .then(response => response.json())
    .then(zzz =>{
      res.render('index', { zzz:zzz.resl, foot_on_2:'_on',cinemaid:cinemaid })
  })
    .catch(next);
});
////***************影片轮播页面indexdata*****************//2016-7
router.get('/indexData/:yc/:film_id', (req, res, next) => {
  var user_id=req.session.user;
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  fetch(api_url+`selmovie/bycinemaID?cinemaID=`+cinemaid)   //  读取当前影片
    .then(response => response.json())

    .then(zzz =>{
      res.json(zzz);
  })
    .catch(next);
});
export default router;
