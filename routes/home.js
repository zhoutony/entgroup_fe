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
      //console.log(zzz.resl)
      res.render('index_home', { zzz:zzz.resl , foot_on_1:'_on',cinemaid:cinemaid })
  })
    //console.log(book)
    .catch(next);
});
//********************影片轮播页面*******************2016-7
router.get('/indexInit', (req, res, next) => {
  //req.session.user = 'lastPage';//写入至session
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  //cinemaid=req.session.cinemaid;      //影院id 的session 读取
  //console.log(req.params.film_id);
  //console.log(cinemaid);
  var service=new Array();
       var film_id=req.query.film_id;
       if(film_id==null){
          film_id='test';
       }
     //console.log(film_id)
  fetch(api_url+`selciname/bycinemaID?cinemaID=`+cinemaid)
    .then(response => response.json())

    .then(zzz =>{
       //var result=json_decode(zzz,true);
      //zzz.resl[0]['cinemaservice']=zzz.resl[0]['cinemaservice'].replace('{' , ""); 
      //zzz.resl[0]['cinemaservice']=zzz.resl[0]['cinemaservice'].replace('}' , ""); 
      //zzz.resl[0]['cinemaservice'] = zzz.resl[0]['cinemaservice'].split(',');
      zzz.resl[0]['cinemaservice'] = JSON.parse([zzz.resl[0]['cinemaservice']])
      
      if(zzz.resl[0]['cinemaservice']['mianya']){
        zzz.resl[0]['cinemaservice']['mianya']='免押金';
      }
      if(zzz.resl[0]['cinemaservice']['wifi']){
        zzz.resl[0]['cinemaservice']['wifi']='WIFI';
      }
      if(zzz.resl[0]['cinemaservice']['park']){
        zzz.resl[0]['cinemaservice']['park']='免费停车';
      }
      if(zzz.resl[0]['cinemaservice']['canyin']){
        zzz.resl[0]['cinemaservice']['canyin']='餐饮';
      }
      if(zzz.resl[0]['cinemaservice']['jvmu']){
        zzz.resl[0]['cinemaservice']['jvmu']='巨幕';
      }
      if(zzz.resl[0]['cinemaservice']['yule']){
        zzz.resl[0]['cinemaservice']['yule']='娱乐';
      }
      if(zzz.resl[0]['cinemaservice']['vip']){
        zzz.resl[0]['cinemaservice']['vip']='VIP';
      }
      if(zzz.resl[0]['cinemaservice']['shopping']){
        zzz.resl[0]['cinemaservice']['shopping']='购物';
      }
      if(zzz.resl[0]['cinemaservice']['imax']){
        zzz.resl[0]['cinemaservice']['imax']='IMAX';
      }
      if(zzz.resl[0]['cinemaservice']['feimai']){
        zzz.resl[0]['cinemaservice']['feimai']='卖品';
      }
      if(zzz.resl[0]['cinemaservice']['card']){
        zzz.resl[0]['cinemaservice']['card']='刷卡';
      }
      if(zzz.resl[0]['cinemaservice']['zhoubian']){
        zzz.resl[0]['cinemaservice']['zhoubian']='周边';
      }
      if(zzz.resl[0]['cinemaservice']['qinglv']){
        zzz.resl[0]['cinemaservice']['qinglv']='情侣座';
      }
      if(zzz.resl[0]['cinemaservice']['restArea']){
        zzz.resl[0]['cinemaservice']['restArea']='休息区';
      }
      //console.log(zzz.resl[0]['cinemaservice']);
      res.render('index', { zzz:zzz.resl, foot_on_2:'_on',cinemaid:cinemaid,film_id:film_id })
  })
    .catch(next);
});
////***************影片轮播页面indexdata*****************//2016-7
router.get('/indexData/:yc/:film_id', (req, res, next) => {
  //console.log(1111111)
  //console.log(req.session.cinemaid)
  //var user_id=req.session.user;
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  var film_id=req.params.film_id;
  //alert(movieid);
  fetch(api_url+`selmovie/bycinemaID?cinemaID=`+cinemaid)   //  读取当前影片
  //fetch(api_url+`selmovie/bycinemaIDandMovieID?cinemaID=`+cinemaid+`&movieId=`+movieid)   //  读取当前影片
    .then(response => response.json())

    .then(zzz =>{
      var new_array=new Array();
      if(film_id!='undefined'){
        for(var i=0;i<zzz.resl.length;i++){       //根据   film_id  重新排列影片列表顺序
          if(zzz.resl[i]['entMovieId']==film_id){
             new_array.push(zzz.resl[i]);
             zzz.resl.splice(i,1);
             zzz.resl.unshift(new_array[0]);
          }
        } 
      }

      //console.log(zzz.resl)
      res.json(zzz);
    })
    .catch(next);
});
export default router;
