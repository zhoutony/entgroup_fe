import $ from 'jquery';
import { foo } from "./swiper.js";
var obj_index = 1;
var obj_index1 = 1;
$(document).ready(function(){

	$.initData();

});
var vals = 0;
var vald = 0;
var indehhjhhj = 0;
function touchChange(index_text){
	indehhjhhj++;
		var index_text = index_text>0?index_text:0;

		 vals =  vald!=0?vald:0;
		  vald = $('#ypdetail1').find('.swiper-slide').eq(index_text).find('input[type="hidden"]').eq(0).val();

		 //console.log(vals);
		 if(vald==vals){
			return false;
		 }else{

			  var htmlLoad = '';
			  var htmlLoads = '';
			  var htmlk= '';
			  //Load_img(1);
			  $.ajax({
				 type: "GET",
				 url: '/indexData/'+yc+'/'+vald,
				 data: {},
				 dataType: "json",
				 success: function(msg){
				 	//alert(vald)
				//alert(msg.data.KB);
				for (var key in msg.resl) {
				//alert()
					if(msg.resl[key].entMovieId==vald){
						var h3html = '<span class="span1">'+msg.resl[key].movieZname+'</span>';
							if(msg.resl[key].entdataKb!=null){
								h3html += '<span class="span2">'+msg.resl[key].entdataKb+'</span>';
							}
							$('.banner_h2_tex').html(h3html);
						break;
					}

				}




				var planHtml = '';
				var dayHtml = '';
				var dayI = 0;

				for (key in msg.plans) {
					//alert(key);
					if(dayI == 0){
						var cur = ' click_ul';
					}else{
						var cur = ' ';
					}
					planHtml += '<ul class="flim_list_body_top '+cur+'">';
							var vp = msg.plans[key];
							var tc = '';
							for (var vk in vp) {
								tc = vk;
							}
							var vp = msg.plans[key];
							var tc = '';
							for (vk in vp) {
								var vpObj = vp[vk];
								var vpT = 0;
								for (var vok in vpObj) {
									var tImg = '';
									if(vpT == 0){
										if(vk == 'a'){
											tImg = '<div><img src="/Public/images/quick_ticket.yuel.png"></div>';
										}else{
											tImg = '<div><img src="/Public/images/quick_ticket.tai.png"></div>';
										}
									}
									//console.log(vpObj[vok]);

									if(!vpObj[vok].dis_price) { vpObj[vok].dis_price = vpObj[vok].price; }

									if(!vpObj[vok].dis_price) { vpObj[vok].dis_price = vpObj[vok].price; }
									/* console.log(vpObj[vok]); */
									if((yc=='user120002904' && vpObj[vok].data.hallName=='情侣厅')||(yc=='user120002904' && vpObj[vok].data.hallName=='VIP厅')){
										planHtml += '<li>';
                    if(vpObj[vok].zday=='今天'){
                      planHtml += '<a href="###">';
                    }
                    //planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
                    if(vpObj[vok].h=='p'){
                      planHtml += '<div class="div1"><img src="'+CDN+'/home/index/yue.png"></div>';
                    }else{
                      planHtml += '<div class="div1"><img src="'+CDN+'/home/index/ri.png"></div>';
                    }


                    planHtml += '<div class="div2"><p class="p1">'+vpObj[vok].stimes+'</p><p class="p2">'+vpObj[vok].etimes+'散场</p></div>';
                    planHtml += '<div class="div3"><p class="p1">'+vpObj[vok].language+'/'+vpObj[vok].screenType+'</p><p class="p2">'+vpObj[vok].data.hallName+'</p></div>';

                    planHtml += '<div class="div4"><p class="p1">¥'+vpObj[vok].price+'</p><p class="p2">¥'+vpObj[vok].dis_price+'</p></div>';

                    planHtml += '<div class="div4">';
                      planHtml += '<div class="Btn_input">购票</div>';
                    planHtml += '</div>';
                    if(vpObj[vok].zday=='今天'){
                      planHtml += '</a>';
                    }
										//planHtml += '</a>';
										planHtml += '</li>';
									}else{
                    //alert(CDN);
										planHtml += '<li>';
										//if(vpObj[vok].zday=='今天'){
											planHtml += '<a href="/plan/selectSeat/?pid='+vpObj[vok].planId+'&id='+vpObj[vok].id+'&yc='+yc+'">';
										//}
										//planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
                    if(vpObj[vok].h=='p'){
                      planHtml += '<div class="div1"><img src="'+CDN+'/home/index/yue.png"></div>';
                    }else{
                      planHtml += '<div class="div1"><img src="'+CDN+'/home/index/ri.png"></div>';
                    }


                    planHtml += '<div class="div2"><p class="p1">'+vpObj[vok].stimes+'</p><p class="p2">'+vpObj[vok].etimes+'散场</p></div>';
                    planHtml += '<div class="div3"><p class="p1">'+vpObj[vok].language+'/'+vpObj[vok].screenType+'</p><p class="p2">'+vpObj[vok].data.hallName+'</p></div>';

                    planHtml += '<div class="div4"><p class="p1">¥'+vpObj[vok].price+'</p><p class="p2">¥'+vpObj[vok].dis_price+'</p></div>';

										planHtml += '<div class="div5">';
											planHtml += '<div class="Btn_input">购票</div>';
										planHtml += '</div>';
										//if(vpObj[vok].zday=='今天'){
											planHtml += '</a>';
										//}
										//planHtml += '</a>';
										planHtml += '</li>';
									}
									vpT++;
								}
								tc = vk;
							};

							var cur = '';
							if(dayI == 0){
								var cur = ' class="this_on"';
							}else{
								var cur = ' ';
							}
							//alert(tc);
							//dayHtml += '<a href="#"'+cur+' id="'+msg.plans_date[key][tc].date+'">'+msg.plans_date[key][tc].day+'<br>'+msg.plans_date[key][tc].fdate+'</a>';
							dayHtml += '<li '+cur+' id="'+msg.plans_date[key][tc].date+'" data_type="'+msg.plans_date[key][tc].bs+'">'+msg.plans_date[key][tc].day+msg.plans_date[key][tc].date+'</li>';
					planHtml += '</ul>';
					dayI++;
				}
				var yphd = '';
				//alert(msg.plans_date[key][tc].bs);
				if(msg.activity==null){
					yphd='';
				}else{
					yphd='<a href="/index.php/index/activity/id/'+msg.activity.id+'"><p><span>'+msg.activity.name[0]+'</span>'+msg.activity.name[1]+'</p></a>';
				}
				$('.swiper_nav_h3').html(yphd);
				//alert(planHtml);
				if(planHtml!=''){
					//alert(333);
					$('.swiper-pages').show();
					$('#dateTabs').show().html(dayHtml);
					$('#swiper-wrapper').html(planHtml);
					$('.Null_filme').hide();


				}else{
					$('#swiper-wrapper').html('<p style="color:red;text-align:center;font-size:1rem">暂无场次</p>');
					$('.swiper-pages').hide();
					$('.Null_filme').show();
					$('#dateTabs').hide();

				}





				  }
			 });




		 }
		//$('.swiper-nav .swiper-slide').removeClass('swiper-slide-active').eq(0).addClass('swiper-slide-active');
	}

function touchChange1(index_text){
		var index_text = index_text>0?index_text:0;
//alert(1111);

		 vals =  vald!=0?vald:0;
		  vald = $('#ypdetail2').find('.swiper-slide').eq(index_text).find('input[type="hidden"]').eq(0).val();

		 //console.log(vald);
		 if(vald==vals){
			return false;
		 }else{

			  var htmlLoad = '';
			  var htmlLoads = '';
			  var htmlk= '';
			  //Load_img(1);
			  $.ajax({
				 type: "GET",
				 url: '/indexData/'+yc+'/'+vald,
				 data: {},
				 dataType: "json",
				 success: function(msg){
					 	//alert(vald)
					//alert(msg.resl);
					for (var key in msg.resl) {
					//console.log(msg.resl)
						if(msg.resl[key].entMovieId==vald){
							var Time = msg.resl[key].movieBetime;
							//console.log(Time)
							var h3html = '<p class="flime_name">'+msg.resl[key].movieZname+'</p>';
								h3html += '<div class="flime_xing">';
									h3html += '<ul class="flime_xing_ul">';
										h3html += '<li class="li_list"></li>';
										h3html += '<li class="li_list"></li>';
										h3html += '<li class="li_list"></li>';
										h3html += '<li class="li_list"></li>';
										h3html += '<li></li>';
									h3html += '</ul>';
									h3html += '<p class="flime_text">0.8</p>';
								h3html += '</div>';
								h3html += '<div class="flime_style">';
									h3html += '<p class="p1">'+msg.resl[key].oneTalk+'</p>';
									Time=Time.substring(0,10);
									//console.log(Time)
									h3html += '<p class="p1">'+msg.resl[key].movieStar+'</p>';
									h3html += '<p class="p1">'+Time+' 上映</p>';
								h3html +='</div>';
								h3html +='<div class="Btn_gou">';
									h3html +='<a href="/indexInit/?yc='+yc+'&film_id='+msg.resl[key].entMovieId+'"><div  class="Btn_input">购票</div></a>';
								h3html +='</div>';
								$('.flime_h2').html(h3html);
							break;
						}

					}
				  }
			 });
        var fot_hei = $('.footer_ul').height();
        var win_hei = $(window).height()-fot_hei;
        var bod_hei = $('body').height()-fot_hei;
        var hei_ght = 0;
        if(win_hei<bod_hei){
          hei_ght = bod_hei;
        }else{
           hei_ght = win_hei+fot_hei+5;
        }
        //console.log(hei_ght)
        $('body').css({
          "height":hei_ght
        })


		 }
	//alert(1111);
	//console.log(index_text);
}
$.extend({


	//初始化数据
	initData: function() {
		//alert('系统维护中……预计1小时');return false;
		//alert(INIT_FILM_ID);
		var href = '/indexData/'+yc+'/'+INIT_FILM_ID;
		//INIT_LOADING = true;
		//Load_img(1);
		//alert(INIT_FILM_ID);
		$.get(href, {}, function(msg) {
			//Load_img(1);
			//alert(msg.lists);
			//console.log(msg);
			var htmlLoad = '';
			if(msg.errorStatus == false){
				alert('影片信息有误');
			}else{
				//alert(msg.data);
				/*var cm = msg.data.amount/10000;
				if(cm > 10000){
					cm = cm/10000;
					cm = cm.toFixed(2);
					cm = '<b>'+cm+'</b>亿';
				}else{
					cm = cm.toFixed(2);
					cm = '<b>'+cm+'</b>万';
				}
				htmlLoad += '<a href="/index.php/index/detailsload/id/'+msg.data.id+'/film_id/'+msg.data.film_id+'">';
				htmlLoad += '<div class="BL_G_article_H3_a1_p1">';
				htmlLoad += '<span class="Filme_name">'+msg.data.film_zname+'</span>';
				htmlLoad += '<ul class="p3" date_li="7.8">';
				for($x=0; $x<msg.data.huang; $x++){
					htmlLoad += '<li><img src="/Public/images/Home_Page/xing_01.png"/></li>';
				}
				for($x=0; $x<msg.data.ban; $x++){
					htmlLoad += '<li><img src="/Public/images/Home_Page/xing_03.png"/></li>';
				}
				for($x=0; $x<msg.data.hui; $x++){
					htmlLoad += '<li><img src="/Public/images/Home_Page/xing_02.png"/></li>';
				}
				htmlLoad += '<li class="text_li">'+msg.data.xxx+'</li>';
				htmlLoad += '</ul>';
				htmlLoad += '</div>';

				htmlLoad += '<p class="BL_G_article_H3_a1_p2">'+msg.data.film_time+'分钟，'+msg.data.film_genre+'</p>';
				htmlLoad += '</a>';


				$('#BL_G_article_H3_a1').html(htmlLoad);*/

				for (var key in msg.resl) {
				//alert()
						var h3html = '<span class="span1">'+msg.resl[key].movieZname+'</span>';
						if(msg.resl[key].entdataKb!=null){
							h3html += '<span class="span2">'+msg.resl[key].entdataKb+'</span>';
						}
						$('.banner_h2_tex').html(h3html);
					break;
				}
				var h2html='';
				for (var zzz in msg.resl) {
                   h2html += '<div class="swiper-slide">';
            			 h2html += '<a href="/Video_details/movieID='+msg.resl[zzz].entMovieId+'">';
            					h2html += '<input type="hidden" value='+msg.resl[zzz].entMovieId+'>';
            					h2html += '<img src='+msg.resl[zzz].titleImg+' />';
                    h2html += ' </a>';
            				h2html += ' </div>';


				}
				$('#ypdetail1').html(h2html);






				//console.log(msg.plans);

				var planHtml = '';
				var dayHtml = '';
				var planHtmls=[];
				var dayI = 0;
				var yphd = '';
				for (key in msg.plans) {
					var cur = '';
					if(dayI == 0){
						var cur = ' click_ul';
					}else{
						var cur = ' ';
					}
					planHtml += '<ul class="list_li_div_ul '+cur+'">';
							var vp = msg.plans[key];
             //console.log(vp)
							var tc = '';
							for (var vk in vp) {
								tc = vk;
							}

							var vp = msg.plans[key];
							var tc = '';
							for (vk in vp) {
								var vpObj = vp[vk];
								var vpT = 0;
								for (var vok in vpObj) {
									var tImg = '';
									if(vpT == 0){
										if(vk == 'a'){
											tImg = '<div><img src="/Public/images/quick_ticket.yuel.png"></div>';
										}else{
											tImg = '<div><img src="/Public/images/quick_ticket.tai.png"></div>';
										}
									}
									if(!vpObj[vok].dis_price) { vpObj[vok].dis_price = vpObj[vok].price; }
									//console.log(vpObj[vok]);
									if((yc=='user120002904' && vpObj[vok].data.hallName=='情侣厅')||(yc=='user120002904' && vpObj[vok].data.hallName=='VIP厅')){
										planHtml += '<li>';
                    if(vpObj[vok].zday=='今天'){
                      planHtml += '###">';
                    }
                    //planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
                    if(vpObj[vok].h=='p'){
                      planHtml += '<div class="div1"><img src="'+CDN+'/home/index/yue.png"></div>';
                    }else{
                      planHtml += '<div class="div1"><img src="'+CDN+'/home/index/ri.png"></div>';
                    }


                    planHtml += '<div class="div2"><p class="p1">'+vpObj[vok].stimes+'</p><p class="p2">'+vpObj[vok].etimes+'散场</p></div>';
                    planHtml += '<div class="div3"><p class="p1">'+vpObj[vok].language+'/'+vpObj[vok].screenType+'</p><p class="p2">'+vpObj[vok].data.hallName+'</p></div>';

                    planHtml += '<div class="div4"><p class="p1">¥'+vpObj[vok].price+'</p><p class="p2">¥'+vpObj[vok].dis_price+'</p></div>';

                    planHtml += '<div class="div4">';
                      planHtml += '<div class="Btn_input">购票</div>';
                    planHtml += '</div>';
                    if(vpObj[vok].zday=='今天'){
                      planHtml += '</a>';
                    }
										planHtml += '</li>';
									}else{
										planHtml += '<li>';
                    if(vpObj[vok].zday=='今天'){
                      planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
                    }
                    //planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
                    if(vpObj[vok].h=='p'){
                      planHtml += '<div class="div1"><img src="'+CDN+'/home/index/yue.png"></div>';
                    }else{
                      planHtml += '<div class="div1"><img src="'+CDN+'/home/index/ri.png"></div>';
                    }


                    planHtml += '<div class="div2"><p class="p1">'+vpObj[vok].stimes+'</p><p class="p2">'+vpObj[vok].etimes+'散场</p></div>';
                    planHtml += '<div class="div3"><p class="p1">'+vpObj[vok].language+'/'+vpObj[vok].screenType+'</p><p class="p2">'+vpObj[vok].data.hallName+'</p></div>';

                    planHtml += '<div class="div4"><p class="p1">¥'+vpObj[vok].price+'</p><p class="p2">¥'+vpObj[vok].dis_price+'</p></div>';

                    planHtml += '<div class="div4">';
                      planHtml += '<div class="Btn_input">购票</div>';
                    planHtml += '</div>';
                    if(vpObj[vok].zday=='今天'){
                      planHtml += '</a>';
                    }
										planHtml += '</li>';
									}
									vpT++;
								}
								tc = vk;
							};

							var cur = '';
							if(dayI == 0){
								var cur = ' class="click_li"';
							}else{
								var cur = ' ';
							}
							//alert(msg.plans_date[key][tc].bs);
							//dayHtml += '<a href="#"'+cur+' id="'+msg.plans_date[key][tc].date+'">'+msg.plans_date[key][tc].day+'<br>'+msg.plans_date[key][tc].fdate+'</a>';


							dayHtml += '<li '+cur+' id="'+msg.plans_date[key][tc].date+'" data_type="'+msg.plans_date[key][tc].bs+'">'+msg.plans_date[key][tc].day+msg.plans_date[key][tc].date+'</li>';

					planHtml += '</ul>';
					//alert(planHtml);
					dayI++;
				}

				$('.swiper_nav_h3').html(yphd);
				if(planHtml!=''){
					//$('#dateTabs').show().html(dayHtml);
					//$('#swiper-wrapper').show().html(planHtml);
					//$('.Null_filme').hide();

				}else{
          //$('#dateTabs').show().html(dayHtml);
					$('.Null_filme').show();
					$('#dateTabs').hide();
					//$('#swiper-wrapper').hide();
				}
				$('.swiper-slide').append();
				$('#ypdetail1').html(msg.initlists);
				//alert(1111);
				//fixPagesHeight(0);
					$('.banner_list_nav_ul').on('click','li',function(){
						var index = $(this).index();
						$(this).addClass('click_li').siblings().removeClass('click_li');
						$('.list_li_div').find('.list_li_div_ul').removeClass('click_ul').eq(index).addClass('click_ul');
					})

					var indexs = 0;
					$('.list_lsi_div').find('.swiper-slide').eq(indexs).addClass('swiper-slide1');
					function indexs1(index_text){

						var img_wid = $('.list_lsi_div').find('.swiper-slide img').width();
						$('.list_lsi_div').find('.swiper-slide').removeClass('swiper-slide1').eq(index_text).addClass('swiper-slide1');
						$('.list_lsi_div').find('.swiper-slide').css({
							"width":img_wid+2,
							"margin":"0rem 0.4rem"
						})
						//console.log(img_wid)
					}
						var mySwiper1 = new Swiper('.swiper_list',{
							/* effect : 'coverflow',
							centeredSlides: true,
							slidesPerView : 4,
							coverflow: {
								rotate: 20,
								stretch: 0,
								depth: 20,
								modifier: 1,
								slideShadows : true
							},



							//onSlideChangeEnd: function(mySwiper1){
							onTransitionEnd: function(mySwiper1){
							  //console.log(mySwiper1)
							  //swiper-slide1
							   indexs = mySwiper1.activeIndex;
							  indexs1(indexs)
							  touchChange(indexs);

							} */
							 slidesPerView : 4,
							centeredSlides : true,

							longSwipesRatio : 0.1,

							onSlideChangeEnd: function(mySwiper1){
								indexs = mySwiper1.activeIndex;
							  indexs1(indexs)
								touchChange(indexs);

								//fixPagesHeight(0);
							},
							onSlideTouch: function(mySwiper1){
								//alert(22)
								mySwiper1.swipeTo(mySwiper1.activeIndex);

							}

						})

						var img_wid = $('.list_lsi_div').find('.swiper-slide img').width();
						$('.list_lsi_div').find('.swiper-slide').css({
								"width":img_wid
						})


				var mySwiper = new Swiper('.swiper_body',{
				 		effect: 'coverflow',
				        grabCursor: true,
				        centeredSlides: true,
						slidesPerView: 3,
				        slidesPerView: 'auto',
				        progress: 1,
				        coverflow: {
				            rotate: 50,
				            stretch: 0,
				            depth: 100,
				            modifier: 1,
				            slideShadows : true
				        },
				        onTransitionStart: function(mySwiper){
				        	obj_index = mySwiper.activeIndex;


				        	touchChange(obj_index);
				        }
				})

				$(".swiper_body").on('click','.swiper-slide',function(){
					  obj_index = $(this).index();


					mySwiper.slideTo(obj_index,1000,false);
					touchChange(obj_index);
				})

				var mySwiper_home = new Swiper('.swiper_body2',{
				 		effect: 'coverflow',
				        grabCursor: true,
				        centeredSlides: true,
						slidesPerView: 3,
				        slidesPerView: 'auto',
				        coverflow: {
				            rotate: 50,
				            stretch: 0,
				            depth: 100,
				            modifier: 1,
				            slideShadows : true
				        },
				        onTransitionStart: function(mySwiper_home){
							//alert( mySwiper_home.activeIndex);
							obj_index1 = mySwiper_home.activeIndex;
							touchChange1(obj_index1);


								//fixPagesHeight(0);
							}

				})
				$(".swiper_body2").on('click','.swiper-slide',function(){
					 obj_index1 = $(this).index();


					mySwiper_home.slideTo(obj_index1,1000,false);
					touchChange1(obj_index1);
				})


			}
		},'json');


	}

})

 		$('#swiper-wrapper').on('click','.click_ul li',function(){
		//alert(1111111111);
			pid = $(this).find('input[type="hidden"]').eq(0).val();
			id = $(this).find('input[type="hidden"]').eq(1).val();
			yc = $(this).find('input[type="hidden"]').eq(2).val();
			rq = $(this).find('input[type="hidden"]').eq(3).val();
			xq = $(this).find('input[type="hidden"]').eq(4).val();
			nm = $(this).find('input[type="hidden"]').eq(5).val();

			//alert(rq);
			$('#pid').val(pid);
			$('#id').val(id);
			$('#yc').val(yc);
			$('#rq').val(rq);
			//alert(rq); return false;
			$('.p3_h3 span').html(rq);
			var wid_hei = $(window).height(),
				obj_hei = $('.Pop_up_h2_body').height();

			$(this).addClass('OK_li').siblings().removeClass('OK_li');
			if((yc=='user120002904'&&nm=='情侣厅')||(yc=='user120002904'&&nm=='VIP厅')){
				alert('该场次暂不售卖');return false;
			}
			if(xq!='今天'){
				$('.again_Schedule').hide();
				$('.Pop_up_h2').show();
				$('.Pop_up_h2_body').css({
					"top":wid_hei/2-obj_hei-2
				})
			}


			$("body").eq(0).addClass('over_hide');



		})

$('.flim_Time_list').on('click','li',function(){
  var index = $(this).index();
  $(this).addClass('this_on').siblings('.this_on').removeClass('this_on');
  $(".flim_list").find('.flim_list_body').find('ul').hide(200).eq(index).show(200)
})




