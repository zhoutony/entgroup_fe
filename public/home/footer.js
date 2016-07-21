import $ from 'jquery';
	$(".footer_ul").on("click","li",function(){
		$(this).addClass('footer_li_on').siblings('.footer_li_on').removeClass('footer_li_on');
		var index = $(this).index();
		var len   = $(".footer_ul").find('li').length;
		for(var i = 1 ;i<=len ;i++){
			
			if(i==index){
				$(".footer_ul").find('li').eq(i-1).find('img').attr('src','/assets/home/footer/img'+i+'_on.png')
			}else{
				$(".footer_ul").find('li').eq(i-1).find('img').attr('src','/assets/home/footer/img'+i+'.png')
			}
		}

	})

