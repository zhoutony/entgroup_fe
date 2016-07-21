import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//router.get('/', (req, res, next) => res.render('home'));
router.get('/', (req, res, next) => {
  //req.session.user = 'lastPage';//写入至session
  //delete req.session.user;
  var user_id=req.session.user;
  //console.log(user_id);
  // if(user_id==null||user_id==undefined){
  //     res.redirect('/weixin');
  //      return;
  //  }
  //fetch(`http://10.10.12.10/test/selmovie/bycinemaID?cinemaID=1`)
  fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)

    .then(response => response.json())

    .then(zzz =>{
      console.log(zzz.resl)
      res.render('index_home', { zzz:zzz.resl })
  })
    //console.log(book)
    .catch(next);
});
//********************影片轮播页面*******************
router.get('/indexInit', (req, res, next) => {
  //req.session.user = 'lastPage';//写入至session
  //delete req.session.user;
  var user_id=req.session.user;
  //console.log(user_id);
  // if(user_id==null||user_id==undefined){
  //     res.redirect('/weixin');
  //      return;
  //  }
  fetch(`http://10.10.16.173/test/selciname/byusernames?username=1`)
  //fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)

    .then(response => response.json())

    .then(cinema =>{
      console.log(cinema);
      //res.render('index', { zzz:zzz.resl })
  })
  fetch(`http://10.10.16.173/test/selmovie/bycinemaID?cinemaID=1`)
  //fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)

    .then(response => response.json())

    .then(zzz =>{
      //console.log(zzz.resl)
      res.render('index', { zzz:zzz.resl })
  })
    //console.log(book)
    .catch(next);
});
////***************影片轮播页面indexdata*****************//
router.get('/indexData', (req, res, next) => {
  //req.session.user = 'lastPage';//写入至session
  //delete req.session.user;
  var user_id=req.session.user;
  //console.log(user_id);
  // if(user_id==null||user_id==undefined){
  //     res.redirect('/weixin');
  //      return;
  //  }
  fetch(`http://10.10.16.173/test/selciname/byusernames?username=1`)
  //fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)

    .then(response => response.json())

    .then(cinema =>{
      console.log(cinema);
      //res.render('index', { zzz:zzz.resl })
  })
  fetch(`http://10.10.16.173/test/selmovie/bycinemaID?cinemaID=1`)
  //fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)

    .then(response => response.json())

    .then(zzz =>{
      console.log(zzz)
      res.json(zzz);
  })
    //console.log(book)
    .catch(next);
});
export default router;
