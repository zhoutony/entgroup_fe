import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//座位图页面
router.get('/selectSeat', (req, res, next) => {
   var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  var pid=req.query.pid;
  //var id=req.params.id;
  var yc=req.query.yc;
  console.log(pid);
  fetch(api_url+`act_index/querySeatStatus?showtimeId=`+pid)
  //fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)

    .then(response => response.json())

    .then(zzz =>{
      res.render('plan/Seat', { zzz:zzz.resl , foot_on_1:'_on' })
  })
    .catch(next);
});


export default router;
