$(function () {
    getPlayerList();
    jQuery.support.cors = true;
    function getPlayerList() {
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json",
            success: function (data) {
                console.log(data)
                $.each(data, function (index, ele) {
                    var $item = crateMusicItem(index, ele); 
                    var $musicList = $(".contenList ul");
                    $musicList.append($item);
                });
            },
            error: function (e) {
                console.log(e)
            }
        })
    }
    function crateMusicItem(index, music) {
        var num =index+1
        console.log(num)
        var $item = $('<li class="listMusic">'+
                           ' <div class="listCheck"><span></span></div>'+
                           ' <div class="listNumber">'+num+'</div>'+
                            '<div class="listName">'+music.name+
                               ' <div class="listMenu">'+
                                   ' <div></div>'+
                                   ' <div></div>'+
                                  '  <div></div>'+
                                   ' <div></div>'+
                               ' </div>'+
                           ' </div>'+
                          '  <div class="listsinger">'+music.singer+'</div>'+
                            '<div class="listTime">'+
                                '<span>'+music.time+'</span> '+
                                '<div></div>'+
                           ' </div>'+
                        '</li>');
        return $item;
    }
})