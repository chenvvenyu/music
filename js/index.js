$(function(){
    // 1.监听歌曲的
    $(".listMusic").hover(function(){
        //进入
        $(this).find(".listMenu").stop().fadeIn(100);
        $(this).find(".listTime div").stop().fadeIn(100);
        $(this).find(".listTime span").stop().fadeOut(0);
    },function(){
        // 移除
        $(this).find(".listMenu").stop().fadeOut(100);
        $(this).find(".listTime div").stop().fadeOut(0);
        $(this).find(".listTime span").stop().fadeIn(100);
    }),
    $(".listCheck").click(function(){
        $(this).toggleClass("listChecked")
    }),
    $(".musicOnly").click(function(){
        $(this).toggleClass("musicOnlyed")
    }),
    $(".musicMode").click(function(){
        $(this).toggleClass("musicMode2 musicMode3 musicMode4 musicMode5 musicMode6 musicMode7 musicMode8")
    }),
    $(".musicFav").click(function(){
        $(this).toggleClass("musicFav2")
    })
})
