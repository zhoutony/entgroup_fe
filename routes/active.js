import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//活动列表
router.get('/', (req, res, next) => {

	var cinemaid=req.session.cinemaid;
  fetch(api_url+'fake_activity/activitylist?cinemaId=1')
  .then(response => response.json())
  .then(active =>{
      // console.log(cinemaid);
      res.render('active/active',{ foot_on_4:'_on' , active:active.list , cinemaid:cinemaid});
      // console.log(active.list);
  })

});


//活动详情
router.get('/details/:aid',(req, res, next) => {
	var cinemaId = req.session.cinemaid;
      // console(aid);
      fetch(api_url+'fake_activity/activitydetail?cinemaId=1')
      .then(response => response.json())
      .then(details =>{
        console.log(details);
        res.render('active/details',{ details:details.list });
      })
});

export default router;
