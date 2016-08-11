import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//影讯列表
router.get('/', (req, res, next) => {
  var cinemaid=req.session.cinemaid;
  fetch(api_url+'fake_news/newsList?cinemaId=1')
  .then(response => response.json())
  .then(film =>{
    if(film.list[0]['consultImg']){
      film.list[0]['isp'] = '1';
    }
    res.render('filmnews/filmnews',{ foot_on_3:'_on' ,filmList:film.list , cinemaid:cinemaid })
     console.log(film.list[1]);
  })


});


//影讯详情
router.get('/:aid',(req, res, next) => {
	fetch(api_url+'fake_news/newsDetail?consultId=1')
	.then(response => response.json())
	.then(filmDetails => {
		console.log(filmDetails);
		res.render('filmnews/details', { filmDetails:filmDetails.resl });
	});
});

export default router;
