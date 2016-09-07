import $ from 'jquery';

/*****点击绑定会员卡弹出框提示***/
function Pop_Up1(){
  $(".pop_up").remove();

}
function Pop_Up(text){
  var html = '';
    html+='<div class="pop_up">';
      html+='<div class="mack"></div>';
      html+='<div class="error-btn">';
        html+='<a>'+text+'<br>请重新输入</a>';
      html+='</div>';
    html+='</div>';
$(".box").append(html);
var win_hei = $(window).height(),
    obj_hei = $(".error-btn").height();
    $(".error-btn").css({
      "top":win_hei/2-obj_hei/2
    })
     setTimeout(Pop_Up1,2000);
}

var time;
$(".enter-btn").on("click",function(){
  new Pop_Up("密码错误")

})

/*****显示密码和隐藏密码****/
var hide_show = 0;
$(".X_S").on("click",function(){
  hide_show++;
  if(hide_show%2==1){
     $(this).siblings('input').attr("type","text")
  }else{
    $(this).siblings('input').attr("type","password")
  }
})

/*****删除密码****/
$(".C_H").on("click",function(){
  $(this).siblings('input').val('')
})

