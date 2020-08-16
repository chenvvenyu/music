(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor: Player,
        musicList: [],
        init: function ($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex: -1,
        //播放按钮
        playMusic: function (index, music) {
            if (this.currentIndex == index) {
                // 同首
                if (this.audio.paused) {
                    this.audio.play();
                } else {
                    this.audio.pause()
                }
            } else {
                //不是同一首
                this.$audio.attr("src", music.link_url);
                this.audio.play();
                this.currentIndex = index
            }
        },
        //上一首
        proIndex: function () {
            var index = this.currentIndex - 1;
            if (index < 0) {
                index = this.musicList.length - 1;
            }
            return index;
        },
        //下一首
        nextIndex: function () {
            var index = this.currentIndex + 1;
            console.log(this.musicList.length);
            if (index > this.musicList.length - 1) {
                index = 0;
            }
            return index;
        },
        //删除
        changeMusic: function (index) {
            this.musicList.splice(index, 1);
        },
        //处理进度条时间
        formatDate: function (currentTime, duration) {
            var startMin = parseInt(currentTime / 60);
            var startSec = parseInt(currentTime % 60);
            if (startMin < 10) {
                startMin = "0" + startMin;
            }
            if (startSec < 10) {
                startSec = "0" + startSec;
            }
            return startMin + ":" + startSec + "/";
        },
        //进度条时间绑定
        musicTimeUpdate: function (callBack) {
            var $this = this;
            this.$audio.on("timeupdate", function () {
                var duration = $this.audio.duration;
                var currentTime = $this.audio.currentTime;
                var timeStr = $this.formatDate(currentTime, duration);
                $(".nowTime").html(timeStr);
                callBack(duration,currentTime,timeStr)
            })
        },
        //进度条 加载音乐
        musicSeekTo:function(value){
            this.audio.currentTime=this.audio.duration*value;
        },
        //设置音量
        musicVoiceSeelTo:function(value){
            //0~1
            if(value>1){
                this.audio.volume=1;
            }else if(value<0){
                this.audio.volume=0;
            }else{
                this.audio.volume=value;
            }
        }
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
})(window);