(function(windox){
    function Progress($progressBar,$progressLine,$progressDot){
        return Progress.prototype.init($progressBar,$progressLine,$progressDot);
    }
    Progress.prototype ={
        constructor:Progress,
        init:function($progressBar,$progressLine,$progressDot){
            this.$progressBar=$progressBar;
            this.$progressLine=$progressLine;
            this.$progressDot=$progressDot;
        },
        progressClick:function(){
            var $this=this;
            this.$progressBar.click(function(event){
                var normalLeft=$(this).offset().left;
                var eventLeft=event.pageX;
                $this.$progressLine.css("width",eventLeft-normalLeft)
                $this.$progressDot.css("left",eventLeft-normalLeft)
            })
        },
        progressMove:function(){
            //鼠标点击
            var $this=this;
            this.$progressBar.mousedown(function(){
                var normalLeft=$(this).offset().left;
                //鼠标移动
                $(document).mousemove(function(){
                    var eventLeft=event.pageX;
                    var a=eventLeft-normalLeft;
                    $this.$progressLine.css("width",a)
                    if(a>550){
                        $this.$progressDot.css("left",550)
                    }else{
                        if(a<0){
                            $this.$progressDot.css("left",0)
                        }else{
                            $this.$progressDot.css("left",a)
                        }
                    }
                    
                })
            });
            //鼠标抬起
            $(document).mouseup(function(){
                $(document).off("mousemove");
            })
        },
        setProgress:function(value){
            if(value<0||value>100) return;
            this.$progressLine.css({
                width:value+"%"
            }),
            this.$progressDot.css({
                left:value+"%"
            })
        }
    }
    Progress.prototype.init.prototype=Progress.prototype;
    windox.Progress =Progress;
})(window)