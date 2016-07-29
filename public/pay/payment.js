import $ from 'jquery';
$(function(){
	$('.user_quan_s').hide();
})
$('.h3_left').on('click',function(){
		
})
$('.h3_right').on('click',function(){
	$('.user_quan_s').hide();
})
$('.you_hui').on('click',function(){
	$('.user_quan_s').show();
})
$('.coupon_dl').on('click',function(){
	var index = $(this).attr('val_index');
	if(index%2==1){
		$(this).find('.Btn_check').show();
		$(this).attr('val_index',2)
	}else{
		$(this).find('.Btn_check').hide();
		$(this).attr('val_index',1)
	}
	
})

//倒计时  	

var toDate = out_time;
  toDate = toDate.replace(/-/g,"/"); 
var EndTime = new Date(toDate);
function getRTime(){
	var NowTime = new Date();
	var t =EndTime.getTime() - NowTime.getTime();
	var m=Math.floor(t/1000/60%60);
	var s=Math.floor(t/1000%60);
	if(t > 0){
		var ms = checkTime(m) + " 分 " + checkTime(s) + " 秒 ";
		$('#timer').html(ms);
	}else{
		//alert('订单超时,请重新选座！');
		//location.href='/index.php/index/indexInt?yc={$ycname}';
		//return false;
	}
	
}

 function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
setInterval(getRTime, 1000);
