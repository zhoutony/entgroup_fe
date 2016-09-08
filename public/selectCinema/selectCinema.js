import $ from 'jquery';


// 选择影城

  $(function(){
    $('.list_li').click(function(){
      var li_index = $(this).index()+1;
      var li_len = $(".bottom_list>li").length;
      // alert(li_len)
      for(i=0;i<li_len;i++){
        $(".list_li:eq("+i+")").children("img").attr("src","./images/index/li"+(i+1)+".png");
      }
      $(this).children("img").attr("src","./images/index/li"+li_index+"_on.png");

    })

    $(".select_left_li").click(function(){
      $(this).addClass("select_left_li_on").siblings("li").removeClass("select_left_li_on");
    })

    var clHeight = document.body.clientHeight;
    var topHeight = $(".top_ipt").outerHeight(true);

    var leftHeight = clHeight - topHeight;
    // alert(topHeight);
    $(".select_left").css("height",leftHeight+"px");
    $(".select_right").css("height",leftHeight+"px");
    $(".select_ipt").keyup(function(){

      $(".select_list_all2").css("display","block").siblings(".select_list_all").css("display","none");
      $(".select_empty").css("display","block");
    })
    $(".select_empty").click(function(){
      $(".select_ipt").val("");
      $(".select_list_all2").css("display","none").siblings(".select_list_all").css("display","block");
      $(this).css("display","none");
    })
  })
