(function(window){
    function Player($audio){
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor:Player,
        musicList:[],
        init:function($audio){
            this.$audio=$audio;
            this.audio=$audio.get(0);
        },
        currentIndex:-1,
        playMusic:function (index,music){
            if(this.currentIndex==index){
                // 同首
                if(this.audio.paused){
                    this.audio.play();
                }else{
                    this.audio.pause()
                }
            }else{
                //不是同一首
                this.$audio.attr("src",music.link_url);
                this.audio.play();
                this.currentIndex =index
            }
        }
    }
    Player.prototype.init.prototype =Player.prototype;
    window.Player =Player;
})(window);