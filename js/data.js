$(function () {
    
    var $audio=$("audio");
    var player=new Player($audio);
    var lyric;

    jQuery.support.cors = true;
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
        var $lryicContainer=$(".songLyric")
        lyric.loadLyric(function(){
            $.each(lyric.lyrice,function(index,ele){
                var $item=$("<li>"+ele+"</li>");
                $lryicContainer.append($item);
            })
        });
    }
})