
import $ from 'jquery';
import iscroll from "./iscroll.js";
/*var jQuery =$;
import jgestures from "./jgestures.js";*/
  var Pid = $('#Pid').val(),
    mov_id = $('#Movieid').val(),//
    Arrays = new Array(),
    xian_arrar = new Array(),
    //Array_huo =[], //活动数组
   // yin_huo = [], //单个影片活动
    cntArr= [],
    data_id = [];
    //re_count = [];//活动张数计算
    $.ajax({
      　　 url:"/plan/selectSeatseat",
      　　 type:"get",
          async:false,
      　　 dataType:'json',
      　　 data:{'pid':Pid,'id':mov_id},
      　　 success:function(data){
          Arrays.push(data);
          cntArr=data.TSeatNo;
          console.log(data)
          //yin_huo.push(data.cinema_name);
          data_id.push(data.id);
          //re_count.push(data.re_count);
          //Array_huo=data.ycarray;
          xian_arrar.push(data.col)
          xian_arrar.push(data.num)
        }
      });

//初始化滑动插件gomes
 var myScroll;
function init(){
    data_Handle();
  var ley = $('.seat_B_ul_R_list').eq(0).find('li').length,//一行的座位数
      cow = $('.text_list').find('li').length; //总行数
      ley = parseInt(ley)+2;
      cow = parseInt(cow);

  //父元素宽高赋值
  $('.seat_body_ul_R_a').css({
    'width':ley*1.2+'rem',
    'height':cow*1.2+'rem'
    });
//中间线位置计算gomes
  if(ley%2==1){
    $('.horizontal').css({
      'left':((ley+1)/2*1.2)+'rem'
    })
  }else{
    $('.horizontal').css({
      'left':(ley/2*1.2)+'rem'
    })

  }
   myScroll = new iscroll('#wrapper',{
    scrollX: true,
    scrollY: true,
    mouseWheel: true,
    resizeScrollbars:true
  });

}
init();

function data_Handle(){
  var seatNo = 0,
    text_FLims='',
    text_FLims1='',
    leftDiv = new Array(),
    leftI = 1,
    leftN = 0;

  for(var i=1;i<=Arrays[0].num;i++){
    text_FLims+="<ul class='seat_B_ul_R_list'><li class='G_D'></li>";
    var Sequence = 1;
    for(var t=1;t<=Arrays[0].col;t++){

      var seat = '';
      seat=Arrays[0].seat[i][t];
     /*console.log(seat)
     console.log(seat.id)
      return false;*/

      if(seat.type == 'road'){
        //走廊
        text_FLims+="<li class='G_D'></li>";

      }else{
          //未订座
        var cntNms = 0;
        for(var key in cntArr[0]){
          if(cntArr[0][key] == seat.id){
            cntNms++;
          }
        }

        if(cntNms != 0) {
          text_FLims+="<li class='Y_S'></li>";
          Sequence++;

        }else{
          if(!seat.name){
            text_FLims+="<li page_id='"+seat.id+"' row='"+seat.row+"' col='"+seat.col+"'  class='K_X' data_type='1' pairValue='"+seat.pairValue+"' data_text='1'></li>";
          }else{
            text_FLims+="<li page_id='"+seat.id+"' row='"+seat.row+"' col='"+seat.col+"' name='"+seat.name+"' class='K_X' data_type='1' pairValue='"+seat.pairValue+"' data_text='1'></li>";
          }

          leftN++;
          Sequence++;

        }
      }

    }
    if(leftN != 0){
      leftDiv.push(i);
      text_FLims1+="<li>"+leftI+'</li>';
      leftI++;
      leftN=0;
    }else{
      text_FLims1+='<li class="hide_li"></li>';
    }
    text_FLims+="<li class='G_D' ></li></ul>";

  }



  text_FLims1+='<li class="hide_li"></li>';
  var ttttt = "";
  for(var i = 0; i < leftDiv.length; i++){
    ttttt += leftDiv[i]  ;
  }

console.log(text_FLims)
console.log(text_FLims1)
  $(text_FLims).appendTo($('.seat_body_ul_R_a'));
  $(text_FLims1).appendTo($('.text_list'));

}
