import $ from 'jquery';
import { Slide_tad } from './Slide_tad.js';
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



/**支付方式****/
$(".bottom_ul li").on("click",".Btn_hide",function(){
    $(this).addClass("Btn_check").closest("li").siblings('li').find(".Btn_check").removeClass('Btn_check')
})

/*******更换会员卡支付插件*******/
var area1 = new LArea();
    area1.init({
        'trigger': '#hy_ka_Btn', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'valueTo': '#input_hide', //选择完毕后id属性输出到该位置
        'keys': {
            id: 'id',
            name: 'name'
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'data': [{"id":"1","name":"金卡101212121"},{"id":"2","name":"银卡卡101212121"},{"id":"3","name":"银卡去去去卡101212121"}] //数据源
    });
    area1.value=[1,0,0];//控制初始位置，注意：该方法并不会影响到input的value

// 验证手机号码
  $('.Ordewr_Pay3_Btn').on('click',function(){
    var mobile=$.trim($('#mobile').val());
    if(mobile == ''){
      alert('请输入取票手机号');
      $('#mobile').focus();
      return false;
    }
        var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
    if(!reg.test(mobile)){
      alert("手机号码格式不对！");
      $('#mobile').focus();
      return false;
    }
    /*
    var orderNo=$('#orderNo').val();
    var payType =$('input:radio[name="pay"]:checked').val();
    if(payType==1){
      $('#orderSub').attr("action","/pay.php/PayAlipay/a_Sub");
    }else{
      $('#orderSub').attr("action","/pay.php/pay");
    }*/
    $('#orderSub').attr("action","/pay/paywx");

    $('#orderSub').submit();

  })
