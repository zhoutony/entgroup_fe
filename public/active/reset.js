import $ from 'jquery';
$(".icon_menu_ul li").on("click",function(){
    $(this).addClass("on").siblings(".on").removeClass('on');
    var index = $(this).index();
    $(".film-list").find("ul").eq(index).addClass("show_ul").siblings().removeClass('show_ul')
})
