import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';
const router = express.Router();


//选择影城
router.get('/', (req, res, next) => {


  var cinemauser=req.session.cinemauser;  //影院yc的session读取判断是影投还是影院
  // console.log(cinemauser)
  fetch(api_url+`cinema/getcinemalist?username=`+cinemauser)
  .then(response => response.json())
  .then(cinemaAll =>{
    // console.log(cinemaAll)
    var cityLength = cinemaAll.total;
    // var myarry = new Array();
    // for (var i = 0; i < cityLength; i++) {   //循环查出来的数组

    //   for (var k = 0; k < myarry.length; k++) { //循环添加进去的新数组如果已经添加跳过
    //     if(cinemaAll.resl[i].city == myarry[i].city){
    //       continue
    //     }
    //     myarry[i] = new Array();
    //     myarry[i]['cityid'] = cinemaAll.resl[i].city;
    //     myarry[i]['cityname'] = cinemaAll.resl[i].cinemaid;
    //   };

    // };
    var myarry = new Array();

    for(var k in cinemaAll.resl){
      var c=true;
      for(var k2 in myarry){
        if(myarry[k2].cityid==cinemaAll.resl[k].cinemaid){
          c=false;
        }
      }
      if(c){
        myarry.push(cinemaAll.resl[k]);
        // myarry.push(cinemaAll.resl[k].cinemaid);
        // myarry.push(cinemaAll.resl[k].city);
      }
    }

     // console.log(myarry);

      res.render('selectCinema/selectCinema', { cinemaAll:cinemaAll.resl,cinemauser:cinemauser,myarry:myarry})
  })
});

export default router;
