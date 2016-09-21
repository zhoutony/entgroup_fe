import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';
const router = express.Router();


//选择影城
router.get('/', (req, res, next) => {


  var cinemauser=req.session.cinemauser;  //影院yc的session读取判断是影投还是影院
  fetch(api_url+`cinema/getcinemalist?username=`+cinemauser)
  .then(response => response.json())
  .then(cinemaAll =>{
      res.render('selectCinema/selectCinema', { cinemaAll:cinemaAll.resl,cinemauser:cinemauser})
  })
});

export default router;
