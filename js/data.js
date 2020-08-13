$(function(){
    getPlayerList();
    jQuery.support.cors = true;     
    function getPlayerList(){
        $.ajax({
            url:"./source/musiclist.json",
            dataType:"json",
            success:function(data){
                console.log(data)
            },
            error:function(e){
                console.log(e)
            }
        })
    }
})