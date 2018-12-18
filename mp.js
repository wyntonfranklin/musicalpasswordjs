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
    keysSource = {
        "so-c": "assets/s0c.mp3",
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
        offset : 30
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
             _this.draw(_this);
            _this.listeners();
        },
        listeners:function(){
            var _this = this;
            var mpDisplay = $("#"+mpDivId);
            $(this.element).on("click",function(){
                console.log("Field clicked...");
                mpDisplay.css({"display":"inline-block"});
                return false;
            });
            $("."+mpKeysClass).on("click",function(event){
                event.stopPropagation();
                var key = $(this).data("key");
                if(keysSource[key]!== null){
                    _this.play(keysSource[key])
                    _this.generatePassword(key)
                    _this.outputPassword();
                }
            });
            $("#"+mpClearButtonId).on("click",function(){
                $(_this.element).attr("value","");
                formatedPassword="";
               return false; 
            });
            $(document).on("click",function(){
                mpDisplay.css({"display":"none"});
            });
        },
        play : function(source){
            var audio = new Audio(source);
            audio.play();
        },
        generatePassword : function(attribute){
            formatedPassword = formatedPassword+attribute;
            console.log(formatedPassword);
        },
        draw: function(_this){
            var elPosition = $(this.element).offset();
            console.log(elPosition);
            var topPosition = elPosition.top + defaults.offset;
            var style ="top:"+topPosition+"px; left:"+elPosition.left+"px;";
            _this.generateHtml(style);
        },
        generateHtml : function(style){
            var header = '<div id="'+mpDivId+'" class="'+mpDivClass+'" style="'+style+'">';
            var footer = '<br><input id="'+mpClearButtonId+'" type="button" value="Clear"></div>';
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
            output+= footer;
            $(document.body).append(output);
        },
        outputPassword: function(){
            $(this.element).val(formatedPassword);
            console.log(formatedPassword);
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
