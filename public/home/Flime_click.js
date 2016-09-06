import $ from 'jquery';
$(".flim_list_huo .img_show_hide").on("click",function(){
  var true_false = $(this).hasClass("show_img"),
  len = $(".flim_list_huo").find("li").length;
  //console.log(true_false)
  if(true_false){
    $(".show_img").hide().siblings('.hidde_img').show();
    $(".flim_list_huo").css({
      "height":1.3+'rem'
    })
  }else{
    $(".show_img").show().siblings('.hidde_img').hide();
    $(".flim_list_huo").css({
      "height":1.3*len+'rem'
    })
  }
})
