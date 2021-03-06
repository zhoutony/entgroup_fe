import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//座位图页面-------------------------------king   2016-8-15-------------------------
router.get('/selectSeat', (req, res, next) => {
   var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  var pid=req.query.pid;
  var id=req.query.id;
  var yc=req.query.yc;
    fetch(api_url+`movie/getmovielist?cinemaID=`+cinemaid)
  //fetch(api_url+`act_index/querySeatStatus?showtimeId=`+pid)
    .then(response => response.json())
    .then(movie =>{

      fetch(api_url+`cplan/getplanlist?cinemaID=`+cinemaid+`&MovieID=`+id)   //  读取场次列表
          .then(response => response.json())
          .then(plan =>{
              for(var i=0;i<movie.resl.length;i++){         //取出当前影片的影片信息
                  if(movie.resl[i]['movieid']==id){
                    movie.resl=movie.resl[i];

                  }
              }
              for(var i=0;i<plan.resl.length;i++){         //取出当前影片的当前场次的具体信息
                  if(plan.resl[i]['planId']==pid){
                    plan.resl=plan.resl[i];
                    //console.log(movie.resl)
                  }
              }
              var date =  new Date(plan.resl.startTime);   //开长时间
              var time = (date.getMonth()+1)+"月"+date.getDate()+"日"+date.getHours()+":"+date.getMinutes();   //开始时间几月几号
              var mydate = new Date();        //当前时间
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
              var Ftime = weekDay[dt.getDay()]+time;
              //console.log(plan.resl)
              res.render('plan/Seat', { movie:movie.resl['movienamecn'] ,plan:plan.resl,Ftime:Ftime, foot_on_1:'_on' })
          })
  })


    .catch(next);
});

router.get('/selectSeatseat', (req, res, next) => {         //读取座位图   详细信息
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  var cinemaname=req.session.cinemaname;      //影院name 的session 读取
  //var system_id = req.session.entInits;
  var system_id = 1;
  var pid=req.query.pid;

  fetch(api_url+`act_index/querySeatStatus?showtimeId=`+pid)  //读取座位图信息
  //fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)

    .then(response => response.json())

    .then(seat =>{
      //console.log(seat);
      //console.log(system_id);
      var Seat_array={};  //定义座位图数据新数组
      var seatCnt = {};
      var i = 0;
      //console.log(system_id);
      if(system_id==1||system_id==2){
        //console.log(seat.data);
          for(var key in seat.data){
                //console.log(seat.data[key]['seatrow']);return false;
                //console.log(seat.data[key].seatcoordx);
                if(!Seat_array[seat.data[key].seatrow]){
                      Seat_array[seat.data[key].seatrow]={};         //
                  }
                  if(!Seat_array[seat.data[key].seatrow][seat.data[key].seatcolumn]){
                      Seat_array[seat.data[key].seatrow][seat.data[key].seatcolumn]={};         //
                  }

                Seat_array[seat.data[key].seatrow][seat.data[key].seatcolumn]['id']=seat.data[key].externalseatid;          //座位id
                Seat_array[seat.data[key].seatrow][seat.data[key].seatcolumn]['row']=seat.data[key].seatrow;          //座位X轴
                Seat_array[seat.data[key].seatrow][seat.data[key].seatcolumn]['col']=seat.data[key].seatcolumn;          //座位Y轴
                Seat_array[seat.data[key].seatrow][seat.data[key].seatcolumn]['status']=seat.data[key].seatstatus;          //座位状态  1可用    0不可用
                Seat_array[seat.data[key].seatrow][seat.data[key].seatcolumn]['type']=seat.data[key].seattype;
                if(system_id==1){
                  //console.log(seat.data[key].externalseatid);
                    if(seat.data[key].loveseats!=null){
                        Seat_array[seat.data[key].seatrow][seat.data[key].seatcolumn]['pairValue']=seat.data[key].loveseats;
                    }else{
                        Seat_array[seat.data[key].seatrow][seat.data[key].seatcolumn]['pairValue']=seat.data[key].externalseatid;
                    }
                }else{
                    Seat_array[seat.data[key].seatrow][seat.data[key].seatcolumn]['pairValue']=seat.data[key].externalseatid;
                }

                if(seat.data[key].seatstatus != 1){       //不可售座位图（已经售出的  是不可售座位图）
                  //seatCnt[i] =  "".$v['seatNo']."";
                  seatCnt[i] =  seat.data[key].externalseatid;
                  i++;
                }

          }
          //console.log(seatCnt);
      }
      console.log(Seat_array);
      var t = typeof Seat_array;      //  计算总行数
      if(t == 'object'){
        var n = 0;
        var ls = 0;
        for(var k in Seat_array){
            n++;

            var l = 0;
            for(var key in Seat_array[k]){
              l++;
            }
            if(l>ls){
              ls=l;
            }
        }
      }
      for(var key in Seat_array){           //row值开始
          var TempRows = key; break;
      }
      var TempCols = {};
      for(var key in Seat_array){           //cols值开始
        //console.log(k);
          for(var k in Seat_array[key]){

              TempCols[k] = k;

          }
      }
      for(var key in TempCols){         //cols值开始
          TempCols = key; break;
      }
      //console.log(Seat_array);
                                                            //座位图 数据处理      king   8月17
      var ResSeats = {};
      //console.log(n);
      for (var i = 1; i < n + 1; i++) {
          for (var j = 1; j < ls + 1; j++) {
              var ti = (Number(i) + Number(TempRows)) - 1 ;
              var tj = (Number(j) + Number(TempCols)) -1 ;
              //console.log(ti);
              //console.log(tj);
              //console.log('----------');
              var tSeat = Seat_array[ti][tj];
              if(tSeat){
                var row= Number(tSeat['row']);
              }

              //var status = Number(tSeat['status']);
              //console.log(tSeat);
              if(!ResSeats[i]){
                  ResSeats[i]={};
              }
              if(!ResSeats[i][j]){
                  ResSeats[i][j]={};
              }
              if(row==0||!tSeat){
                 ResSeats[i][j]['id'] = 0;
                 ResSeats[i][j]['row'] = ti;
                 ResSeats[i][j]['col'] = tj;
                 ResSeats[i][j]['status'] = 0;
                 ResSeats[i][j]['type'] = 'road';
              }else{
                 ResSeats[i][j]['id'] = tSeat['id'];
                 ResSeats[i][j]['row'] = tSeat['row'];
                 ResSeats[i][j]['col'] = tSeat['col'];
                 ResSeats[i][j]['pairValue'] = tSeat['pairValue'];
                 ResSeats[i][j]['status'] =tSeat['status'];
                 ResSeats[i][j]['type'] = tSeat['type'];
              }
          }
          //console.log(i);
          //console.log(ResSeats[i]);
      }
      //console.log(ResSeats);

      //var num = count(Seat_array);
      //console.log(Seat_array);
      seat.TSeatNo = seatCnt;     //不可售座位图
      seat.seat = ResSeats;   //全部座位图
      seat.num = n;     //总行数
      seat.col = ls;               //总列数
      seat.cals = ls+1;

      //console.log(seat);
      res.json(seat);
  })
})

/****锁座*****/
router.get('/SuoZuoSeatseat', (req, res, next) => {
  var cinemaid=req.session.cinemaid;      //影院id 的session 读取
  var UserId=req.session.userid;
  var channelName=req.session.cinemauser;
  var showTimeID=req.query.showTimeID;
  var movieID=req.query.movieID;
  var seatIds=req.query.seatIds;
  var buyCount=req.query.buyCount;
  var totalPrice=req.query.totalPrice;
  var seatNames=req.query.seatNames;
//console.log(movieID)
 var Win_url = 'showtimeid='+showTimeID+'&cinemaId='+cinemaid+'&seatIds='+seatIds+'&seatNames='+seatNames+'&userCity=1&channelName='+channelName+'&totalPrice='+totalPrice+'&buyCount='+buyCount+'&userId='+UserId+'&movieId='+movieID
 //console.log(Win_url)

 fetch(api_url+`/act_index/lockSeat?`+Win_url)
  //fetch(api_url+`act_index/querySeatStatus?showtimeId=`+pid)
    .then(response => response.json())
    .then(load_seat =>{
      console.log(load_seat)
       res.json(load_seat);
  })

});




export default router;
