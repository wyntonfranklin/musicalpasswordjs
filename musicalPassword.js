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
    mpDivId ="wf-mp-ds-div",
    mpDivClass="wf-mp-keyboard",
    mpKeysClass="wf-mp-keys",
    mpClearButtonId="wf-mp-clear",
    formatedPassword="",
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
    defaults = {
        offset : 30,
        timer : true,
    };

    function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = musicalPassword;
		this.init();
    }

    Plugin.prototype = {
        init: function() {
            var _this = this;

            console.log("plugin started...");
            $(this.element).attr("readOnly","readOnly");
            draw(); // draw layout

            var mpDisplay = $("#"+mpDivId);
            $(this.element).on("click",function(){
                console.log("Field clicked...");
                var elPosition = $(this).offset();
                var topPosition = elPosition.top + defaults.offset;
                mpDisplay.css({"display":"inline-block"});
                mpDisplay.css({left:elPosition.left,top:topPosition});
                return false;
            });
            $("."+mpKeysClass).on("click",function(event){
                event.stopPropagation();
                var key = $(this).data("key");
                if(keysSource[key]!== null){
                    play(keysSource[key])
                    generatePassword(key)
                    outputPassword();
                    if(defaults.timer){
                        recordTiming();
                    }
                }
            });
            $("#"+mpClearButtonId).on("click",function(){
                clearInput();
                return false; 
            });
            $("#wf-done-button").on("click",function(){
                console.log("Done button pressed");
                stopRecording();
                return false;
            });
            $(document).on("click",function(){
                mpDisplay.css({"display":"none"});
            });
            $(this.element).on('keydown', function(event) {
                var key = event.keyCode || event.charCode;
                return false;
            });

            function play(source){
                var audio = new Audio(source);
                audio.play();
            }

            function generatePassword(attribute){
                formatedPassword = formatedPassword+attribute;
                console.log(formatedPassword);
            }

            function draw(){
                generateHtml();
            }

            function generateHtml(){
                var header = '<div id="'+mpDivId+'" class="'+mpDivClass+'">';
                var clearButton ='<br><input id="'+mpClearButtonId+'" type="button" value="Clear">';
                var finishButton = '<input id="wf-done-button" type="button" value="Done">';
                var footer = '</div>';
                var pageBreak = '<br>';
                var counter=0;
                var showtemplate = function(key, name){
                    var template = '<span class="'+mpKeysClass+'" data-key="'+key+'">'+name+'</span>';  
                    return template;  
                };
                var output = header;
                for (var prop in divTags) {
                    if(counter==4)
                        output += pageBreak;
                    output += showtemplate(prop,divTags[prop]);
                    counter++;
                }
                output+= clearButton;
                if(defaults.timer)
                    output += finishButton; 
                output+= footer;
                $(document.body).append(output);
            }

            function outputPassword(){
                $(_this.element).val(formatedPassword);
                console.log(formatedPassword);     
            }

            function clearInput(){
                $(_this.element).attr("value","");
                $(_this.element).val("");
                formatedPassword="";   
            }

            function recordTiming(){
                timing.push(timer);
                generatePassword(timer);
                console.log("Current time " + timer);
                console.log(timing);
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
                console.log(timing);
                outputPassword();
            }
        }

    };

    $.fn[musicalPassword] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + musicalPassword)) {
				$.data(this, "plugin_" + musicalPassword, new Plugin(this, options));
			}
		});
    };

})(jQuery, window, document);
