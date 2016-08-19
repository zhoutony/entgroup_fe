
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
          //console.log(data)
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
function init(){
    data_Handle()
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

$(".seat_body_ul_R_a").on("touchstart","li[data_text='1']",function(){
   var iScroll_left = myScroll.x;
    var pageX = $(this).position().left,
        pageY = $(this).position().top;
    var type_id=$('.seat_zuo_list').find('li');
    var row_li = $(this).attr('row'),
        col_li = $(this).attr('col'),
        ids_li = $(this).attr('page_id');
    var si = 0;

     //判断是缩是放
     // suo_xiao(2,iScroll_left,pageX,pageY)
    //判断是取消座位 还是选中
     if($(this).attr('data_type')==1){
      //判断是否隔行
        //var thes = new Array(row=row_li,col=col_li);
        /***
      选座规则
      1.左如果是墙||右如果是墙 then 可以选定
      2.左如果是实||右如果是实 then 可以选定
      3.向左步进N步，N=>2,遇到实座或墙停止，并统计步进的步数是否=>2，如果是则第一个条件成立
      3.向右步进N步，N=>2,遇到实座或墙停止，并统计步进的步数是否=>2，如果是则第二个条件成立
      4.第一个条件 && 第二个条件 都成立，则此座可以选
      Y_S    Y_X  G_D

      **/
      //console.log(thes)

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
        ppp++;
        for(var i=indes;i<=0;i--){
          if($rew.find('li').eq(i).hasClass('Y_S')||$rew.find('li').eq(i).hasClass('G_D')||$rew.find('li').eq(i).hasClass('Y_X')) {
            break;
          }else{
            Array_text_left--;
          }

        }
        for(var t=indes;t<=aaa[1];t++){

          if($rew.find('li').eq(t).hasClass('Y_S')||$rew.find('li').eq(t).hasClass('G_D')||$rew.find('li').eq(t).hasClass('Y_X')) {
            break;

          }else{
            Array_text_riht++;
          }

        }
         /***鼎新情侣座****/
        var lovers1 = $(this).attr('pairvalue');
        $(".seat_B_ul_R_list li").each(function(key){
          var obj_id = $(this),
            t_tt= obj_id.attr('pairvalue');
            if(t_tt==lovers1){
              var ids_li2 = obj_id.attr("pade_id");
              //var ids_li2 = obj_id['context']['attributes'][0]['value'];
              obj_id.addClass('Y_X');
              obj_id.attr('data_type','0');
              text_Arry.push(ids_li2);
              //alls.push(thes);
              if(si == 0){
                ppp=$(".Seat_foot_top_ul li").length;
                var padeId = '';
                var padeId_len =  Array_huo.length;
                for(var yu = 0; yu < padeId_len;yu++){
                  if(Array_huo[yu]==yin_huo[0]&&data_id=='2204'&&re_count<50){
                    padeId=1;
                  }else{
                    padeId=0;
                  }

                }
                //alert(str);
                if(padeId==0){
                  if(ppp<4){
                    if(!obj_id.attr('name')){
                      text_Seat='<li pade_id="'+ids_li2+'" pairvalue="'+lovers1+'" title="'+obj_id.attr('name')+'-'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座" type_id="1">'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座</li>';
                    }else{
                      text_Seat='<li pade_id="'+ids_li2+'" pairvalue="'+lovers1+'-'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座" type_id="1">'+obj_id.attr('name')+'-'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座</li>';
                    }

                    //alert(seatStrCn[ppp]);
                    $(text_Seat).appendTo('.Seat_foot_top_ul ');

                    initFilmTopFun(ppp);
                  ppp=$(".Seat_foot_top_ul li").length;
                  }else{
                      $('.POP_UP_divw_bosa span').html('您最多只能购买4张票');
                       $('.POP_UP_divw').animate({'top':'0em'},1000,function(){
                        $('.POP_UP_divw').animate({'top':'-2rem'},1000);

                        $(".Seat_foot_top_ul li").each(function(){
                          if($(this).attr("pairvalue") == lovers1){
                            $(this).remove();
                            ppp=$(".Seat_foot_top_ul li").length;
                          }

                        })
                        $(".seat_B_ul_R_list li").each(function(key){
                           var t_tt= $(this).attr('pairvalue');

                            if(t_tt==lovers1){

                              var ids_li2 = $(this)['context']['attributes'][0]['value'];
                              $(this).removeClass('Y_X');
                              $(this).attr('data_type','1');
                              text_Arry.splice($.inArray(ids_li2, text_Arry),1);
                              //alls.splice($.inArray(thes, alls),1);
                              ppp=$(".Seat_foot_top_ul li").length;
                              initFilmTopFun(ppp);
                            }
                        })
                      })
                    ppp=4;
                    return false;
                  }
                }else{
                  if(str>'2016-6-29 23:59:59'&&str<'2016-7-04 00:00:01'){
                    if(ppp<2){
                      if(!obj_id.attr('name')){
                        text_Seat='<li pade_id="'+ids_li2+'" pairvalue="'+lovers1+'" title="'+obj_id.attr('name')+'-'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座" type_id="1">'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座</li>';
                      }else{
                        text_Seat='<li pade_id="'+ids_li2+'" pairvalue="'+lovers1+'-'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座" type_id="1">'+obj_id.attr('name')+'-'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座</li>';
                      }

                      //alert(seatStrCn[ppp]);
                      $(text_Seat).appendTo('.Seat_foot_top_ul ');

                      initFilmTopFun(ppp);
                    ppp=$(".Seat_foot_top_ul li").length;
                    }else{
                        $('.POP_UP_divw_bosa span').html('您最多只能购买2张票');
                         $('.POP_UP_divw').animate({'top':'0em'},1000,function(){
                          $('.POP_UP_divw').animate({'top':'-2rem'},1000);

                          $(".Seat_foot_top_ul li").each(function(){
                            if($(this).attr("pairvalue") == lovers1){
                              $(this).remove();
                              ppp=$(".Seat_foot_top_ul li").length;
                            }

                          })
                          $(".seat_B_ul_R_list li").each(function(key){
                             var t_tt= $(this).attr('pairvalue');

                              if(t_tt==lovers1){

                                var ids_li2 = $(this)['context']['attributes'][0]['value'];
                                $(this).removeClass('Y_X');
                                $(this).attr('data_type','1');
                                text_Arry.splice($.inArray(ids_li2, text_Arry),1);
                                //alls.splice($.inArray(thes, alls),1);
                                ppp=$(".Seat_foot_top_ul li").length;
                                initFilmTopFun(ppp);
                              }
                          })
                        })
                      ppp=2;
                      return false;
                    }
                  }else{
                    if(ppp<4){
                      if(!obj_id.attr('name')){
                        text_Seat='<li pade_id="'+ids_li2+'" pairvalue="'+lovers1+'" title="'+obj_id.attr('name')+'-'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座" type_id="1">'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座</li>';
                      }else{
                        text_Seat='<li pade_id="'+ids_li2+'" pairvalue="'+lovers1+'-'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座" type_id="1">'+obj_id.attr('name')+'-'+obj_id.attr('row')+'排'+obj_id.attr('col')+'座</li>';
                      }

                      //alert(seatStrCn[ppp]);
                      $(text_Seat).appendTo('.Seat_foot_top_ul ');

                      initFilmTopFun(ppp);
                    ppp=$(".Seat_foot_top_ul li").length;
                    }else{
                        $('.POP_UP_divw_bosa span').html('您最多只能购买4张票');
                         $('.POP_UP_divw').animate({'top':'0em'},1000,function(){
                          $('.POP_UP_divw').animate({'top':'-2rem'},1000);

                          $(".Seat_foot_top_ul li").each(function(){
                            if($(this).attr("pairvalue") == lovers1){
                              $(this).remove();
                              ppp=$(".Seat_foot_top_ul li").length;
                            }

                          })
                          $(".seat_B_ul_R_list li").each(function(key){
                             var t_tt= $(this).attr('pairvalue');

                              if(t_tt==lovers1){

                                var ids_li2 = $(this)['context']['attributes'][0]['value'];
                                $(this).removeClass('Y_X');
                                $(this).attr('data_type','1');
                                text_Arry.splice($.inArray(ids_li2, text_Arry),1);
                                //alls.splice($.inArray(thes, alls),1);
                                ppp=$(".Seat_foot_top_ul li").length;
                                initFilmTopFun(ppp);
                              }
                          })
                        })
                      ppp=4;
                      return false;
                    }
                  }
                }
              }

            }else{

              if(!n_this.hasClass('Y_X')&&nn_this.hasClass('Y_X')||!p_this.hasClass('Y_X')&&pp_this.hasClass('Y_X')){
                $('.POP_UP_divw_bosa span').html('请不要留下单独空座！');
                   $('.POP_UP_divw').animate({'top':'0em'},1000,function(){
                    $('.POP_UP_divw').animate({'top':'-2rem'},1000);
                    yuguu.removeClass('Y_X');
                    yuguu.attr('data_type','1');

                  })
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
                  $('.POP_UP_divw_bosa span').html('请不要留下单独空座！');
                   $('.POP_UP_divw').animate({'top':'0em'},1000,function(){
                    $('.POP_UP_divw').animate({'top':'-2rem'},1000);
                    yuguu.removeClass('Y_X');
                    yuguu.attr('data_type','1');
                    if(ppp>0){
                    ppp--;
                    //console.log(ppp+'a2');
                   }
                  })
                    //ShowMsg('提示框','左面或右面不能留空位',true,false);
                    return false;
                  }
                }
            }else{

              if( !$(this).hasClass('Y_X') ){
                //ShowMsg('提示框','左面或右面不能留空位',true,false);
                $('.POP_UP_divw_bosa span').html('请不要留下单独空座！');
                 $('.POP_UP_divw').animate({'top':'0em'},1000,function(){
                  $('.POP_UP_divw').animate({'top':'-2rem'},1000);
                  yuguu.removeClass('Y_X');
                  yuguu.attr('data_type','1');
                  if(ppp>0){
                    ppp--;
                    //console.log(ppp+'a3');
                   }
                })
                return false;
              }
            }
            }

          })














     }

  })

}

function suo_xiao(zommsd,iScroll_left,tetes1,tets2){
  if(zommsd==1){

    ppp=$(".Seat_foot_top_ul li").length;

      var Btn_true_false = $('.Seat_foot_bottom_right').is('.btn_bottoma');

      if(ppp==0&&Btn_true_false==false){
        $('.Seat_foot_bottom_right').removeClass('btn_bottoma');
        var totalPrice = '0.00元';
        $('.p_text1').html(totalPrice);
      }else{
        var totalPrice = '支付'+(seatPrice * ppp).toFixed(2)+'元';
        $('.p_text1').html(totalPrice);
      }



    //$('.Seat_Flim_top_b1_a1 p').show().siblings('.seat_zuo_list').hide();

    zoom = false;
    setTimeout(function(){
      $( ".seat_body_ul_R_a" ).css({
        "-webkit-transition" : "all 1s ease",
        "-webkit-transform" : "scale(1)"
      })
      var width = right_width/2,
          height =  (right_height)/2+20;
      $( ".seat_body_ul_R" ).css({
        'width' : width,
        'height' : height
      })
      $( "#wrapper" ).css({
        'width' : "100%",
        'height' : height
      })
      setTimeout(function(){myScroll.refresh(); },500);
      //点击座位图还原XY坐标
      myScroll.scrollTo(tetes1,tets2-14,1000);


    },100)
  }else{
      if( !zoom ){
      zoom = true;
      $( ".seat_body_ul_R_a" ).css({
        "-webkit-transition" : "all 0s ease",
        "-webkit-transform-origin-x" : "0px",
        "-webkit-transform-origin-y": "0px"
      });


      setTimeout(function(){
        $( ".seat_body_ul_R_a" ).css({
          "-webkit-transition" : "all 1s ease",
          "-webkit-transform" : "scale(2)"
        })
        $( ".seat_body_ul_R" ).css({
          "-webkit-transition" : "all 0s ease",
          "-webkit-transform-origin-x" : "0px",
          "-webkit-transform-origin-y": "0px",
        'width':(text_lis+2)*1.2+'em'
        });
        var width = right_width,
          height =  right_height+20;
        $( ".seat_body_ul_R" ).css({
          'width' : width,
          'height' : height
        })
        $( "#wrapper" ).css({
          'width' : "100%",
          'height' : height/2
        })

        myScroll.refresh();
        //点击座位图定XY坐标

        myScroll.scrollTo(-tetes1+iScroll_left-20,-tets2-14,1000);

      },100)
    }

  }
}
