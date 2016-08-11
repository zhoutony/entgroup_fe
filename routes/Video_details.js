import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//活动列表
router.get('/:film_id', (req, res, next) => {
  console.log();
	//res.render('Video_details/Video_details');
  fetch(api_url+'movie/getmoviedetail?movieID=2')
  .then(response => response.json())
  .then(Video_details => {
    //console.log(Video_details);
      //res.render('Video_details/Video_details', { Video_details:Video_details.resl });
      fetch(api_url+'selmoviecomment/byMovieID?MovieID=1')
      .then(response => response.json())
      .then(byMovie => {
        console.log(Video_details);
          res.render('Video_details/Video_details', { byMovie:byMovie.resl,Video_details:Video_details.resl });
      });
  });


});




export default router;
