import $ from 'jquery';
$('.order_li').click(function(){
  var li_num = $(this).index();
  $('.order_li:eq('+li_num+')').addClass('order_li_on').siblings().removeClass('order_li_on');
  $('.list:eq('+li_num+')').css('display','block').siblings('.list').css('display','none');
});


// 优惠券信息
var sign = 0;
    $(".bot_div>img").click(function(){
      if(sign==0){
        $(this).siblings(".bottom").css("display","block");
        $(this).attr("src","/assets/user/images/xia.png");
        sign = 1;

      }else{
        $(this).siblings(".bottom").css("display","none");
        $(this).attr("src","/assets/user/images/shang.png");
        sign = 0;

      }

    })

    var mark = $(this).children("img").css("display");
    $(".coupon_dl").click(function(){
      var mark = $(this).children("img").css("display");
      var label = 0;
      // alert(mark);
      if(mark == "none"){
        $(this).children("img").css("display","block");
        $(this).siblings(".coupon_dl").children("img").css("display","none");
        var label = 1;
      }else if(mark == "block"){
        $(this).children("img").css("display","none");
        var label = 0;
      }
      // console.log(label);
      if(label ==0){
        $(".buyTiket").addClass("invalid");
        $(".buyTiket").attr("href","javascript:;");

      }else{
        $(".buyTiket").removeClass("invalid");
        $(".buyTiket").attr("href","");
      }


    })

