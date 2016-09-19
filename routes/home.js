import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

router.get('/', (req, res, next) => {
  //req.session.user = 'lastPage';//写入至session
  //delete req.session.user;
  var cinemaState = req.session.cinemaState;
  if(cinemaState==1){
    res.redirect('/selectCinema');
    return;
  }
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  var cinemauser=req.session.cinemauser;  //影院yc的session读取判断是影投还是影院
  // console.log(cinemaid);
  var cinemaname=req.session.cinemaname;      //影院name 的session 读取
  fetch(api_url+`movie/getmovielist?cinemaID=`+cinemaid)

    .then(response => response.json())

    .then(cinema =>{
      // console.log(cinema.resl);
      res.render('index_home', { cinema:cinema.resl , foot_on_1:'_on',cinemaid:cinemaid,cinemaname:cinemaname,cinemauser:cinemauser})
  })
    .catch(next);
});
//********************影片轮播页面********  king  ***********2016-7
router.get('/indexInit', (req, res, next) => {
  //req.session.user = 'lastPage';//写入至session
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  var cinemaname=req.session.cinemaname;      //影院name 的session   读取
  var cinemauser=req.session.cinemauser;      //影院name 的session   读取

       var film_id=req.query.film_id;
       if(film_id==null){
          film_id='000';
       }
  fetch(api_url+`cinema/getcinemadetailV3?cinemaID=`+cinemaid)
    .then(response => response.json())

    .then(cinemaInfo =>{
      console.log(cinemaInfo);
      /*
      cinema.resl[0]['cinemaservice'] = JSON.parse([cinema.resl[0]['cinemaservice']]);


      if(cinema.resl[0]['cinemaservice']['mianya']){
        cinema.resl[0]['cinemaservice']['mianya']='免押金';
      }
      if(cinema.resl[0]['cinemaservice']['wifi']){
        cinema.resl[0]['cinemaservice']['wifi']='WIFI';
      }
      if(cinema.resl[0]['cinemaservice']['park']){
        cinema.resl[0]['cinemaservice']['park']='免费停车';
      }
      if(cinema.resl[0]['cinemaservice']['canyin']){
        cinema.resl[0]['cinemaservice']['canyin']='餐饮';
      }
      if(cinema.resl[0]['cinemaservice']['jvmu']){
        cinema.resl[0]['cinemaservice']['jvmu']='巨幕';
      }
      if(cinema.resl[0]['cinemaservice']['yule']){
        cinema.resl[0]['cinemaservice']['yule']='娱乐';
      }
      if(cinema.resl[0]['cinemaservice']['vip']){
        cinema.resl[0]['cinemaservice']['vip']='VIP';
      }
      if(cinema.resl[0]['cinemaservice']['shopping']){
        cinema.resl[0]['cinemaservice']['shopping']='购物';
      }
      if(cinema.resl[0]['cinemaservice']['imax']){
        cinema.resl[0]['cinemaservice']['imax']='IMAX';
      }
      if(cinema.resl[0]['cinemaservice']['feimai']){
        cinema.resl[0]['cinemaservice']['feimai']='卖品';
      }
      if(cinema.resl[0]['cinemaservice']['card']){
        cinema.resl[0]['cinemaservice']['card']='刷卡';
      }
      if(cinema.resl[0]['cinemaservice']['zhoubian']){
        cinema.resl[0]['cinemaservice']['zhoubian']='周边';
      }
      if(cinema.resl[0]['cinemaservice']['qinglv']){
        cinema.resl[0]['cinemaservice']['qinglv']='情侣座';
      }
      if(cinema.resl[0]['cinemaservice']['restArea']){
        cinema.resl[0]['cinemaservice']['restArea']='休息区';
      }*/
      res.render('index', { cinema:cinemaInfo.resl, foot_on_2:'_on',cinemaid:cinemaid,film_id:film_id,cinemaname:cinemaname,cinemauser })
  })
    .catch(next);
});
////***************影片轮播页面indexdata*****  king  ************//2016-7
router.get('/indexData/:yc/:film_id', (req, res, next) => {
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  var film_id=req.params.film_id;         //影片id 的session 读取


  fetch(api_url+`movie/getmovielist?cinemaID=`+cinemaid)   //  读取当前影片
    .then(response => response.json())

    .then(movielist =>{
      fetch(api_url+'cplan/getplanlist?cinemaID='+cinemaid+'&MovieID='+film_id)   //  读取场次列表
      .then(response => response.json())
      .then(plan =>{
        //console.log(movielist);
        var new_array1={};
        var new_array=new Array();
        if(film_id!='undefined'){
          for(var i=0;i<movielist.resl.length;i++){       //根据   film_id  重新排列影片列表顺序
            if(movielist.resl[i]['movieid']==film_id){
               new_array.push(movielist.resl[i]);
               movielist.resl.splice(i,1);
               movielist.resl.unshift(new_array[0]);
            }
          }

        }
        var mydate = new Date();
        var t_s=mydate.getTime();
        mydate.setTime(t_s+1000*60*15);    //开场前15分钟
        var str = "" + mydate.getFullYear() + "-";
        str += (mydate.getMonth()+1) + "-";
        str += mydate.getDate()+ " ";
        str += mydate.getHours()+ ":";
        str += mydate.getMinutes()+ ":";
        str += mydate.getSeconds();
        //console.log(str);    //开场前15分钟时间
        var DateInfos_new_array={};
        var DataPlans_new_array={};
        //console.log(plan.resl);
        if(plan.resl){       //判断场次是否为空
         // console.log(plan.resl.length)
          for(var key in plan.resl){
            //console.log(key);
            var date =  new Date(plan.resl[key].startTime);
            var ENDdate = new Date(plan.resl[key].endTime);
           // var time_str = date.getTime();    //传穿成时间戳
           var vStartTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
           var date1 = (date.getMonth()+1)+"月"+date.getDate();
           var date2 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
           var date3 = date.getDate();
           var HM = date.getHours()+":"+date.getMinutes();
           var EDTM =ENDdate.getHours()+":"+ENDdate.getMinutes();
           var dayInfos = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
           var da = date.getDate();
           var db = mydate.getDate();
           var d = da-db;
           if(da>db){
               d = da-db;
           }else{
              var da = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
              var db = mydate.getFullYear()+"-"+(mydate.getMonth()+1)+"-"+mydate.getDate();
              var strSeparator = "-"; //日期分隔符
              var oDate1= da.split(strSeparator);
              var oDate2= db.split(strSeparator);
              var strDateS = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
              var strDateE = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
              var d = parseInt(Math.abs(strDateS - strDateE )/1000/60/60/24);
           }
           var h = date.getHours();
            if(h >= 18 && h <= 23 ){ //计算太阳月亮图标显示（时间段）
              h = 'p';
            }else{
              h = 'a';
            }
            //str = DateTime.parse(str);
            //vStartTime = DateTime.parse(vStartTime);
            //str=new Date(str.replace(/-/g,"\/")),
            //vStartTime=new Date(vStartTime.replace(/-/g,"\/"));
            //console.log(vStartTime);
            //console.log(str);
            var year = date.getFullYear(), month = date.getMonth(),date = date.getDate();// month=6表示7月,下表从0开始结算。
            var dt = new Date(year,month,date);
            var weekDay = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
            if(d==0){
              weekDay[dt.getDay()]='今天';
            }
            if(d==1){
              weekDay[dt.getDay()]='明天';
            }
            if(d==2){
              weekDay[dt.getDay()]='后天';
            }
            if(dayInfos){
              // console.log(str)
              // console.log(vStartTime)
              // console.log(str<vStartTime)
              if(str<vStartTime){
                console.log('111')
                  DateInfos_new_array[dayInfos]={};             //轮播页面  日期轮播功能数据   king
                  DateInfos_new_array[dayInfos][h]={};

                  DateInfos_new_array[dayInfos][h]['day'] = weekDay[dt.getDay()];
                  DateInfos_new_array[dayInfos][h]['date'] = date1;
                  DateInfos_new_array[dayInfos][h]['hd'] = date2;
                  DateInfos_new_array[dayInfos][h]['fdate'] = date3;
                  movielist.ddate = da;

                  if(!DataPlans_new_array[dayInfos]){
                      DataPlans_new_array[dayInfos]={};         //  场次数据  king
                  }
                  if(!DataPlans_new_array[dayInfos][h]){
                      DataPlans_new_array[dayInfos][h]={};
                  }
                  if(!DataPlans_new_array[dayInfos][h][key]){
                      DataPlans_new_array[dayInfos][h][key]={};
                  }
/*                  DataPlans_new_array[dayInfos]={};
                  DataPlans_new_array[dayInfos][h]={};
DataPlans_new_array[dayInfos][h][key]={};*/
                  DataPlans_new_array[dayInfos][h][key]['zdate'] = date1;
                  DataPlans_new_array[dayInfos][h][key]['zday'] = weekDay[dt.getDay()];
                  DataPlans_new_array[dayInfos][h][key]['stimes'] = HM;
                  DataPlans_new_array[dayInfos][h][key]['etimes'] = EDTM;
                  DataPlans_new_array[dayInfos][h][key]['movieid'] = film_id;
                  DataPlans_new_array[dayInfos][h][key]['price'] = plan.resl[key].price;

                  DataPlans_new_array[dayInfos][h][key]['hallname'] = plan.resl[key].hallName;
                   //
                  DataPlans_new_array[dayInfos][h][key]['language'] = plan.resl[key].language;
                  DataPlans_new_array[dayInfos][h][key]['planId'] = plan.resl[key].planId;
                  DataPlans_new_array[dayInfos][h][key]['id'] = plan.resl[key].movieId;
                  var screenType = plan.resl[key].screenType;
                  DataPlans_new_array[dayInfos][h][key]['screenType'] = screenType;

                  if(screenType){
                    DataPlans_new_array[dayInfos][h][key]['screenType'] = screenType.toUpperCase();
                  }

                  DataPlans_new_array[dayInfos][h][key]['data'] = plan.resl[key];
                  DataPlans_new_array[dayInfos][h][key]['h'] = h;

                  //break;

                }

            }//console.log(DataPlans_new_array);
          }

        }

        movielist.resl1=plan.resl;
        movielist.plans_date = DateInfos_new_array;    ///轮播页面  日期轮播功能数据
        movielist.plans = DataPlans_new_array;      //场次具体数据
        //console.log(DataPlans_new_array);
        //console.log(DateInfos_new_array)
        //console.log(plan.resl);
        res.json(movielist);
          //console.log(plan.resl)
      })
    })
    .catch(next);
});
export default router;
