(function($){
    var $element = $("#password");
    var $clearButton = $("#clear-mp-input");
    var formatedPassword="";
    var timeoutId = 0;
    var keyPress=0;
    var timer=0;
    var keysSource = {
        "so-c": "clips/s0c.mp3",
        "so-d" : "clips/s0d.mp3",
        "so-e" : "clips/s0e.mp3",
        "so-f" : "clips/s0f.mp3",
        "so-g" : "clips/s0g.mp3",
        "so-a" : "clips/s0a.mp3",
        "so-b" : "clips/s0b.mp3",
        "fo-c" : "clips/f0c.mp3"
    };
    console.log($element.val());
    $(".mp-keys").on("click",function(){
        var key = $(this).data("key");
        if(keysSource[key]!== null){
            playSound(keysSource[key])
            generatePassword(key)
        }
        console.log(key);
        outputPassword();
    });

    $clearButton.on("click",function(){
        clearMp();
        return false;
    });
    
    function clearMp(){
        $element.attr("value","");
        formatedPassword="";
    }

    function checkBroswerCompat(){
        return true;
    }

    function playSound(source){
        if(checkBroswerCompat()){
            var audio = new Audio(source);
            audio.play();
        }
    }

    function playSoundFallBack(){

    }

    function generatePassword(attribute){
        formatedPassword = formatedPassword+attribute;
    }

    function outputPassword(){
        $element.val(formatedPassword);
        console.log(formatedPassword);
    }


})(jQuery);