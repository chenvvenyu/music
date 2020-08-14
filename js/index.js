$(function(){
    // 1.监听歌曲的
    var $audio=$("audio");
    var player=new Player($audio);
    $(".contenList").delegate(".listMusic","mouseenter",function(){
        //进入
        $(this).find(".listMenu").stop().fadeIn(100);
        $(this).find(".listTime div").stop().fadeIn(100);
        $(this).find(".listTime span").stop().fadeOut(0);
    });
    $(".contenList").delegate(".listMusic","mouseleave",function(){
        // 移除
        $(this).find(".listMenu").stop().fadeOut(100);
        $(this).find(".listTime div").stop().fadeOut(0);
        $(this).find(".listTime span").stop().fadeIn(100);
    });
    //监听选项
    $(".contenList").delegate(".listCheck","click",function(){
        $(this).toggleClass("listChecked");
        $(this).parents(".listMusic").toggleClass("listMusiced");
    });
    //监听列表播放
    var $musicPlay =$(".musicPlay");
    $(".contenList").delegate(".listMenuPlay","click",function(){
        var $item =$(this).parents(".listMusic")
        
        // 选中渲染
        $(this).toggleClass("listMenuPlayed");
        $item.find(".listNumber").toggleClass("listNumbered");
        $item.toggleClass("listMusiced");
        // 
        //选中后取消渲染
        $item.siblings().find(".listMenuPlay").removeClass("listMenuPlayed");
        $item.siblings().find(".listNumber").removeClass("listNumbered");
        $item.siblings().removeClass("listMusiced");
        //选中后是否渲染
        if($(this).attr("class").indexOf("listMenuPlayed")!=-1){
            $musicPlay.addClass("musicPlayed");
        }else{
            $musicPlay.removeClass("musicPlayed");
        }
        //播放
        player.playMusic( $item.get(0).index,$item.get(0).music);
        footMusic( $item.get(0).index,$item.get(0).music)
    })
    $(".musicOnly").click(function(){
        $(this).toggleClass("musicOnlyed")
    }),
    $(".musicMode").click(function(){
        $(this).toggleClass("musicMode2 musicMode3 musicMode4 musicMode5 musicMode6 musicMode7 musicMode8")
    }),
    $(".musicFav").click(function(){
        $(this).toggleClass("musicFav2")
    })

    function footMusic(index,music){
        $(".musicProgressName").html(music.name+'/'+music.singer);
        $(".songNameCon").html(music.name);
        $(".singerCon").html(music.singer);
        $(".songAblumCon").html(music.album);
        $(".songInfoImg").attr('src',music.cover);
        $(".maskBg").css("background-image","url(" +music.cover+ ")");
    }
})
