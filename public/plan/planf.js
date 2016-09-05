
import $ from 'jquery';
import iscroll from "./iscroll.js";
/*var jQuery =$;*/
import jgestures from "./jgestures.js";
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

          init();

        }
      });

//init()初始化滑动插件gomes
 var ppp=0;
 var myScroll;
 var zoom = false;
 var seatPrice = 10;
 var right_width =1;
 var right_height =1;
function init(){
    data_Handle()
  var ley = $('.seat_B_ul_R_list').eq(0).find('li').length,//一行的座位数
      cow = $('.text_list').find('li').length; //总行数
      ley = parseInt(ley);
      cow = parseInt(cow);

  //父元素宽高赋值
  $('.seat_body_ul_R_a').css({
    'width':(ley+2)*1.2+'rem',
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

  click_Seat();

}

//data_Handle(); 渲染座位图
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

/*console.log(text_FLims)
console.log(text_FLims1)*/
  $(text_FLims).appendTo($('.seat_body_ul_R_a'));
  $(text_FLims1).appendTo($('.text_list'));

  //
}
 //click_Seat(); 点击选座功能开发
function click_Seat(){
   var text_Seat='',
       text_Arry=new Array(),
       alls = new Array();

  //点击事件   判断手势
//单击事件gomes
  $('.seat_body_ul_R_a li[data_text="1"]').bind('touchstart',function(){
    right_width = $( ".seat_body_ul_R" ).width()*2;
    right_height =  $( ".seat_body_ul_R" ).height()*2;
    var iScroll_left = myScroll.x;
    var textkk =false;
    if(!textkk){
    var pageX = $(this).position().left,
    pageY = $(this).position().top;
    var type_id=$('.Seat_foot_top_ul').find('li');
    var row_li = $(this).attr('row'),
    col_li = $(this).attr('col'),
    ids_li = $(this).attr('page_id');
    var si = 0;
    $(".Seat_foot_bottom_left_h3").hide();
    $(".Seat_foot_bottom_left_text").show();

    $('.Seat_foot_bottom_right').addClass('Seat_foot_bottom_righta');
    //判断是缩是放
    suo_xiao(2,iScroll_left,pageX,pageY)
    //判断是取消座位 还是选中
    if($(this).attr('data_type')==1){

      //判断是否隔行
    var thes = new Array();
        thes.row=row_li;
        thes.col=col_li;

      /***
      选座规则
      1.左如果是墙||右如果是墙 then 可以选定
      2.左如果是实||右如果是实 then 可以选定
      3.向左步进N步，N=>2,遇到实座或墙停止，并统计步进的步数是否=>2，如果是则第一个条件成立
      3.向右步进N步，N=>2,遇到实座或墙停止，并统计步进的步数是否=>2，如果是则第二个条件成立
      4.第一个条件 && 第二个条件 都成立，则此座可以选
      Y_S    Y_X  G_D

      **/
      //判断左面不能空位子
      var indes = $(this).index(),
        yuguu= $(this),
        $rew = $(this).parents('ul'),
        p_this = $rew.find('li').eq(indes+1),
        pp_this = $rew.find('li').eq(indes+2),
        n_this = $rew.find('li').eq(indes-1),
        nn_this = $rew.find('li').eq(indes-2),
        Array_text_left=indes,
        Array_text_riht=0;



        if(!n_this.hasClass('Y_X')&&nn_this.hasClass('Y_X')||!p_this.hasClass('Y_X')&&pp_this.hasClass('Y_X')){
          alert('请不要留下单独空座！');
          yuguu.removeClass('Y_X');
          yuguu.attr('data_type','1');
          $(".Seat_foot_top_ul li").each(function(){
            if($(this).attr("pade_id") == ids_li){
              $(this).remove();
              si++;
            }

          })
          if(ppp==4){
            return false;
          }
          if(ppp>0){
            ppp=$(".Seat_foot_top_ul li").length;
            //console.log(ppp+'a1');
            return false;
          }

        }
        $(this).addClass('Y_X');
        $(this).attr('data_type','0');
        text_Arry.push(ids_li);
        alls.push(thes);
        ppp++;

        for(var i=indes;i<=0;i--){
          if($rew.find('li').eq(i).hasClass('Y_S')||$rew.find('li').eq(i).hasClass('G_D')||$rew.find('li').eq(i).hasClass('Y_X')) {
            break;
          }else{
            Array_text_left--;
          }

        }
        for(var t=indes;t<=Arrays[0];t++){

          if($rew.find('li').eq(t).hasClass('Y_S')||$rew.find('li').eq(t).hasClass('G_D')||$rew.find('li').eq(t).hasClass('Y_X')) {
            break;

          }else{
            Array_text_riht++;
          }

        }

        if(Array_text_riht>=2||Array_text_left>=2){
          if(
            p_this.hasClass('Y_S')||
            p_this.hasClass('Y_X')||
            p_this.hasClass('G_D')||
            n_this.hasClass('G_D')||
            n_this.hasClass('Y_S')||
            n_this.hasClass('Y_X')||
            (n_this.hasClass('G_D')&&
              (p_this.hasClass('Y_S')||
              p_this.hasClass('Y_X')||
              p_this.hasClass('G_D')
              ))||
            (n_this.hasClass('Y_X')&&
              (p_this.hasClass('Y_S')||
              p_this.hasClass('Y_X')||
              p_this.hasClass('G_D')
              ))||
            (n_this.hasClass('Y_S')&&
              (p_this.hasClass('Y_S')||
              p_this.hasClass('Y_X')||
              p_this.hasClass('G_D')
              ))||
            (p_this.hasClass('G_D')&&
              (n_this.hasClass('Y_S')||
              n_this.hasClass('Y_X')||
              n_this.hasClass('G_D')
              ))||
            (p_this.hasClass('Y_X')&&
              (n_this.hasClass('Y_S')||
              n_this.hasClass('Y_X')||
              n_this.hasClass('G_D')
              ))||
            (p_this.hasClass('Y_S')&&
              (n_this.hasClass('Y_S')||
              n_this.hasClass('Y_X')||
              n_this.hasClass('G_D')
              ))

          ){


          }else{
             if(
             !pp_this.hasClass('Y_X')&&
             !pp_this.hasClass('Y_S')&&
             !pp_this.hasClass('G_D')&&
             !nn_this.hasClass('Y_X')&&
             !nn_this.hasClass('Y_S')&&
             !nn_this.hasClass('G_D')
             ){

            }else{
            alert('请不要留下单独空座！');

              yuguu.removeClass('Y_X');
              yuguu.attr('data_type','1');
              if(ppp>0){
              ppp--;
              //console.log(ppp+'a2');
             }

              //ShowMsg('提示框','左面或右面不能留空位',true,false);
              return false;
            }
          }
      }else{

        if( !$(this).hasClass('Y_X') ){
          //ShowMsg('提示框','左面或右面不能留空位',true,false);
          alert('请不要留下单独空座！');

            yuguu.removeClass('Y_X');
            yuguu.attr('data_type','1');
            if(ppp>0){
              ppp--;
              //console.log(ppp+'a3');
             }

          return false;
        }
      }

    }else{
      var yuguu = $(this),
        thid_yry = $(this).hasClass('Y_X'),
        index_s = yuguu.index(),
        f_yuguu = yuguu.parents('ul'),
        z_yuguu = f_yuguu.find('li').eq(index_s-1),
        y_yuguu = f_yuguu.find('li').eq(index_s+1),
        pade_id = y_yuguu.attr('page_id');
      if(thid_yry){
        //点击座位当前座位的左右同时选定的话取消右面的座位
        if(z_yuguu.hasClass('Y_X')&&y_yuguu.hasClass('Y_X')||z_yuguu.hasClass('G_D')||z_yuguu.hasClass('Y_S')){
          y_yuguu.removeClass('Y_X');
          y_yuguu.attr('data_type','1');
          $(".Seat_foot_top_ul li").each(function(){
            if($(this).attr("pade_id") == pade_id){
              $(this).remove();
              si++;

            }
          })
          alert('为避免空位！已关联取消右侧座位！');
            yuguu.removeClass('Y_X');
            yuguu.attr('data_type','1');
             if(ppp>0){
              ppp--;
              //console.log(ppp+'a4');
             }else if(ppp==0){
              ppp=0 ;
             }


        }

        $(".Seat_foot_top_ul li").each(function(){
            if($(this).attr("pade_id") == ids_li){
              $(this).remove();
              si++;
              if(ppp>0){
              ppp=$(".Seat_foot_top_ul li").length;
              //console.log(ppp+'a5');
             }
            }

          })
            yuguu.removeClass('Y_X');
            yuguu.attr('data_type','1');
      }
      if(ppp==0){
        suo_xiao(1,iScroll_left,0,0);
      }

      text_Arry.splice($.inArray(ids_li, text_Arry),1);
      alls.splice($.inArray(thes, alls),1);
    }


    if(si == 0){
      ppp=$(".Seat_foot_top_ul li").length;
      if(ppp<4){
        text_Seat='<li pade_id="'+ids_li+'" pairvalue="'+ids_li+'" type_id="1">'+row_li+'排'+col_li+'列</li>';
        $(text_Seat).appendTo('.Seat_foot_top_ul ');
        initFilmTopFun(ppp);
      }else{
          alert('您最多只能购买4张票');

            yuguu.removeClass('Y_X');
            yuguu.attr('data_type','1');

        ppp=4;
        return false;
      }
    }
    //价格改变gomes
    ppp=$(".Seat_foot_top_ul li").length
    var totalPrice = '￥'+(seatPrice * ppp).toFixed(0);
      $('.p_text1').text(totalPrice);
      var text = '￥'+seatPrice+'*'+ppp
      $('.p_text2').text(text);
  }

  })

}

function suo_xiao(zommsd,iScroll_left,tetes1,tets2){
  if(zommsd==1){

    ppp=$(".Seat_foot_top_ul li").length;

      var Btn_true_false = $('.Seat_foot_bottom_right').is('.Seat_foot_bottom_righta');

      if(ppp==0&&Btn_true_false==false){
      $(".Seat_foot_bottom_left_h3").hide();
       $(".Seat_foot_bottom_left_text").show();
        $('.Seat_foot_bottom_right').removeClass('Seat_foot_bottom_righta');
        var totalPrice = '0.00元';
        $('.p_text1').html(totalPrice);
      }else{
        $(".Seat_foot_bottom_left_h3").show();
        $(".Seat_foot_bottom_left_text").hide();
        var totalPrice = '支付'+(seatPrice * ppp).toFixed(2)+'元';
        $('.p_text1').html(totalPrice);
      }


       var ley = $('.seat_B_ul_R_list').eq(0).find('li').length;
    //$('.Seat_Flim_top_b1_a1 p').show().siblings('.Seat_foot_top_ul').hide();

    zoom = false;
    setTimeout(function(){
      $( ".seat_body_ul_R" ).css({
        "-webkit-transition" : "all 1s ease",
        "-webkit-transform" : "scale(1)"
      })
      var width = xian_arrar[0]*1.2+'rem',
          height = xian_arrar[1]*1.2+'rem';
      $( ".seat_body_ul_R" ).css({
        'width' : width,
        'height' : height
      })
     var ley = $('.seat_B_ul_R_list').eq(0).find('li').length,//一行的座位数
      cow = $('.text_list').find('li').length; //总行数
      ley = parseInt(ley)+2;
      cow = parseInt(cow);

  //父元素宽高赋值
  $('.seat_body_ul_R_a').css({
    'width':ley*1.2+'rem',
    'height':cow*1.2+'rem'
    });
     /* $( "#wrapper" ).css({
        'width' : "100%",
        'height' : height
      })*/
      setTimeout(function(){myScroll.refresh(); },500);
      //点击座位图还原XY坐标
      myScroll.scrollTo(tetes1,tets2-14,1000);


    },100)
  }else{
      if( !zoom ){
      zoom = true;
      $( ".seat_body_ul_R" ).css({
        "-webkit-transition" : "all 0s ease",
        "-webkit-transform-origin-x" : "0px",
        "-webkit-transform-origin-y": "0px"
      });


      setTimeout(function(){
        $( ".seat_body_ul_R" ).css({
          "-webkit-transition" : "all 1s ease",
          "-webkit-transform" : "scale(2)"
        })

        var width = (xian_arrar[0]+2)*1.2*2+'rem',
          height = xian_arrar[1]*1.2*2+'rem';

        $( ".seat_body_ul_R" ).css({
          'width' : width,
          'height' : height
        })
       var ley = $('.seat_B_ul_R_list').eq(0).find('li').length,//一行的座位数
        cow = $('.text_list').find('li').length; //总行数
        ley = parseInt(ley)+5;
        cow = parseInt(cow);

    //父元素宽高赋值
    $('.seat_body_ul_R_a').css({
      'width':ley*1.2+'rem',
      'height':cow*2.6+'rem'
      });

        myScroll.refresh();
        //点击座位图定XY坐标

        myScroll.scrollTo(-tetes1+iScroll_left-20,-tets2-14,0);

      },100)
    }

  }
}

//初始化点击事件 gomes
var tegb= 0;
function initFilmTopFun(ppp){
  var iScroll_left = myScroll.x;
  tegb++;
  $('.Seat_foot_top_ul li').on('touchstart',function(){
    var lovers1 = $(this).attr('pairvalue');
    var pade_id = $(this).attr('pade_id');
    var lisd_len = $('.Seat_foot_top_ul').find('li').length;
    $('.Seat_foot_top_ul li').each(function(){
      if($(this).attr("pairvalue") == lovers1){
        $(this).remove();
      }
    })

      $('.seat_B_ul_R_list li').each(function(){

        if($(this).attr('pairvalue')==lovers1){
          $(this).removeClass('Y_X');
          $(this).attr('data_type','1');
          var index = $(this).index();
          console.log(index)

          ppp=$('.Seat_foot_top_ul li').length;
        }else{
          if($(this).attr('page_id')==pade_id){

            $(this).removeClass('Y_X');
            $(this).attr('data_type','1');
            if(tegb==1){
              ppp=lisd_len-1;
            }else{
              ppp=lisd_len;

            }

            //价格改变gomes
          }
        }


      if(ppp==0){
        $(".Seat_foot_bottom_left_h3").show();
        $(".Seat_foot_bottom_left_text").hide();
        $('.Seat_foot_bottom_right').removeClass('Seat_foot_bottom_righta');
        var totalPrice = "￥0";
        $('.p_text1').html(totalPrice);
        var text = '￥'+seatPrice+'*'+ppp
        $('.p_text2').text(text);
         suo_xiao(1,iScroll_left,0,0);
      }else{
        $(".Seat_foot_bottom_left_h3").hide();
         $(".Seat_foot_bottom_left_text").show();
        var totalPrice = '￥'+(seatPrice * ppp).toFixed(0);
        $('.p_text1').html(totalPrice);
         var text = '￥'+seatPrice+'*'+ppp
        $('.p_text2').text(text);
      }


      })




  })
}



