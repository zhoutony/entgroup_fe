import $ from 'jquery';
$(document).ready(function(){
	$.initData();
	
});
function touchChange(index_text){
		var index_text = index_text>0?index_text:0;
		//vals= vald
		var vals = vald!=0?vald:0;
		 vald = $('#ypdetail1').find('.swiper-slide').eq(index_text).find('input[type="hidden"]').eq(0).val();
		 //movieId = $('#ypdetail1').find('.swiper-slide').eq(index_text).find('input[type="hidden"]').eq(1).val();
		 alert(vald);return false;
	
		// console.log(vald);
		// console.log(vals);
		 if(vald==vals){
			return false;
		 }else{
			
			  var htmlLoad = '';
			  var htmlLoads = '';
			  var htmlk= '';
			  //Load_img(1);
			  $.ajax({
				 type: "GET",
				 url: "/index.php/index/indexData/?yc="+yc,
				 data: {film_id:vald},
				 dataType: "json",
				 success: function(msg){
				//alert(msg.data.KB);
				for (key in msg.lists) {
						var h3html = '<div class="banner_h3_top">';
									h3html += '<div class="BL_G_article_H3_a1" id="BL_G_article_H3_a1"><p class="p1"><span class="p1">'+msg.lists[key].movieName+'</span>';
									if(msg.data.KB!=null&&msg.data.KB!=0.0){
										h3html += '<span class="span2">'+msg.data.KB+'</span>';
									}
									h3html += '</p>';
								h3html += '</div>';
							h3html += '<p class="banner_h3_bottom">'+msg.data.movieTime+'分钟</p>';
							h3html += '</div>';
						$('.banner_h3').html(h3html);
						$('.banner_h3').html(h3html);
					break;
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
					planHtml += '<ul class="list_li_div_ul '+cur+'">';
							var vp = msg.plans[key];
							var tc = '';
							for (vk in vp) {
								tc = vk;
							}
							if(msg.plans_date[key][tc].bs==1){
								planHtml += '<div class="swiper_nav_h3">';
								planHtml += '<a href="/index.php/index/activity/id/'+msg.plans_date[key][tc].id1+'"><p><span class="span1">'+msg.plans_date[key][tc].name1+'</span><span>'+msg.plans_date[key][tc].name2+'</span></p></a>';
								planHtml += '</div>';
							}							
							var vp = msg.plans[key];
							var tc = '';
							for (vk in vp) {
								var vpObj = vp[vk];
								var vpT = 0;
								for (vok in vpObj) {
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
										if(msg.plans_date[key][vk].day=='今天'){
											planHtml += '<a href="###">';
										}
										//planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
										
										planHtml += '<input type="hidden" value='+vpObj[vok].planId+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].id+'>';
										planHtml += '<input type="hidden" value='+yc+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].zday+''+vpObj[vok].zdate+'>';	
										planHtml += '<input type="hidden" value='+msg.plans_date[key][vk].day+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].data.hallName+'>';										

										planHtml += '<p class="p1">'+vpObj[vok].stimes+'</p>';
										planHtml += '<p class="p2">结束</p>';
										planHtml += '<p class="p3">'+vpObj[vok].etimes+'</p>';
										
										planHtml += '<p class="p4"><span class="span_a1">'+vpObj[vok].data.hallName+'</span> </span class="span_a2">'+vpObj[vok].language+'/'+vpObj[vok].screenType+'</span></p>';
										planHtml += '<p class="p5">';
											
											planHtml += '<span class="span2">¥'+vpObj[vok].dis_price+'</span>';
										planHtml += '</p>';
										if(msg.plans_date[key][vk].day=='今天'){
											planHtml += '</a>';
										}
										//planHtml += '</a>';
										planHtml += '</li>';
									}else{
										planHtml += '<li>';
										if(msg.plans_date[key][vk].day=='今天'){
											planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
										}
										//planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
										
										planHtml += '<input type="hidden" value='+vpObj[vok].planId+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].id+'>';
										planHtml += '<input type="hidden" value='+yc+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].zday+''+vpObj[vok].zdate+'>';	
										planHtml += '<input type="hidden" value='+msg.plans_date[key][vk].day+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].data.hallName+'>';										
										

										planHtml += '<p class="p1">'+vpObj[vok].stimes+'</p>';
										planHtml += '<p class="p2">结束</p>';
										planHtml += '<p class="p3">'+vpObj[vok].etimes+'</p>';
										
										planHtml += '<p class="p4"><span class="span_a1">'+vpObj[vok].data.hallName+'</span> </span class="span_a2">'+vpObj[vok].language+'/'+vpObj[vok].screenType+'</span></p>';
										planHtml += '<p class="p5">';
											
											planHtml += '<span class="span2">¥'+vpObj[vok].dis_price+'</span>';
										planHtml += '</p>';
										if(msg.plans_date[key][vk].day=='今天'){
											planHtml += '</a>';
										}
										//planHtml += '</a>';
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
							//alert(tc);
							//dayHtml += '<a href="#"'+cur+' id="'+msg.plans_date[key][tc].date+'">'+msg.plans_date[key][tc].day+'<br>'+msg.plans_date[key][tc].fdate+'</a>';
							dayHtml += '<li '+cur+' id="'+msg.plans_date[key][tc].date+'" data_type="'+msg.plans_date[key][tc].bs+'"><span class="span1">'+msg.plans_date[key][tc].day+'</span><span class="span2">'+msg.plans_date[key][tc].fdate+'</span></li>';
							
					planHtml += '</ul>';
					dayI++;
				}
				for (key in msg.noplan) {
					
					if(msg.noplancount == 4 && key == 1){
						var nocurli = ' click_li';
						var nocurul = ' click_ul';
					}else{
						var nocurli = ' ';
						var nocurul = ' ';
					}
					//alert(msg.noplancount);
					dayHtml += '<li class="'+nocurli+'"><span class="span1">'+msg.noplan[key].day+'</span><span class="span2">'+msg.noplan[key].fdate+'</span></li>';
					planHtml += '<ul class="list_li_div_ul '+nocurul+'" style="text-align:center">暂无排期！</ul>';
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
					$('#swiper-wrapper').html('');
					$('.swiper-pages').hide();
					$('.Null_filme').show();
					$('#dateTabs').hide();
					
				}
	


				  }
			 }); 
			 
			
			

		 }
		//$('.swiper-nav .swiper-slide').removeClass('swiper-slide-active').eq(0).addClass('swiper-slide-active');
	}


$.extend({
	
	  
	//初始化数据
	initData: function() {
		//alert('系统维护中……预计1小时');return false;
		//alert(222);
		var href = '/index.php/index/indexData/?yc='+yc;
		//INIT_LOADING = true;
		//Load_img(1);
		//alert(INIT_FILM_ID);
		$.get(href, {'data_type':1, 'film_id':INIT_FILM_ID}, function(msg) {
			//Load_img(1);
			//alert(msg.lists);
			//console.log(msg.data);
			var htmlLoad = '';
			if(msg.status == 0){
				$('#ypdetail1').append("<div class='load' id='loadMore'>暂无详情信息</div>");
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

				for (key in msg.lists) {					
						var h3html = '<div class="banner_h3_top">';
									h3html += '<div class="BL_G_article_H3_a1" id="BL_G_article_H3_a1"><p class="p1"><span class="p1">'+msg.lists[key].movieName+'</span>';
									if(msg.data.KB!=null&&msg.data.KB!=0.0){
										h3html += '<span class="span2">'+msg.data.KB+'</span>';
									}
									h3html += '</p>';
								h3html += '</div>';
							h3html += '<p class="banner_h3_bottom">'+msg.data.movieTime+'分钟</p>';
							h3html += '</div>';
						$('.banner_h3').html(h3html);
					break;
				}

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
							var tc = '';
							for (vk in vp) {
								tc = vk;
							}
													
							var vp = msg.plans[key];
							var tc = '';
							for (vk in vp) {
								var vpObj = vp[vk];
								var vpT = 0;
								for (vok in vpObj) {
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
										if(msg.plans_date[key][vk].day=='今天'){
											planHtml += '<a href="###">';
										}
										//planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
										
										planHtml += '<input type="hidden" value='+vpObj[vok].planId+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].id+'>';
										planHtml += '<input type="hidden" value='+yc+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].zday+''+vpObj[vok].zdate+'>';
										planHtml += '<input type="hidden" value='+msg.plans_date[key][vk].day+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].data.hallName+'>';
										
										planHtml += '<p class="p1">'+vpObj[vok].stimes+'</p>';
										planHtml += '<p class="p2">结束</p>';
										planHtml += '<p class="p3">'+vpObj[vok].etimes+'</p>';
										
										planHtml += '<p class="p4"><span class="span_a1">'+vpObj[vok].data.hallName+'</span> </span class="span_a2">'+vpObj[vok].language+'/'+vpObj[vok].screenType+'</span></p>';
										planHtml += '<p class="p5">';
											
											planHtml += '<span class="span2">¥'+vpObj[vok].dis_price+'</span>';
										planHtml += '</p>';
										if(msg.plans_date[key][vk].day=='今天'){
											planHtml += '</a>';
										}
										planHtml += '</li>';
									}else{
										
										planHtml += '<li>';
										if(msg.plans_date[key][vk].day=='今天'){
											planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
										}
										//planHtml += '<a href="/index.php/plan/selectSeat/pid/'+vpObj[vok].planId+'/id/'+vpObj[vok].id+'/yc/'+yc+'">';
										
										planHtml += '<input type="hidden" value='+vpObj[vok].planId+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].id+'>';
										planHtml += '<input type="hidden" value='+yc+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].zday+''+vpObj[vok].zdate+'>';
										planHtml += '<input type="hidden" value='+msg.plans_date[key][vk].day+'>';
										planHtml += '<input type="hidden" value='+vpObj[vok].data.hallName+'>';
										
										planHtml += '<p class="p1">'+vpObj[vok].stimes+'</p>';
										planHtml += '<p class="p2">结束</p>';
										planHtml += '<p class="p3">'+vpObj[vok].etimes+'</p>';
										
										planHtml += '<p class="p4"><span class="span_a1">'+vpObj[vok].data.hallName+'</span> </span class="span_a2">'+vpObj[vok].language+'/'+vpObj[vok].screenType+'</span></p>';
										planHtml += '<p class="p5">';
											
											planHtml += '<span class="span2">¥'+vpObj[vok].dis_price+'</span>';
										planHtml += '</p>';
										if(msg.plans_date[key][vk].day=='今天'){
											planHtml += '</a>';
										}
										//planHtml += '</a>';
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
							
							
							dayHtml += '<li '+cur+' id="'+msg.plans_date[key][tc].date+'" data_type="'+msg.plans_date[key][tc].bs+'"><span class="span1">'+msg.plans_date[key][tc].day+'</span><span class="span2">'+msg.plans_date[key][tc].fdate+'</span></li>';
							
					planHtml += '</ul>';
					//alert(planHtml);
					dayI++;
				}
				for (key in msg.noplan) {
					
					if(msg.noplancount == 4 && key == 1){
						var nocurli = ' click_li';
						var nocurul = ' click_ul';
					}else{
						var nocurli = ' ';
						var nocurul = ' ';
					}
					//alert(msg.noplancount);
					dayHtml += '<li class="'+nocurli+'"><span class="span1">'+msg.noplan[key].day+'</span><span class="span2">'+msg.noplan[key].fdate+'</span></li>';
					planHtml += '<ul class="list_li_div_ul '+nocurul+'" style="text-align:center">暂无排期！</ul>';
				}
				
				$('.swiper_nav_h3').html(yphd);
				if(planHtml!=''){
					$('#dateTabs').show().html(dayHtml);
					$('#swiper-wrapper').show().html(planHtml);
					$('.Null_filme').hide();
					
				}else{
					$('.Null_filme').show();
					$('#dateTabs').hide();
					//$('#swiper-wrapper').hide();
				}
				$('.swiper-slide').append();
				$('#ypdetail1').html(msg.initlists);
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
								alert(22)
								mySwiper1.swipeTo(mySwiper1.activeIndex);
								
							}

						})

						var img_wid = $('.list_lsi_div').find('.swiper-slide img').width();
						$('.list_lsi_div').find('.swiper-slide').css({
								"width":img_wid
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


$(function(){
	
	
	
	
})