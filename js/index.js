$(function(){
    // 1.监听歌曲的
    var $audio=$("audio");
    var player=new Player($audio);
    var progress;
    var voiceProgress;
    var lyric;
    jQuery.support.cors = true;
    //初始化数据
    getPlayerList();
    function getPlayerList() {
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json",
            success: function (data) {
                player.musicList=data;
                var $musicList = $(".contenList ul");
                $.each(data, function (index, ele) {
                    var $item = crateMusicItem(index, ele); 
                    $musicList.append($item);
                });
                initMusicLyric(data[0]);
            },
            error: function (e) {
                console.log(e)
            }
        })
    }
    //进度条初始化
    initProgress();
    function initProgress() {
        var $progressBar =$(".musicProgressInfoBar");
        var $progressLine=$(".musicProgressLine");
        var $progressDot =$(".musicProgressDot");
        progress = Progress($progressBar,$progressLine,$progressDot);
        progress.progressClick(function(value){
            player.musicSeekTo(value);
        });
        progress.progressMove(function(value){
            player.musicSeekTo(value);
        });
        // 声音进度条
        var $voiceBar =$(".musicVoiceInfoBar");
        var $voiceLine=$(".musicVoiceLine");
        var $voiceDot =$(".musicVoiceDot");
        voiceProgress = Progress($voiceBar,$voiceLine,$voiceDot);
        voiceProgress.progressClick(function(value){
            player.musicVoiceSeelTo(value);
        });
        voiceProgress.progressMove(function(value){
            player.musicVoiceSeelTo(value);
        });
    }
    //事件初始化
    initFun();
    function initFun(){
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
        var $musicPlay =$(".footMusicPlay");
        $(".contenList").delegate(".listMenuPlay","click",function(){
            var $item =$(this).parents(".listMusic")
            
            // 选中渲染
            $(this).toggleClass("listMenuPlayed");
            $item.find(".listNumber").toggleClass("listNumbered");
            $item.toggleClass("listMusiced");
    
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
            footMusic( $item.get(0).index,$item.get(0).music);
            initMusicLyric($item.get(0).music);
        });
    
        //删除
        $(".contenList").delegate(".listOut","click",function(){
            var $item =$(this).parents(".listMusic");
            $item.remove();
            player.changeMusic($item.get(0).index);
            $(".listMusic").each(function(index,ele){
                ele.index =index;
                $(ele).find(".listNumber").text(index+1);
            })
        })
    
        //底部按钮
        $(".musicPre").click(function(){
            $(".listMusic").eq(player.proIndex()).find(".listMenuPlay").trigger("click");
        })
        $(".footMusicPlay").click(function(){
            if(player.currentIndex ==- 1){
                $(".listMusic").eq(0).find(".listMenuPlay").trigger("click");
            }else{
                $(".listMusic").eq(player.currentIndex).find(".listMenuPlay").trigger("click");
            }
        })
        $(".musicNext").click(function(){
            console.log(player.musicList)
            $(".listMusic").eq(player.currentIndex+1).find(".listMenuPlay").trigger("click");
        })
        //声音按钮
        $(".musicVoiceIcon").click(function(){
            $(".musicVoiceIcon").toggleClass("musicVoiceIconed")
            if($(this).attr("class").indexOf("musicVoiceIconed")!=-1){
                player.musicVoiceSeelTo(0);
            }else{
                player.musicVoiceSeelTo(1);
            }
        })
        
        // 底部进度条
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
            $(".time").html(music.time)
            $(".songNameCon").html(music.name);
            $(".singerCon").html(music.singer);
            $(".songAblumCon").html(music.album);
            $(".songInfoImg").attr('src',music.cover);
            $(".maskBg").css("background-image","url(" +music.cover+ ")");
        }
    
        //未开发
        $(".logoing,.shezhi,.box").click(function(){
            alert("功能尚未开发")
        })
    }
    //监听音乐进度
    player.musicTimeUpdate(function(duration,currentTime,time){
        $(".nowTime").html(time)
        //监听进度条进度
        var value =currentTime/duration*100;
        progress.setProgress(value)
        //歌词同步
        var index=lyric.currentIndex(currentTime);
        console.log(index);
        var $item=$(".songLyric li").eq(index);
        $item.addClass("cur")
        $item.siblings().removeClass("cur")

        if(index<=1)return;
            $(".songLyric").css({
            marginTop:((-index+1)*20)
        });
        
    })

    function crateMusicItem(index, music) {
        var num =index+1;
        var $item = $('<li class="listMusic">'+
                           ' <div class="listCheck"><span></span></div>'+
                           ' <div class="listNumber">'+num+'</div>'+
                            '<div class="listName">'+music.name+
                               ' <div class="listMenu">'+
                                   ' <div class="listMenuPlay"></div>'+
                                   ' <div></div>'+
                                  '  <div></div>'+
                                   ' <div></div>'+
                               ' </div>'+
                           ' </div>'+
                          '  <div class="listsinger">'+music.singer+'</div>'+
                            '<div class="listTime">'+
                                '<span>'+music.time+'</span> '+
                                '<div class="listOut"></div>'+
                           ' </div>'+
                        '</li>');
        $item.get(0).index=index;
        $item.get(0).music=music;
        return $item;
    }
    function initMusicLyric(music){
        lyric =new Lyric(music.link_lrc);
        var $lryicContainer=$(".songLyric");
        $lryicContainer.html("")
        lyric.loadLyric(function(){
            $.each(lyric.lyrice,function(index,ele){
                var $item=$("<li>"+ele+"</li>");
                $lryicContainer.append($item);
            })
        });
    }
})
