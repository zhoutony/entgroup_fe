
import $ from 'jquery';
//ckOrdersSeat();
  var Pid = $('#Pid').val(),
    mov_id = $('#Movieid').val(),
    Arrays = new Array(),
    xian_arrar = new Array(),
    Array_huo =[],
    yin_huo = [],
    cntArr= [],
    data_id = [],
    re_count = [];
    $.ajax({
      　　 url:"/index.php?c=plan&a=selectSeatseat",
      　　 type:"get",
        async:false,
      　　 dataType:'json',
      　　 data:{'pid':Pid,'id':mov_id},
      　　 success:function(data){
          Arrays.push(data);
          cntArr=data.TSeatNo;
          //console.log(data)
          yin_huo.push(data.cinema_name);
          data_id.push(data.id);
          re_count.push(data.re_count);
          Array_huo=data.ycarray;
          xian_arrar.push(data.countOfColsk)
          xian_arrar.push(data.countOfColsy)
        }
      });

  var ppp=0;

  /* background:url(../images/seat/ping_m.jpg) no-repeat #ababab; */
//是否隔行选座  paddy
/*function ckInterBank(t, all){
  var t_row = t[0];
  var t_col = t[1];
  var z = 0;
  if(all.length > 0){
    $.each(all,function(n,v) {
      var assr = parseInt(v[0]);
      var assc = parseInt(v[1]);
      if(t_row == assr){
        if(assc-1 == t_col || assc+1 == t_col){
          z++;
        }
      }

      if(t_col == assc){
        if(assr-1 == t_row || assr+1 == t_row){
          z++;
        }
      }
    });
    if(z > 0){
      return true;
    }else{
      return false;
    }
  }
  return true;
}
*/
/* var paddleft = $(".right_seat").css('marginLeft');
    var nu_m=parseInt(paddleft);
 */





 //初始化滑动插件gomes
 var myScroll1;
    $(function(){
      var ley = $('.seat_B_ul_R_list').eq(0).find('li').length,
        cow = $('.text_list').find('li').length;
        ley = parseInt(ley)+2;
        cow = parseInt(cow);

    $('.right_seat').css({
      'width':ley*1.4+'rem',
      'height':cow*1.2+'rem'
      });
    //alert(Arrays[0]['countOfRows'])
    //alert(ley)
        myScroll1 = new IScroll('Seat_Flim_bottom_a1_right', {
          scrollX: true,
          scrollY: true,
          mouseWheel: true,
          resizeScrollbars:true
        });

      $('#Seat_Flim_bottom_a1_right').css({'height':cow*1.4+'rem'});
      //console.log(Arrays[0]['countOfRows'][0]+1)
    });

var text_FLims;
var text_FLims1;
var leftDiv = new Array();
var seatNo = 0;



//渲染座位图gomes
/*for(var ti=0;ti< Arrays[0]['countOfRows'].length;ti++){

  var leftI = 1;
  var leftN = 0;
    for(var i=1;i<=Arrays[0]['countOfRows'][ti];i++){
    text_FLims+="<ul class='seat_B_ul_R_list'><li class='G_D'></li>";


    var Sequence = 1;
    for(var t=1;t<=Arrays[0]['countOfCols'][ti];t++){
      var seat = '';
      seat=Arrays[0]['init_maps'][ti][i][t];

      seat = eval("("+seat+")")

      if(seat['type'] == 'road'){
        //走廊
        text_FLims+="<li class='G_D'></li>";

      }else{
        //(aaa[2][i][t].type == 'danren' || aaa[2][i][t].type == 'chengren' || aaa[2][i][t].type == 'shuangren' || aaa[2][i][t].type == 'vip')
        //未订座
        var cntNms = 0;

        for(var key in cntArr[0]){
          //console.log(cntArr[0].length)
          if(cntArr[0][key] == seat['id']){
            cntNms++;

          }



        }

        //console.log(cntNms)
        if(cntNms != 0) {
          text_FLims+="<li class='Y_S'></li>";
          Sequence++;


        }else{
          if(!seat['name']){
            text_FLims+="<li page_id='"+seat['id']+"' row='"+seat['row']+"' col='"+seat['col']+"'  class='K_X' data_type='1' pairValue='"+seat['pairValue']+"' data_text='1'></li>";
          }else{
            text_FLims+="<li page_id='"+seat['id']+"' row='"+seat['row']+"' col='"+seat['col']+"' name='"+seat['name']+"' class='K_X' data_type='1' pairValue='"+seat['pairValue']+"' data_text='1'></li>";
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
  text_FLims+="<ul class='seat_B_ul_R_list'><li class='G_D'></li></ul>";
  text_FLims1+='<li class="hide_li"></li>';
  var ttttt = "";
  for(var i = 0; i < leftDiv.length; i++){
    ttttt += leftDiv[i]  ;
  }


}


  $(text_FLims).appendTo($('.right_seat > div'));
  $(text_FLims1).appendTo($('.text_list'));
  var lrn = $('.right_se at_ul').find('li').length,
    wid = $('.seat_B_ul_R_list').find('li').width();




//中间线位置计算gomes
  var text_lis = Arrays[0]['countOfCols'][0];
  //console.log(xian_arrar[0])
  if(xian_arrar[0]%2==1){
    $('.right_seat_xian').css({
    'left':(((xian_arrar[0]+1)/2+xian_arrar[1]+1)*1.2)+'rem'
    })

  }else{
    $('.right_seat_xian').css({
    'left':((xian_arrar[0]/2+xian_arrar[1]+2)*1.2)+'rem'
    })

  }
*/

  //判断屏1幕宽度 进行样式适配gomes
/*  if($(window).width()>470){
    $('.right_seat').css({
      'margin-left':$(window).width()/15/4-((text_lis*1.4+0.4)/2+1.1)+'em'
    });
  }else{
    $('.right_seat').css({
      'margin-left':$(window).width()/15/2-((text_lis*1.4+0.4)/2+1.1)+'em'
    });
  }
   */
  $('.seat_B_ul_R_list').css({
    'width':(text_lis+3)*1.2+'em',
    "margin-left":'1.2rem'
  });

  var text_Seat='';
  var text_Arry=new Array();
    alls = new Array();
   var zoom = false;
  //点击事件   判断手势
  var right_width = $( ".seat_B_ul_R_list" ).width()*2,
    right_height =  $( ".right_seat" ).height()*2;
   //双手放
   $('#right_seat_xian').bind('pinchopen',function(){
    suo_xiao(2)
   });

   //双手缩
    $('#right_seat_xian').bind('pinchclose',function(){
    suo_xiao(1)
   });

//单击事件gomes
  $('.seat_B_ul_R_list li[data_text="1"]').bind('click',function(){
    alert(111)
    console.log(222)
    var iScroll_left = myScroll1.x;
    var textkk = $('.POP_UP_divw').is(":animated");
    if(!textkk){
    var pageX = $(this).position().left,
    pageY = $(this).position().top;
    var type_id=$('.seat_zuo_list').find('li');
    var row_li = $(this).attr('row'),
    col_li = $(this).attr('col'),
    ids_li = $(this).attr('page_id');
    var si = 0;
    $('.Seat_Flim_top_b1_a1 p').hide().siblings().show();

    //判断是缩是放
    suo_xiao(2,iScroll_left,pageX,pageY)
    //判断是取消座位 还是选中
    if($(this).attr('data_type')==1){

      //判断是否隔行
    var thes = new Array(row=row_li,col=col_li);
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

      var mydate = new Date();
      var str = "" + mydate.getFullYear() + "-";
      str += (mydate.getMonth()+1) + "-";
      str += mydate.getDate()+ " ";
      str += mydate.getHours()+ ":";
      str += mydate.getMinutes()+ ":";
      str += mydate.getSeconds();


      /***鼎新情侣座****/
        var lovers1 = $(this).attr('pairvalue');
        $(".seat_B_ul_R_list li").each(function(key){
          var obj_id = $(this),
            t_tt= obj_id.attr('pairvalue');
            if(t_tt==lovers1){
              //var ids_li2 = obj_id.attr("pade_id");
              var ids_li2 = obj_id['context']['attributes'][0]['value'];
              obj_id.addClass('Y_X');
              obj_id.attr('data_type','0');
              text_Arry.push(ids_li2);
              alls.push(thes);
              if(si == 0){
                ppp=$(".seat_zuo_list li").length;
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
                    $(text_Seat).appendTo('.seat_zuo_list ');

                    initFilmTopFun(ppp);
                  ppp=$(".seat_zuo_list li").length;
                  }else{
                      $('.POP_UP_divw_bosa span').html('您最多只能购买4张票');
                       $('.POP_UP_divw').animate({'top':'0em'},1000,function(){
                        $('.POP_UP_divw').animate({'top':'-2rem'},1000);

                        $(".seat_zuo_list li").each(function(){
                          if($(this).attr("pairvalue") == lovers1){
                            $(this).remove();
                            ppp=$(".seat_zuo_list li").length;
                          }

                        })
                        $(".seat_B_ul_R_list li").each(function(key){
                           var t_tt= $(this).attr('pairvalue');

                            if(t_tt==lovers1){

                              var ids_li2 = $(this)['context']['attributes'][0]['value'];
                              $(this).removeClass('Y_X');
                              $(this).attr('data_type','1');
                              text_Arry.splice($.inArray(ids_li2, text_Arry),1);
                              alls.splice($.inArray(thes, alls),1);
                              ppp=$(".seat_zuo_list li").length;
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
                      $(text_Seat).appendTo('.seat_zuo_list ');

                      initFilmTopFun(ppp);
                    ppp=$(".seat_zuo_list li").length;
                    }else{
                        $('.POP_UP_divw_bosa span').html('您最多只能购买2张票');
                         $('.POP_UP_divw').animate({'top':'0em'},1000,function(){
                          $('.POP_UP_divw').animate({'top':'-2rem'},1000);

                          $(".seat_zuo_list li").each(function(){
                            if($(this).attr("pairvalue") == lovers1){
                              $(this).remove();
                              ppp=$(".seat_zuo_list li").length;
                            }

                          })
                          $(".seat_B_ul_R_list li").each(function(key){
                             var t_tt= $(this).attr('pairvalue');

                              if(t_tt==lovers1){

                                var ids_li2 = $(this)['context']['attributes'][0]['value'];
                                $(this).removeClass('Y_X');
                                $(this).attr('data_type','1');
                                text_Arry.splice($.inArray(ids_li2, text_Arry),1);
                                alls.splice($.inArray(thes, alls),1);
                                ppp=$(".seat_zuo_list li").length;
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
                      $(text_Seat).appendTo('.seat_zuo_list ');

                      initFilmTopFun(ppp);
                    ppp=$(".seat_zuo_list li").length;
                    }else{
                        $('.POP_UP_divw_bosa span').html('您最多只能购买4张票');
                         $('.POP_UP_divw').animate({'top':'0em'},1000,function(){
                          $('.POP_UP_divw').animate({'top':'-2rem'},1000);

                          $(".seat_zuo_list li").each(function(){
                            if($(this).attr("pairvalue") == lovers1){
                              $(this).remove();
                              ppp=$(".seat_zuo_list li").length;
                            }

                          })
                          $(".seat_B_ul_R_list li").each(function(key){
                             var t_tt= $(this).attr('pairvalue');

                              if(t_tt==lovers1){

                                var ids_li2 = $(this)['context']['attributes'][0]['value'];
                                $(this).removeClass('Y_X');
                                $(this).attr('data_type','1');
                                text_Arry.splice($.inArray(ids_li2, text_Arry),1);
                                alls.splice($.inArray(thes, alls),1);
                                ppp=$(".seat_zuo_list li").length;
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
                $(".seat_zuo_list li").each(function(){
                  if($(this).attr("pade_id") == ids_li){
                    $(this).remove();
                    si++;
                  }

                })
                if(ppp==4){
                  return false;
                }
                if(ppp>0){
                  ppp=$(".seat_zuo_list li").length;
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
            /* if($(this).attr("pade_id") == ids_li){
              $(this).remove();
              si++;
            } */

          })







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
          $(".seat_zuo_list li").each(function(){
            if($(this).attr("pade_id") == pade_id){
              $(this).remove();
              si++;

            }
          })
          $('.POP_UP_divw_bosa span').html('为避免空位！已关联取消右侧座位！');
           $('.POP_UP_divw').animate({'top':'0em'},1000,function(){
            $('.POP_UP_divw').animate({'top':'-2rem'},1000);

            yuguu.removeClass('Y_X');
            yuguu.attr('data_type','1');


             if(ppp>0){
              ppp--;
              //console.log(ppp+'a4');
             }else if(ppp==0){
              ppp=0 ;
             }
          })

        }

        $(".seat_zuo_list li").each(function(){
            if($(this).attr("pade_id") == ids_li){
              $(this).remove();
              si++;
              if(ppp>0){
              ppp=$(".seat_zuo_list li").length;
              //console.log(ppp+'a5');
             }
            }


          })
            var lovers1 = $(this).attr('pairvalue');

            $(".seat_zuo_list li").each(function(){
              if($(this).attr("pairvalue") == lovers1){
                $(this).remove();
                si++;
              }

            })
            $(".seat_B_ul_R_list li").each(function(key){
               var obj_id = $(this),
                t_tt= obj_id.attr('pairvalue');

                if(t_tt==lovers1){

                  var ids_li2 = obj_id['context']['attributes'][0]['value'];
                  obj_id.removeClass('Y_X');
                  obj_id.attr('data_type','1');
                  text_Arry.splice($.inArray(ids_li2, text_Arry),1);
                  alls.splice($.inArray(thes, alls),1);
                  ppp=$(".seat_zuo_list li").length;
                  initFilmTopFun(ppp);
                }
            })

            yuguu.removeClass('Y_X');
            yuguu.attr('data_type','1');
            text_Arry.splice($.inArray(ids_li, text_Arry),1);
            alls.splice($.inArray(thes, alls),1);
      }
      if(ppp==0){
        suo_xiao(1,iScroll_left,0,0);
      }


      text_Arry.splice($.inArray(ids_li, text_Arry),1);
      alls.splice($.inArray(thes, alls),1);







    }




    //价格改变gomes
    $('.btn_bottom').addClass('btn_bottoma');
      ppp=$(".seat_zuo_list li").length;

      var Btn_true_false = $('.btn_bottom').is('.btn_bottoma')
      if(ppp==0&&Btn_true_false){
        $('.btn_bottom').removeClass('btn_bottoma');
        var totalPrice = "票价<span class='span1'>0.0</span>元";
        $('.seat_Bottom_top_money').html(totalPrice);
      }else{
        var totalPrice = '支付'+(seatPrice * ppp).toFixed(2)+'元';
        var totalPrice = "票价<span class='span1'>"+(seatPrice * ppp).toFixed(2)+"</span>元";
        $('.seat_Bottom_top_money').html(totalPrice);
      }



    var seatStrCn = new Array();
    $('.seat_zuo_list li').each(function(i){
      seatStrCn[i] = $(this).text();
    })
    $("#seatStrCn").val(seatStrCn.join(","));
  }

  })

//选票完成 paddy
$('.btn_bottom').bind('click',function(){
  //alert(111);
    eachSeats();
    var true_false = $(this).is('.btn_bottoma');
    var count=$('#seatStrCn').val();
    var movieid=$('#movieid').val();
    var cid=$('#cid').val();
    var client_price=$('#client_price').val();
    if(true_false){
      jQuery.ajax({
      　　 url:"/user.php?c=login&a=sess_ok",
      　　 type:"post",
        async:false,
      　　 dataType:'json',
      　　 //data:{mobile:mobile},
      　　 success:function(data){
          if(data.mesg==0){
            $('.Pop_boddy').show();
            $('html,body').addClass('ovfHiden');
          }
          if(data.mesg==1){
            $('.Pop_boddy').hide();
            $('html,body').removeClass('ovfHiden');
            ckOrders(count,movieid,cid,client_price);
          }
        }
      });
    }else{
      $('.Pop_boddy').hide();
      $('html,body').removeClass('ovfHiden');
    }
})
//初始化点击事件 gomes
var tegb= 0;
function initFilmTopFun(ppp){
  var iScroll_left = myScroll1.x;
  tegb++;
  $('.seat_zuo_list li').on('tapone',function(){
    var lovers1 = $(this).attr('pairvalue');
    var pade_id = $(this).attr('pade_id');
    var lisd_len = $('.seat_zuo_list').find('li').length;
    $('.seat_zuo_list li').each(function(){
      if($(this).attr("pairvalue") == lovers1){
        $(this).remove();
      }
    })

      $('.seat_B_ul_R_list li').each(function(){
        if($(this).attr('pairvalue')==lovers1){
          $(this).removeClass('Y_X');
          $(this).attr('data_type','1');
          ppp=$('.seat_zuo_list li').length;
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
        $('.btn_bottom').removeClass('btn_bottoma');
        var totalPrice = "票价<span class='span1'>0.0</span>元";
        $('.seat_Bottom_top_money').html(totalPrice);
      }else{
        var totalPrice = '支付'+(seatPrice * ppp).toFixed(2)+'元';
        var totalPrice = "票价<span class='span1'>"+(seatPrice * ppp).toFixed(2)+"</span>元";
        $('.seat_Bottom_top_money').html(totalPrice);
      }


      })




  })
}
//缩放插件
//zommsd ：缩放前的状态
//iScroll_left:点击之前滑动的参数
//tetes1 ：X轴坐标、
//tets2  ：Y轴坐标、gomes

function suo_xiao(zommsd,iScroll_left,tetes1,tets2){
  if(zommsd==1){

    ppp=$(".seat_zuo_list li").length;

      var Btn_true_false = $('.btn_bottom').is('.btn_bottoma');

      if(ppp==0&&Btn_true_false==false){
        $('.btn_bottom').removeClass('btn_bottoma');
        var totalPrice = '支付0.00元';
        $('.btn_bottoma button').html(totalPrice);
      }else{
        var totalPrice = '支付'+(seatPrice * ppp).toFixed(2)+'元';
        $('.btn_bottoma button').html(totalPrice);
      }



    $('.Seat_Flim_top_b1_a1 p').show().siblings('.seat_zuo_list').hide();

    zoom = false;
    setTimeout(function(){
      $( ".right_seat > div" ).css({
        "-webkit-transition" : "all 1s ease",
        "-webkit-transform" : "scale(1)"
      })
      var width = right_width/2,
          height =  (right_height)/2+20;
      $( ".right_seat" ).css({
        'width' : width,
        'height' : height
      })
      $( "#Seat_Flim_bottom_a1_right" ).css({
        'width' : "100%",
        'height' : height
      })
      setTimeout(function(){myScroll1.refresh(); },500);
      //点击座位图还原XY坐标
      myScroll1.scrollTo(tetes1,tets2-14,1000);


    },100)
  }else{
      if( !zoom ){
      zoom = true;
      $( ".right_seat > div" ).css({
        "-webkit-transition" : "all 0s ease",
        "-webkit-transform-origin-x" : "0px",
        "-webkit-transform-origin-y": "0px"
      });


      setTimeout(function(){
        $( ".right_seat > div" ).css({
          "-webkit-transition" : "all 1s ease",
          "-webkit-transform" : "scale(2)"
        })
        $( ".right_seat" ).css({
          "-webkit-transition" : "all 0s ease",
          "-webkit-transform-origin-x" : "0px",
          "-webkit-transform-origin-y": "0px",
        'width':(text_lis+2)*1.2+'em'
        });
        var width = right_width,
          height =  right_height+20;
        $( ".right_seat" ).css({
          'width' : width,
          'height' : height
        })
        $( "#Seat_Flim_bottom_a1_right" ).css({
          'width' : "100%",
          'height' : height/2
        })

        myScroll1.refresh();
        //点击座位图定XY坐标

        myScroll1.scrollTo(-tetes1+iScroll_left-20,-tets2-14,1000);

      },100)
    }

  }
}




