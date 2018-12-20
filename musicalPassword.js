/*
 * jQuery musicalPasswordJs Plugin 1.0.0
 * https://github.com/
 *
 * Copyright 2018, Wynton Franklin
 * http://www.igestdevelopment.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

;(function($, window, document, undefined) {

    var musicalPassword = "musicalPassword",
    timing = [],
    timer=0,
    timerId,
    keysSource = {
        "so-c" : "assets/s0c.mp3",
        "so-d" : "assets/s0d.mp3",
        "so-e" : "assets/s0e.mp3",
        "so-f" : "assets/s0f.mp3",
        "so-g" : "assets/s0g.mp3",
        "so-a" : "assets/s0a.mp3",
        "so-b" : "assets/s0b.mp3",
        "fo-c" : "assets/f0c.mp3"
    },
    divTags = {
        "so-c" : "C",
        "so-d" : "D",
        "so-e" : "E",
        "so-f" : "F",
        "so-g" : "G",
        "so-a" : "A",
        "so-b" : "B",
        "fo-c" : "C",
    },
    passwordMapping = {
        "so-c" : "P)x!6r",
        "so-d" : "R8b]e6",
        "so-e" : "FQz_8s",
        "so-f" : "zy3-Bv",
        "so-g" : "p#2W9A",
        "so-a" : "2<r@R9",
        "so-b" : "5ZgR_7",
        "fo-c" : "5?+xU$",
    },
    defaults = {
        offset : 30,
        timer : true,
        identifier:"default"
    };

    function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = musicalPassword;
		this.init();
    }

    $.extend( Plugin.prototype, {
        init: function() {
            var _this = this;

            console.log("plugin started...");

            $(this.element).attr("readOnly","readOnly");

            draw(); // draw layout
            $(this.element).on("click",function(){
                console.log(_this.settings);
                var position = $(this).offset();
                var tp = position.top + defaults.offset;
                var divElement = $('div[style*="top: '+tp+'px"]');
                onElementClicked(this, divElement);
                clearKeyboardLayouts();
                divElement.css({"display":"inline-block"});
                return false;
            });


            function onElementClicked(el, $div){
                if(!$div.find(".wf-mp-keys").length > 0){
                    var keysHtml = generateKeysHtml();
                    $div.prepend(keysHtml);
                    $div.on('click',".wf-mp-keys",function(event){
                        onKeysClicked(event, this);
                        return false;
                    });
                    $div.on('click','.wf-mp-clear',function(){
                        clearInput();
                        return false;
                    });
                    $div.on('click','.wf-done-button',function(){
                        console.log("Done button pressed");
                        stopRecording();
                        return false;
                    });
                }

            }
            $(document).on("click",function(){
                clearKeyboardLayouts();
            });
            $(this.element).on('keydown', function(event) {
                var key = event.keyCode || event.charCode;
                return false;
            });

            function onKeysClicked(event, element){
                event.stopPropagation();
                var $element = $(element);
                var key = $element.data("key");
                if(keysSource[key]!== null){
                    play(keysSource[key])
                    outputPassword(key);
                    if(defaults.timer){
                      //  recordTiming();
                    }
                }
            }

            function clearKeyboardLayouts(){
                $(".wf-mp-keyboard").css({"display":"none"});  
            }

            function play(source){
                var audio = new Audio(source);
                audio.play();
            }


            function draw(){
                var elPosition = $(_this.element).offset();
                console.log(elPosition);
                var topPosition = elPosition.top + defaults.offset;
                var leftPosition = elPosition.left;
                generateHtml(topPosition, leftPosition);
            }

            function generateHtml(top, left){
                var header = '<div class="wf-mp-keyboard" style="top: '+top+'px; left:'+left+'px">';
                var clearButton ='<br><input class="wf-mp-clear" type="button" value="Clear">';
                var finishButton = '<input class="wf-done-button" type="button" value="Done">';
                var footer = '</div>';
                var output = header;
                output+= clearButton;
                if(defaults.timer)
                    output += finishButton; 
                output+= footer;
                $(document.body).append(output);
            }

            function generateKeysHtml(){
                var output="";
                var pageBreak = '<br>';
                var counter=0;
                var showtemplate = function(key, name){
                    var template = '<span class="wf-mp-keys" data-key="'+key+'">'+name+'</span>';  
                    return template;  
                };
                for (var prop in divTags) {
                    if(counter==4)
                        output += pageBreak;
                    output += showtemplate(prop,divTags[prop]);
                    counter++;
                }
                return output;
            }

            function outputPassword(key){
                var $el = $(_this.element);
                var currentValue = $el.val();
                var updatedPassword = currentValue+ passwordMapping[key]
                $el.val(updatedPassword);
                console.log("element value is: " + $el.val());   
                console.log("element id is : " + $el.attr("id"));  
            }

            function clearInput(){
                $(_this.element).attr("value","");
                $(_this.element).val(""); 
            }

            function recordTiming(){
                timing.push(timer);
                outputPassword(timer);
                console.log("Current time " + timer);
                clearInterval(timerId);
                timer=0;
                timerId = setInterval(function(){
                    timer++;
                }, 1000);
            }

            function stopRecording(){
                clearInterval(timerId);
                timing.push(timer);
                console.log("Current time " + timer);
                outputPassword();
            }
        }

    } );

    $.fn[musicalPassword] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + musicalPassword)) {
				$.data(this, "plugin_" + musicalPassword, new Plugin(this, options));
			}
		});
    };

})(jQuery, window, document);
