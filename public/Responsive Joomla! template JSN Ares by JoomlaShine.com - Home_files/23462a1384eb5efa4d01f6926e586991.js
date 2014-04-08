// Include: /joomla-templates/jsn_ares/pro/cache/jsn_ares_pro/e1c845276a23c6a1f06c889497e8a9e4.js
// Include: /joomla-templates/jsn_ares/pro/cache/jsn_ares_pro/012170222d6938b89cfd13e00b6911e1.js
// Include: /joomla-templates/jsn_ares/pro/cache/jsn_ares_pro/e6de1746182f6992e4bfcf6e90997531.js
// Include: /joomla-templates/jsn_ares/pro/cache/jsn_ares_pro/208e53f8343d4cd36de371db524eae1f.js



/* FILE: /plugins/jsnimageshow/themegrid/assets/js/jquery/jquery.kinetic.js */
/*!
    jQuery.kinetic v1.2
    Dave Taylor http://the-taylors.org/jquery.kinetic

    The MIT License (MIT)
    Copyright (c) <2011> <Dave Taylor http://the-taylors.org>
*/
/*
    Options
    =======
    slowdown    {number}    default: 0.9    This option affects the speed at which the scroll slows
    x           {string}    default: true   Toggles movement along the x axis
    y           {string}    default: true   Toggles movement along the y axis
    maxvelocity {number}    default: 40     This option puts a cap on speed at which the container
                                            can scroll
    throttleFPS {number}    default: 60     This adds throttling to the mouse move events to boost
                                            performance when scrolling
    movingClass {object} 
        up:     {string}    default: 'kinetic-moving-up'
        down:   {string}    default: 'kinetic-moving-down'
        left:   {string}    default: 'kinetic-moving-left'
        right:  {string}    default: 'kinetic-moving-right'
    
    deceleratingClass {object} 
        up:     {string}    default: 'kinetic-decelerating-up'
        down:   {string}    default: 'kinetic-decelerating-down'
        left:   {string}    default: 'kinetic-decelerating-left'
        right:  {string}    default: 'kinetic-decelerating-right'
    

    Listeners:  All listeners are called with:
                - this = jQuery object holding the scroll container
                - a single settings argument which are all the options and  
                  { scrollLeft, scrollTop, velocity, velocityY }

    moved       {function(settings)}           A function which is called on every move
    stopped     {function(settings)}           A function which is called once all 
                                               movement has stopped

    Methods:    You can call methods by running the kinetic plugin
                on an element which has already been activated.

                eg  $('#wrapper').kinetic(); // activate
                    $('#wrapper').kinetic('methodname', arguments);

    start       Start movement in the scroll container at a particular velocity.
                This velocity will not slow until the end method is called.

                The following line scrolls the container left.
                $('#wrapper#).kinetic('start', { velocity: -30 });

                The following line scrolls the container right.
                $('#wrapper#).kinetic('start', { velocity: 30 });

                The following line scrolls the container diagonally.
                $('#wrapper#).kinetic('start', { velocity: -30, velocityY: -10 });

    end         Begin slowdown of any scrolling velocity in the container.
                $('#wrapper#).kinetic('end');

    */
/*jslint browser: true, vars: true, white: true, forin: true, indent: 4 */
/*global define,require */
(function($){
	'use strict';

    var DEFAULT_SETTINGS    = { decelerate: true
                              , y: true
                              , x: true
                              , slowdown: 0.9
                              , maxvelocity: 40 
                              , throttleFPS: 60
                              , movingClass: {
                                  up:    'kinetic-moving-up'
                                , down:  'kinetic-moving-down'
                                , left:  'kinetic-moving-left'
                                , right: 'kinetic-moving-right'
                                }
                              , deceleratingClass: {
                                  up:    'kinetic-decelerating-up'
                                , down:  'kinetic-decelerating-down'
                                , left:  'kinetic-decelerating-left'
                                , right: 'kinetic-decelerating-right'
                                }
                              },
        SETTINGS_KEY        = 'kinetic-settings';

    /**
     * Provides requestAnimationFrame in a cross browser way.
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    if ( !window.requestAnimationFrame ) {

        window.requestAnimationFrame = ( function() {

            return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
                window.setTimeout( callback, 1000 / 60 );
            };

        }());

    }

    // add touch checker to jQuery.support
    $.support = $.support || {};
    $.extend($.support, {
        touch: "ontouchend" in document
    });

    var decelerateVelocity = function(velocity, slowdown) {
        return Math.floor(Math.abs(velocity)) === 0 ? 0 // is velocity less than 1?
               : velocity * slowdown; // reduce slowdown
    };
    var capVelocity = function(velocity, max) {
        var newVelocity = velocity;
        if (velocity > 0) {
            if (velocity > max) {
                newVelocity = max;
            }
        } else {
            if (velocity < (0 - max)) {
                newVelocity = (0 - max);
            }
        }
        return newVelocity;
    };
    var setMoveClasses = function(settings, classes) {
        this.removeClass(settings.movingClass.up)
            .removeClass(settings.movingClass.down)
            .removeClass(settings.movingClass.left)
            .removeClass(settings.movingClass.right)
            .removeClass(settings.deceleratingClass.up)
            .removeClass(settings.deceleratingClass.down)
            .removeClass(settings.deceleratingClass.left)
            .removeClass(settings.deceleratingClass.right);

        if (settings.velocity > 0) {
            this.addClass(classes.right);
        }
        if (settings.velocity < 0) {
            this.addClass(classes.left);
        }
        if (settings.velocityY > 0) {
            this.addClass(classes.down);
        }
        if (settings.velocityY < 0) {
            this.addClass(classes.up);
        }
        
    };
    var stop = function($scroller, settings) {
        if (typeof settings.stopped === 'function') {
            settings.stopped.call($scroller, settings);
        }
    };
    // do the actual kinetic movement
    var move = function($scroller, settings) {
        var scroller = $scroller[0];
        // set scrollLeft
        if (settings.x && scroller.scrollWidth > 0){
            scroller.scrollLeft = settings.scrollLeft = scroller.scrollLeft + settings.velocity;
            if (Math.abs(settings.velocity) > 0) {
                settings.velocity = settings.decelerate ? 
                    decelerateVelocity(settings.velocity, settings.slowdown) : settings.velocity;
            }
        }
        // set scrollTop
        if (settings.y && scroller.scrollHeight > 0){
            scroller.scrollTop = settings.scrollTop = scroller.scrollTop + settings.velocityY;
            if (Math.abs(settings.velocityY) > 0) {
                settings.velocityY = settings.decelerate ? 
                    decelerateVelocity(settings.velocityY, settings.slowdown) : settings.velocityY;
            }
        }
        setMoveClasses.call($scroller, settings, settings.deceleratingClass);
        
        if (typeof settings.moved === 'function') {
            settings.moved.call($scroller, settings);
        }

        if (Math.abs(settings.velocity) > 0 || Math.abs(settings.velocityY) > 0) {
            // tick for next movement
            window.requestAnimationFrame(function(){ move($scroller, settings); });
        } else {
            stop($scroller, settings);
        }
    };
    


    var callOption = function(method, options) {
        var methodFn = $.kinetic.callMethods[method]
        , args = Array.prototype.slice.call(arguments)
        ;
        if (methodFn) {
            this.each(function(){
                var opts = args.slice(1), settings = $(this).data(SETTINGS_KEY);
                opts.unshift(settings);
                methodFn.apply(this, opts);
            });
        }
    };

    var initElements = function(options) {
        // add to each area
        this
        .addClass('kinetic-active')
        .attr('tabindex', '0')       // enable the window to receive focus
        .each(function(){

            var settings = $.extend({}, DEFAULT_SETTINGS, options);
            
            var $this = $(this)
            ,   xpos
            ,   prevXPos = false
            ,   ypos
            ,   prevYPos = false
            ,   mouseDown = false
            ,   scrollLeft
            ,   scrollTop
            ,   throttleTimeout = 1000 / settings.throttleFPS
            ,   lastMove
            ,   elementFocused
            ;

            settings.velocity = 0;
            settings.velocityY = 0;

            // prevent selection when dragging
            $this.bind("selectstart", function () { return false; });
            // make sure we reset everything when mouse up
            var resetMouse = function() {
                xpos = false;
                ypos = false;
                mouseDown = false;
            };
            $(document).mouseup(resetMouse).click(resetMouse);

            var calculateVelocities = function() {
                settings.velocity    = capVelocity(prevXPos - xpos, settings.maxvelocity);
                settings.velocityY   = capVelocity(prevYPos - ypos, settings.maxvelocity);
            };
            var start = function(clientX, clientY) {
                mouseDown = true;
                settings.velocity = prevXPos = 0;
                settings.velocityY = prevYPos = 0;
                xpos = clientX;
                ypos = clientY;
            };
            var end = function() {
                if (xpos!==undefined && prevXPos!==undefined && settings.decelerate === false) {
                    settings.decelerate = true;
                    calculateVelocities();
                    xpos = prevXPos = mouseDown = false;
                    move($this, settings);
                }
            };
            var inputmove = function(clientX, clientY) {
                if (!lastMove || new Date() > new Date(lastMove.getTime() + throttleTimeout)) {
                    lastMove = new Date();

                    if (mouseDown && (xpos || ypos)) {
                        if (elementFocused) {
                            $(elementFocused).blur();
                            elementFocused = null;
                            $this.focus();
                        }
                        settings.decelerate = false;
                        settings.velocity   = settings.velocityY  = 0;
                        $this[0].scrollLeft = settings.scrollLeft = settings.x ? $this[0].scrollLeft - (clientX - xpos) : $this[0].scrollLeft;
                        $this[0].scrollTop  = settings.scrollTop  = settings.y ? $this[0].scrollTop - (clientY - ypos)  : $this[0].scrollTop;
                        prevXPos = xpos;
                        prevYPos = ypos;
                        xpos = clientX;
                        ypos = clientY;

                        calculateVelocities();
                        setMoveClasses.call($this, settings, settings.movingClass);

                        if (typeof settings.moved === 'function') {
                            settings.moved.call($this, settings);
                        }
                    }
                }
            };
            
            // attach listeners
            if ($.support.touch) {
                this.addEventListener('touchstart', function(e){
                    start(e.touches[0].clientX, e.touches[0].clientY);
                }, false);
                this.addEventListener('touchend', function(e){
                    if (e.preventDefault) {e.preventDefault();}
                    end();
                }, false);
                this.addEventListener('touchmove', function(e){
                    if (e.preventDefault) {e.preventDefault();}
                    inputmove(e.touches[0].clientX, e.touches[0].clientY);
                }, false);
            }else{
                $this
                    .mousedown(function(e){
                        start(e.clientX, e.clientY);
                        elementFocused = e.target;
						//if (e.target.nodeName === 'IMG'){
                            e.preventDefault();
                        //}
                    })
                    .mouseup(function(){
                        end();
                        elementFocused = null;
                    })
					.mouseleave(function(){
						end();
                    })
                    .mousemove(function(e){
                        inputmove(e.clientX, e.clientY);
						e.preventDefault();
                    })
					/******************** Joomlashine dev BEGIN ********************/
                    .css("cursor", "pointer");
					/******************** Joomlashine dev END ********************/
            }
            $this.click(function(e){
                if (Math.abs(settings.velocity) > 0) {
                    e.preventDefault();
                    return false;
                }
            });
            $this.data(SETTINGS_KEY, settings);
        });
    };

    $.kinetic = {
        settingsKey: SETTINGS_KEY
    ,   callMethods: {
            start: function(settings, options){
                var $this = $(this);
                    settings = $.extend(settings, options);
                if (settings) {
                    settings.decelerate = false;
                    move($this, settings);
                }
            }
        ,   end: function(settings, options){
                var $this = $(this);
                if (settings) {
                    settings.decelerate = true;
                }
            }
        }
    };
    $.fn.kinetic = function(options) {
        if (typeof options === 'string') {
            callOption.apply(this, arguments);
        } else {
            initElements.call(this, options);
        }
        return this;
    };

}(window.jsnThemeGridjQuery || window.Zepto));
;


/* FILE: /plugins/jsnimageshow/themegrid/assets/js/jquery/jquery.masonry.min.js */
/**
 * jQuery Masonry v2.1.05
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var g=this;setTimeout(function(){g.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){g.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d){f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jsnThemeGridjQuery);;


/* FILE: /plugins/jsnimageshow/themegrid/assets/js/jquery/jquery.prettyPhoto.js */
/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 3.1.4
------------------------------------------------------------------------- */
(function($) {
	$.prettyPhoto = {version: '3.1.4'};
	
	$.fn.prettyPhoto = function(pp_settings) {
		pp_settings = $.extend({
			hook: 'rel', /* the attribute tag to use for prettyPhoto hooks. default: 'rel'. For HTML5, use "data-rel" or similar. */
			animation_speed: 'fast', /* fast/slow/normal */
			ajaxcallback: function() {},
			slideshow: 5000, /* false OR interval time in ms */
			autoplay_slideshow: false, /* true/false */
			opacity: 0.80, /* Value between 0 and 1 */
			show_title: true, /* true/false */
			allow_resize: true, /* Resize the photos bigger than viewport. true/false */
			allow_expand: false, /* Allow the user to expand a resized image. true/false */
			default_width: 500,
			default_height: 344,
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			horizontal_padding: 20, /* The padding on each side of the picture */
			hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque', /* Set the flash wmode attribute */
			autoplay: true, /* Automatically start videos: True/False */
			modal: false, /* If set to true, only the close button will close the window */
			deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
			overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
			overlay_gallery_max: 1000, /* Maximum number of pictures in the overlay gallery */
			keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
			changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
			callback: function(){}, /* Called when prettyPhoto is closed */
			ie6_fallback: true,
			markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous">Previous</a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next">Next</a> \
											</div> \
											<p class="pp_description"></p> \
											<div class="pp_social">{pp_social}</div> \
											<a class="pp_close" href="#">Close</a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
			gallery_markup: '<div class="pp_gallery"> \
								<a href="#" class="pp_arrow_previous">Previous</a> \
								<div> \
									<ul> \
										{gallery} \
									</ul> \
								</div> \
								<a href="#" class="pp_arrow_next">Next</a> \
							</div>',
			image_markup: '<img id="fullResImage" src="{path}" />',
			flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
			quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
			iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
			inline_markup: '<div class="pp_inline">{content}</div>',
			custom_markup: '',
			social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>' /* html or false to disable */
		}, pp_settings);
		
		// Global variables accessible only by prettyPhoto
		var matchedObjects = this, percentBased = false, pp_dimensions, pp_open,
		
		// prettyPhoto container specific
		pp_contentHeight, pp_contentWidth, pp_containerHeight, pp_containerWidth,
		
		// Window size
		windowHeight = $(window).height(), windowWidth = $(window).width(),

		// Global elements
		pp_slideshow;
		
		doresize = true, scroll_pos = _get_scroll();
	
		// Window/Keyboard events
		$(window).unbind('resize.prettyphoto').bind('resize.prettyphoto',function(){ _center_overlay(); _resize_overlay(); });
		
		if(pp_settings.keyboard_shortcuts) {
			$(document).unbind('keydown.prettyphoto').bind('keydown.prettyphoto',function(e){
				if(typeof $pp_pic_holder != 'undefined'){
					if($pp_pic_holder.is(':visible')){
						switch(e.keyCode){
							case 37:
								$.prettyPhoto.changePage('previous');
								e.preventDefault();
								break;
							case 39:
								$.prettyPhoto.changePage('next');
								e.preventDefault();
								break;
							case 27:
								if(!settings.modal)
								$.prettyPhoto.close();
								e.preventDefault();
								break;
						};
						// return false;
					};
				};
			});
		};
		
		/**
		* Initialize prettyPhoto.
		*/
		$.prettyPhoto.initialize = function() {
			
			settings = pp_settings;
			
			if(settings.theme == 'pp_default') settings.horizontal_padding = 16;
			if(settings.ie6_fallback && $.browser.msie && parseInt($.browser.version) == 6) settings.theme = "light_square"; // Fallback to a supported theme for IE6
			
			// Find out if the picture is part of a set
			theRel = $(this).attr(settings.hook);
			galleryRegExp = /\[(?:.*)\]/;
			isSet = (galleryRegExp.exec(theRel)) ? true : false;
			
			// Put the SRCs, TITLEs, ALTs into an array.
			pp_images = (isSet) ? jsnThemeGridjQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return $(n).attr('href'); }) : $.makeArray($(this).attr('href'));
			pp_titles = (isSet) ? jsnThemeGridjQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).find('img').attr('alt')) ? $(n).find('img').attr('alt') : ""; }) : $.makeArray($(this).find('img').attr('alt'));
			pp_descriptions = (isSet) ? jsnThemeGridjQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).attr('rev')) ? $(n).attr('rev') : ""; }) : $.makeArray($(this).attr('rev'));
			
			if(pp_images.length > settings.overlay_gallery_max) settings.overlay_gallery = false;
			
			set_position = jsnThemeGridjQuery.inArray($(this).attr('href'), pp_images); // Define where in the array the clicked item is positionned
			rel_index = (isSet) ? set_position : $("a["+settings.hook+"^='"+theRel+"']").index($(this));
			
			_build_overlay(this); // Build the overlay {this} being the caller
			
			if(settings.allow_resize)
				$(window).bind('scroll.prettyphoto',function(){ _center_overlay(); });
			
			
			$.prettyPhoto.open();
			
			return false;
		}


		/**
		* Opens the prettyPhoto modal box.
		* @param image {String,Array} Full path to the image to be open, can also be an array containing full images paths.
		* @param title {String,Array} The title to be displayed with the picture, can also be an array containing all the titles.
		* @param description {String,Array} The description to be displayed with the picture, can also be an array containing all the descriptions.
		*/
		$.prettyPhoto.open = function(event) {
			if(typeof settings == "undefined"){ // Means it's an API call, need to manually get the settings and set the variables
				settings = pp_settings;
				if($.browser.msie && $.browser.version == 6) settings.theme = "light_square"; // Fallback to a supported theme for IE6
				pp_images = $.makeArray(arguments[0]);
				pp_titles = (arguments[1]) ? $.makeArray(arguments[1]) : $.makeArray("");
				pp_descriptions = (arguments[2]) ? $.makeArray(arguments[2]) : $.makeArray("");
				isSet = (pp_images.length > 1) ? true : false;
				set_position = (arguments[3])? arguments[3]: 0;
				_build_overlay(event.target); // Build the overlay {this} being the caller
			}

			if($.browser.msie && $.browser.version == 6) $('select').css('visibility','hidden'); // To fix the bug with IE select boxes
			
			if(settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','hidden'); // Hide the flash

			_checkPosition($(pp_images).size()); // Hide the next/previous links if on first or last images.
		
			$('.pp_loaderIcon').show();
		
			if(settings.deeplinking)
				setHashtag();
		
			// Rebuild Facebook Like Button with updated href
			if(settings.social_tools){
				facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href)); 
				$pp_pic_holder.find('.pp_social').html(facebook_like_link);
			}
			
			// Fade the content in
			if($ppt.is(':hidden')) $ppt.css('opacity',0).show();
			$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);

			// Display the current position
			$pp_pic_holder.find('.currentTextHolder').text((set_position+1) + settings.counter_separator_label + $(pp_images).size());

			// Set the description
			if(typeof pp_descriptions[set_position] != 'undefined' && pp_descriptions[set_position] != ""){
				$pp_pic_holder.find('.pp_description').show().html(unescape(pp_descriptions[set_position]));
			}else{
				$pp_pic_holder.find('.pp_description').hide();
			}
			
			// Get the dimensions
			movie_width = ( parseFloat(getParam('width',pp_images[set_position])) ) ? getParam('width',pp_images[set_position]) : settings.default_width.toString();
			movie_height = ( parseFloat(getParam('height',pp_images[set_position])) ) ? getParam('height',pp_images[set_position]) : settings.default_height.toString();
			
			// If the size is % based, calculate according to window dimensions
			percentBased=false;
			if(movie_height.indexOf('%') != -1) { movie_height = parseFloat(($(window).height() * parseFloat(movie_height) / 100) - 150); percentBased = true; }
			if(movie_width.indexOf('%') != -1) { movie_width = parseFloat(($(window).width() * parseFloat(movie_width) / 100) - 150); percentBased = true; }
			
			// Fade the holder
			$pp_pic_holder.fadeIn(function(){
				// Set the title
				(settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html('&nbsp;');
				
				imgPreloader = "";
				skipInjection = false;
				
				// Inject the proper content
				switch(_getFileType(pp_images[set_position])){
					case 'image':
						imgPreloader = new Image();

						// Preload the neighbour images
						nextImage = new Image();
						if(isSet && set_position < $(pp_images).size() -1) nextImage.src = pp_images[set_position + 1];
						prevImage = new Image();
						if(isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];

						$pp_pic_holder.find('#pp_full_res')[0].innerHTML = settings.image_markup.replace(/{path}/g,pp_images[set_position]);

						imgPreloader.onload = function(){
							// Fit item to viewport
							pp_dimensions = _fitToViewport(imgPreloader.width,imgPreloader.height);

							_showContent();
						};

						imgPreloader.onerror = function(){
							alert('Image cannot be loaded. Make sure the path is correct and image exist.');
							$.prettyPhoto.close();
						};
					
						imgPreloader.src = pp_images[set_position];
					break;
				
					case 'youtube':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
						
						// Regular youtube link
						movie_id = getParam('v',pp_images[set_position]);
						
						// youtu.be link
						if(movie_id == ""){
							movie_id = pp_images[set_position].split('youtu.be/');
							movie_id = movie_id[1];
							if(movie_id.indexOf('?') > 0)
								movie_id = movie_id.substr(0,movie_id.indexOf('?')); // Strip anything after the ?

							if(movie_id.indexOf('&') > 0)
								movie_id = movie_id.substr(0,movie_id.indexOf('&')); // Strip anything after the &
						}

						movie = 'http://www.youtube.com/embed/'+movie_id;
						(getParam('rel',pp_images[set_position])) ? movie+="?rel="+getParam('rel',pp_images[set_position]) : movie+="?rel=1";
							
						if(settings.autoplay) movie += "&autoplay=1";
					
						toInject = settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);
					break;
				
					case 'vimeo':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
					
						movie_id = pp_images[set_position];
						var regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)/;
						var match = movie_id.match(regExp);
						
						movie = 'http://player.vimeo.com/video/'+ match[2] +'?title=0&amp;byline=0&amp;portrait=0';
						if(settings.autoplay) movie += "&autoplay=1;";
				
						vimeo_width = pp_dimensions['width'] + '/embed/?moog_width='+ pp_dimensions['width'];
				
						toInject = settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,movie);
					break;
				
					case 'quicktime':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
						pp_dimensions['height']+=15; pp_dimensions['contentHeight']+=15; pp_dimensions['containerHeight']+=15; // Add space for the control bar
				
						toInject = settings.quicktime_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);
					break;
				
					case 'flash':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
					
						flash_vars = pp_images[set_position];
						flash_vars = flash_vars.substring(pp_images[set_position].indexOf('flashvars') + 10,pp_images[set_position].length);

						filename = pp_images[set_position];
						filename = filename.substring(0,filename.indexOf('?'));
					
						toInject =  settings.flash_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+'?'+flash_vars);
					break;
				
					case 'iframe':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
				
						frame_url = pp_images[set_position];
						frame_url = frame_url.substr(0,frame_url.indexOf('iframe')-1);

						toInject = settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,frame_url);
					break;
					
					case 'ajax':
						doresize = false; // Make sure the dimensions are not resized.
						pp_dimensions = _fitToViewport(movie_width,movie_height);
						doresize = true; // Reset the dimensions
					
						skipInjection = true;
						$.get(pp_images[set_position],function(responseHTML){
							toInject = settings.inline_markup.replace(/{content}/g,responseHTML);
							$pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
							_showContent();
						});
						
					break;
					
					case 'custom':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
					
						toInject = settings.custom_markup;
					break;
				
					case 'inline':
						// to get the item height clone it, apply default width, wrap it in the prettyPhoto containers , then delete
						myClone = $(pp_images[set_position]).clone().append('<br clear="all" />').css({'width':settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($('body')).show();
						doresize = false; // Make sure the dimensions are not resized.
						pp_dimensions = _fitToViewport($(myClone).width(),$(myClone).height());
						doresize = true; // Reset the dimensions
						$(myClone).remove();
						toInject = settings.inline_markup.replace(/{content}/g,$(pp_images[set_position]).html());
					break;
				};

				if(!imgPreloader && !skipInjection){
					$pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
				
					// Show content
					_showContent();
				};
			});

			return false;
		};

	
		/**
		* Change page in the prettyPhoto modal box
		* @param direction {String} Direction of the paging, previous or next.
		*/
		$.prettyPhoto.changePage = function(direction){
			currentGalleryPage = 0;
			
			if(direction == 'previous') {
				set_position--;
				if (set_position < 0) set_position = $(pp_images).size()-1;
			}else if(direction == 'next'){
				set_position++;
				if(set_position > $(pp_images).size()-1) set_position = 0;
			}else{
				set_position=direction;
			};
			
			rel_index = set_position;

			if(!doresize) doresize = true; // Allow the resizing of the images
			if(settings.allow_expand) {
				$('.pp_contract').removeClass('pp_contract').addClass('pp_expand');
			}

			_hideContent(function(){ $.prettyPhoto.open(); });
		};


		/**
		* Change gallery page in the prettyPhoto modal box
		* @param direction {String} Direction of the paging, previous or next.
		*/
		$.prettyPhoto.changeGalleryPage = function(direction){
			if(direction=='next'){
				currentGalleryPage ++;

				if(currentGalleryPage > totalPage) currentGalleryPage = 0;
			}else if(direction=='previous'){
				currentGalleryPage --;

				if(currentGalleryPage < 0) currentGalleryPage = totalPage;
			}else{
				currentGalleryPage = direction;
			};
			
			slide_speed = (direction == 'next' || direction == 'previous') ? settings.animation_speed : 0;

			slide_to = currentGalleryPage * (itemsPerPage * itemWidth);

			$pp_gallery.find('ul').animate({left:-slide_to},slide_speed);
		};


		/**
		* Start the slideshow...
		*/
		$.prettyPhoto.startSlideshow = function(){
			if(typeof pp_slideshow == 'undefined'){
				$pp_pic_holder.find('.pp_play').unbind('click').removeClass('pp_play').addClass('pp_pause').click(function(){
					$.prettyPhoto.stopSlideshow();
					return false;
				});
				pp_slideshow = setInterval($.prettyPhoto.startSlideshow,settings.slideshow);
			}else{
				$.prettyPhoto.changePage('next');	
			};
		}


		/**
		* Stop the slideshow...
		*/
		$.prettyPhoto.stopSlideshow = function(){
			$pp_pic_holder.find('.pp_pause').unbind('click').removeClass('pp_pause').addClass('pp_play').click(function(){
				$.prettyPhoto.startSlideshow();
				return false;
			});
			clearInterval(pp_slideshow);
			pp_slideshow=undefined;
		}


		/**
		* Closes prettyPhoto.
		*/
		$.prettyPhoto.close = function(){
			if($pp_overlay.is(":animated")) return;
			
			$.prettyPhoto.stopSlideshow();
			
			$pp_pic_holder.stop().find('object,embed').css('visibility','hidden');
			
			$('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(settings.animation_speed,function(){ $(this).remove(); });
			
			$pp_overlay.fadeOut(settings.animation_speed, function(){
				if($.browser.msie && $.browser.version == 6) $('select').css('visibility','visible'); // To fix the bug with IE select boxes
				
				if(settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','visible'); // Show the flash
				
				$(this).remove(); // No more need for the prettyPhoto markup
				
				$(window).unbind('scroll.prettyphoto');
				
				clearHashtag();
				
				settings.callback();
				
				doresize = true;
				
				pp_open = false;
				
				delete settings;
			});
		};
	
		/**
		* Set the proper sizes on the containers and animate the content in.
		*/
		function _showContent(){
			$('.pp_loaderIcon').hide();

			// Calculate the opened top position of the pic holder
			projectedTop = scroll_pos['scrollTop'] + ((windowHeight/2) - (pp_dimensions['containerHeight']/2));
			if(projectedTop < 0) projectedTop = 0;

			$ppt.fadeTo(settings.animation_speed,1);

			// Resize the content holder
			$pp_pic_holder.find('.pp_content')
				.animate({
					height:pp_dimensions['contentHeight'],
					width:pp_dimensions['contentWidth']
				},settings.animation_speed);
			
			// Resize picture the holder
			$pp_pic_holder.animate({
				'top': projectedTop,
				'left': ((windowWidth/2) - (pp_dimensions['containerWidth']/2) < 0) ? 0 : (windowWidth/2) - (pp_dimensions['containerWidth']/2),
				width:pp_dimensions['containerWidth']
			},settings.animation_speed,function(){
				$pp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(pp_dimensions['height']).width(pp_dimensions['width']);

				$pp_pic_holder.find('.pp_fade').fadeIn(settings.animation_speed); // Fade the new content

				// Show the nav
				if(isSet && _getFileType(pp_images[set_position])=="image") { $pp_pic_holder.find('.pp_hoverContainer').show(); }else{ $pp_pic_holder.find('.pp_hoverContainer').hide(); }
			
				if(settings.allow_expand) {
					if(pp_dimensions['resized']){ // Fade the resizing link if the image is resized
						$('a.pp_expand,a.pp_contract').show();
					}else{
						$('a.pp_expand').hide();
					}
				}
				
				if(settings.autoplay_slideshow && !pp_slideshow && !pp_open) $.prettyPhoto.startSlideshow();
				
				settings.changepicturecallback(); // Callback!
				
				pp_open = true;
			});
			
			_insert_gallery();
			pp_settings.ajaxcallback();
		};
		
		/**
		* Hide the content...DUH!
		*/
		function _hideContent(callback){
			// Fade out the current picture
			$pp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility','hidden');
			$pp_pic_holder.find('.pp_fade').fadeOut(settings.animation_speed,function(){
				$('.pp_loaderIcon').show();
				
				callback();
			});
		};
	
		/**
		* Check the item position in the gallery array, hide or show the navigation links
		* @param setCount {integer} The total number of items in the set
		*/
		function _checkPosition(setCount){
			(setCount > 1) ? $('.pp_nav').show() : $('.pp_nav').hide(); // Hide the bottom nav if it's not a set.
		};
	
		/**
		* Resize the item dimensions if it's bigger than the viewport
		* @param width {integer} Width of the item to be opened
		* @param height {integer} Height of the item to be opened
		* @return An array containin the "fitted" dimensions
		*/
		function _fitToViewport(width,height){
			resized = false;

			_getDimensions(width,height);
			
			// Define them in case there's no resize needed
			imageWidth = width, imageHeight = height;

			if( ((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)) && doresize && settings.allow_resize && !percentBased) {
				resized = true, fitting = false;
			
				while (!fitting){
					if((pp_containerWidth > windowWidth)){
						imageWidth = (windowWidth - 80);
						imageHeight = (height/width) * imageWidth;
					}else if((pp_containerHeight > windowHeight)){
						imageHeight = (windowHeight - 80);
						imageWidth = (width/height) * imageHeight;
					}else{
						fitting = true;
					};

					pp_containerHeight = imageHeight, pp_containerWidth = imageWidth;
				};
			
				_getDimensions(imageWidth,imageHeight);

				if((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)){
					
				//	_fitToViewport(pp_containerWidth,pp_containerHeight)
				};
			};
			
			return {
				width:Math.floor(imageWidth),
				height:Math.floor(imageHeight),
				containerHeight:Math.floor(pp_containerHeight),
				containerWidth:Math.floor(pp_containerWidth) + (settings.horizontal_padding * 2),
				contentHeight:Math.floor(pp_contentHeight),
				contentWidth:Math.floor(pp_contentWidth),
				resized:resized
			};
		};
		
		/**
		* Get the containers dimensions according to the item size
		* @param width {integer} Width of the item to be opened
		* @param height {integer} Height of the item to be opened
		*/
		function _getDimensions(width,height){
			width = parseFloat(width);
			height = parseFloat(height);
			
			// Get the details height, to do so, I need to clone it since it's invisible
			$pp_details = $pp_pic_holder.find('.pp_details');
			$pp_details.width(width);
			detailsHeight = parseFloat($pp_details.css('marginTop')) + parseFloat($pp_details.css('marginBottom'));
			
			$pp_details = $pp_details.clone().addClass(settings.theme).width(width).appendTo($('body')).css({
				'position':'absolute',
				'top':-10000
			});
			detailsHeight += $pp_details.height();
			detailsHeight = (detailsHeight <= 34) ? 36 : detailsHeight; // Min-height for the details
			if ($pp_details.hasClass('jsn-themegrid-hidden')) detailsHeight = 0;
			if($.browser.msie && $.browser.version==7) detailsHeight+=8;
			$pp_details.remove();
			
			// Get the titles height, to do so, I need to clone it since it's invisible
			$pp_title = $pp_pic_holder.find('.ppt');
			$pp_title.width(width);
			titleHeight = parseFloat($pp_title.css('marginTop')) + parseFloat($pp_title.css('marginBottom'));
			$pp_title = $pp_title.clone().appendTo($('body')).css({
				'position':'absolute',
				'top':-10000
			});
			titleHeight += $pp_title.height();
			$pp_title.remove();
			
			// Get the container size, to resize the holder to the right dimensions
			pp_contentHeight = height + detailsHeight;
			pp_contentWidth = width;
			pp_containerHeight = pp_contentHeight + titleHeight + $pp_pic_holder.find('.pp_top').height() + $pp_pic_holder.find('.pp_bottom').height();
			pp_containerWidth = width;
		}
	
		function _getFileType(itemSrc){
			if (itemSrc.match(/youtube\.com\/watch/i) || itemSrc.match(/youtu\.be/i)) {
				return 'youtube';
			}else if (itemSrc.match(/vimeo\.com/i)) {
				return 'vimeo';
			}else if(itemSrc.match(/\b.mov\b/i)){ 
				return 'quicktime';
			}else if(itemSrc.match(/\b.swf\b/i)){
				return 'flash';
			}else if(itemSrc.match(/\biframe=true\b/i)){
				return 'iframe';
			}else if(itemSrc.match(/\bajax=true\b/i)){
				return 'ajax';
			}else if(itemSrc.match(/\bcustom=true\b/i)){
				return 'custom';
			}else if(itemSrc.substr(0,1) == '#'){
				return 'inline';
			}else{
				return 'image';
			};
		};
	
		function _center_overlay(){
			if(doresize && typeof $pp_pic_holder != 'undefined') {
				scroll_pos = _get_scroll();
				contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();

				projectedTop = (windowHeight/2) + scroll_pos['scrollTop'] - (contentHeight/2);
				if(projectedTop < 0) projectedTop = 0;
				
				if(contentHeight > windowHeight)
					return;

				$pp_pic_holder.css({
					'top': projectedTop,
					'left': (windowWidth/2) + scroll_pos['scrollLeft'] - (contentwidth/2)
				});
			};
		};
	
		function _get_scroll(){
			if (self.pageYOffset) {
				return {scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset};
			} else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
				return {scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft};
			} else if (document.body) {// all other Explorers
				return {scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft};
			};
		};
	
		function _resize_overlay() {
			windowHeight = $(window).height(), windowWidth = $(window).width();
			
			if(typeof $pp_overlay != "undefined") $pp_overlay.height($(document).height()).width(windowWidth);
		};
	
		function _insert_gallery(){
			if(isSet && settings.overlay_gallery && _getFileType(pp_images[set_position])=="image" && (settings.ie6_fallback && !($.browser.msie && parseInt($.browser.version) == 6))) {
				itemWidth = 52+5; // 52 beign the thumb width, 5 being the right margin.
				navWidth = (settings.theme == "facebook" || settings.theme == "pp_default") ? 50 : 30; // Define the arrow width depending on the theme
				
				itemsPerPage = Math.floor((pp_dimensions['containerWidth'] - 100 - navWidth) / itemWidth);
				itemsPerPage = (itemsPerPage < pp_images.length) ? itemsPerPage : pp_images.length;
				totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;

				// Hide the nav in the case there's no need for links
				if(totalPage == 0){
					navWidth = 0; // No nav means no width!
					$pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').hide();
				}else{
					$pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').show();
				};

				galleryWidth = itemsPerPage * itemWidth;
				fullGalleryWidth = pp_images.length * itemWidth;
				
				// Set the proper width to the gallery items
				$pp_gallery
					.css('margin-left',-((galleryWidth/2) + (navWidth/2)))
					.find('div:first').width(galleryWidth+5)
					.find('ul').width(fullGalleryWidth)
					.find('li.selected').removeClass('selected');
				
				goToPage = (Math.floor(set_position/itemsPerPage) < totalPage) ? Math.floor(set_position/itemsPerPage) : totalPage;

				$.prettyPhoto.changeGalleryPage(goToPage);
				
				$pp_gallery_li.filter(':eq('+set_position+')').addClass('selected');
			}else{
				$pp_pic_holder.find('.pp_content').unbind('mouseenter mouseleave');
				// $pp_gallery.hide();
			}
		}
	
		function _build_overlay(caller){
			// Inject Social Tool markup into General markup
			if(settings.social_tools)
				facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href)); 

			settings.markup = settings.markup.replace('{pp_social}',''); 
			
			$('body').append(settings.markup); // Inject the markup
			
			$pp_pic_holder = $('.pp_pic_holder') , $ppt = $('.ppt'), $pp_overlay = $('div.pp_overlay'); // Set my global selectors
			
			// Inject the inline gallery!
			if(isSet && settings.overlay_gallery) {
				currentGalleryPage = 0;
				toInject = "";
				for (var i=0; i < pp_images.length; i++) {
					if(!pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)){
						classname = 'default';
						img_src = '';
					}else{
						classname = '';
						img_src = pp_images[i];
					}
					toInject += "<li class='"+classname+"'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
				};
				
				toInject = settings.gallery_markup.replace(/{gallery}/g,toInject);
				
				$pp_pic_holder.find('#pp_full_res').after(toInject);
				
				$pp_gallery = $('.pp_pic_holder .pp_gallery'), $pp_gallery_li = $pp_gallery.find('li'); // Set the gallery selectors
				
				$pp_gallery.find('.pp_arrow_next').click(function(){
					$.prettyPhoto.changeGalleryPage('next');
					$.prettyPhoto.stopSlideshow();
					return false;
				});
				
				$pp_gallery.find('.pp_arrow_previous').click(function(){
					$.prettyPhoto.changeGalleryPage('previous');
					$.prettyPhoto.stopSlideshow();
					return false;
				});
				
				$pp_pic_holder.find('.pp_content').hover(	
					function(){
						$pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeIn();
						/******************** Joomlashine dev BEGIN ********************/
						$pp_pic_holder.find('.pp_title').fadeIn();
						/******************** Joomlashine dev END ********************/
					},
					function(){
						$pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeOut();
						/******************** Joomlashine dev BEGIN ********************/
						$pp_pic_holder.find('.pp_title').fadeOut();
						/******************** Joomlashine dev END ********************/
					}
				);

				itemWidth = 52+5; // 52 beign the thumb width, 5 being the right margin.
				$pp_gallery_li.each(function(i){
					$(this)
						.find('a')
						.click(function(){
							$.prettyPhoto.changePage(i);
							$.prettyPhoto.stopSlideshow();
							return false;
						});
				});
			};
			
			
			// Inject the play/pause if it's a slideshow
			if(settings.slideshow){
				$pp_pic_holder.find('.pp_nav').prepend('<a href="#" class="pp_play">Play</a>')
				$pp_pic_holder.find('.pp_nav .pp_play').click(function(){
					$.prettyPhoto.startSlideshow();
					return false;
				});
			}
			
			$pp_pic_holder.attr('class','pp_pic_holder ' + settings.theme); // Set the proper theme
			
			$pp_overlay
				.css({
					'opacity':0,
					'height':$(document).height(),
					'width':$(window).width()
					})
				.bind('click',function(){
					if(!settings.modal) $.prettyPhoto.close();
				});

			$('a.pp_close').bind('click',function(){ $.prettyPhoto.close(); return false; });


			if(settings.allow_expand) {
				$('a.pp_expand').bind('click',function(e){
					// Expand the image
					if($(this).hasClass('pp_expand')){
						$(this).removeClass('pp_expand').addClass('pp_contract');
						doresize = false;
					}else{
						$(this).removeClass('pp_contract').addClass('pp_expand');
						doresize = true;
					};
				
					_hideContent(function(){ $.prettyPhoto.open(); });
			
					return false;
				});
			}
		
			$pp_pic_holder.find('.pp_previous, .pp_nav .pp_arrow_previous').bind('click',function(){
				$.prettyPhoto.changePage('previous');
				$.prettyPhoto.stopSlideshow();
				return false;
			});
		
			$pp_pic_holder.find('.pp_next, .pp_nav .pp_arrow_next').bind('click',function(){
				$.prettyPhoto.changePage('next');
				$.prettyPhoto.stopSlideshow();
				return false;
			});
			
			_center_overlay(); // Center it
		};

		if(!pp_alreadyInitialized && getHashtag()){
			pp_alreadyInitialized = true;
			
			// Grab the rel index to trigger the click on the correct element
			hashIndex = getHashtag();
			hashRel = hashIndex;
			hashIndex = hashIndex.substring(hashIndex.indexOf('/')+1,hashIndex.length-1);
			hashRel = hashRel.substring(0,hashRel.indexOf('/'));

			// Little timeout to make sure all the prettyPhoto initialize scripts has been run.
			// Useful in the event the page contain several init scripts.
			setTimeout(function(){ $("a["+pp_settings.hook+"^='"+hashRel+"']:eq("+hashIndex+")").trigger('click'); },50);
		}
		
		return this.unbind('click.prettyphoto').bind('click.prettyphoto',$.prettyPhoto.initialize); // Return the jQuery object for chaining. The unbind method is used to avoid click conflict when the plugin is called more than once
	};
	
	function getHashtag(){
		url = location.href;
		hashtag = (url.indexOf('#prettyPhoto') !== -1) ? decodeURI(url.substring(url.indexOf('#prettyPhoto')+1,url.length)) : false;

		return hashtag;
	};
	
	function setHashtag(){
		if(typeof theRel == 'undefined') return; // theRel is set on normal calls, it's impossible to deeplink using the API
		location.hash = theRel + '/'+rel_index+'/';
	};
	
	function clearHashtag(){
		if ( location.href.indexOf('#prettyPhoto') !== -1 ) location.hash = "prettyPhoto";
	}
	
	function getParam(name,url){
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( url );
	  return ( results == null ) ? "" : results[1];
	}
	
})(jsnThemeGridjQuery);

var pp_alreadyInitialized = false; // Used for the deep linking to make sure not to call the same function several times.
;


/* FILE: /plugins/jsnimageshow/themegrid/assets/js/jsn_is_gridtheme.js */
/**
 * @author JoomlaShine.com Team
 * @copyright JoomlaShine.com
 * @link joomlashine.com
 * @package JSN ImageShow - Theme Classic
 * @version $Id$
 * @license GNU/GPL v2 http://www.gnu.org/licenses/gpl-2.0.html
 */
(function($) {
	$.fn.extend( {
		initGrid:function(container,options){
			if(options==undefined){
				themeId					 = '';
				layout					 = $('#img_layout').val();
				thumbnail_width 		 = $('#thumbnail_width').val(); 
				thumbnail_height		 = $('#thumbnail_height').val();
				thumbnail_space			 = $('#thumbnail_space').val();
				thumbnail_border		 = $('#thumbnail_border').val();
				thumbnail_rounded_corner = $('#thumbnail_rounded_corner').val();
				thumbnail_border_color	 = $('#thumbnail_border_color').val();
				thumbnail_shadow		 = $('#thumbnail_shadow').val();
				background_color		 = $('#background_color').val();
				if ($('input[name="container_transparent_background"]:checked').val() == 'no')
				{
					container.css('background-color', background_color);
				}	
				else
				{
					container.css('background', 'none');
				}	
			}else{
				themeId					 = options.key;
				layout					 = options.layout;
				thumbnail_width 		 = options.thumbnail_width;
				thumbnail_height		 = options.thumbnail_height;
				thumbnail_space			 = options.thumbnail_space;
				thumbnail_border		 = options.thumbnail_border;
				thumbnail_rounded_corner = options.thumbnail_rounded_corner;
				thumbnail_border_color	 = options.thumbnail_border_color;
				thumbnail_shadow		 = options.thumbnail_shadow;
				background_color		 = options.background_color;
				container_transparent_background = options.container_transparent_background;

				if (!container_transparent_background)
				{
					container.css('background-color',background_color);
				}
				else
				{
					container.css('background', 'none');
				}	
				
			}
			
			$(this).initThumbnailSpace(container,thumbnail_space);
			$(this).initThumbnailBorder(container,themeId,thumbnail_border,thumbnail_border_color);
			$(this).initThumbnailRoundedCorner(container,thumbnail_rounded_corner);
			$(this).initThumbnailShadow(container,thumbnail_shadow);
			$(this).initLayout(container,layout,thumbnail_width,thumbnail_height);
		},
		changeValueVisual:function(container,name,value){

			switch(name){
				case 'thumbnail_width':
				case 'thumbnail_height':	
				case 'img_layout':
					layout				= $('#img_layout').val();
					thumbnail_width		= $('#thumbnail_width').val();
					thumbnail_height	= $('#thumbnail_height').val();
					$(this).initLayout(container,layout,thumbnail_width,thumbnail_height);
					break;
				case 'thumbnail_space':
					$(this).initThumbnailSpace(container,value);
					break;
				case 'thumbnail_border':
					thumbnail_border		= value;
					themeId					= '';
					thumbnail_border_color	= $('#thumbnail_border_color').val();
					$(this).initThumbnailBorder(container,themeId,thumbnail_border,thumbnail_border_color);
					break;
				case 'thumbnail_rounded_corner':
					$(this).initThumbnailRoundedCorner(container,value);
					break;
				case 'thumbnail_shadow':
					$(this).initThumbnailShadow(container,value);
					break;
				case 'container_transparent_background':
					if ($('input[name="container_transparent_background"]:checked').val() == 'no')
					{
						container.css('background-color', $('#background_color').val());
					}	
					else
					{
						container.css('background', 'none');
					}					
			}
		},
		initLayout:function(container,layout,thumbnail_width,thumbnail_height){
	    	var imgId		= 0;
	    	var imgElement	= '';
	    	var width		= 0;
	    	var height		= 0;
			switch(layout){
				case 'fixed':
					container.find(".jsn-themegrid-image img").each(function(){
						imgId = $(this).attr('id');
						imgElement = document.getElementById(imgId);
						width = imgElement.clientWidth;
						height = imgElement.clientHeight;
						$(this).scaleResize(thumbnail_width,thumbnail_height,width,height,imgId);
					});
					container.find(".jsn-themegrid-box").css({width:thumbnail_width,height : thumbnail_height});
					if(document.getElementById('thumbnail_height') != undefined){
						$('#thumbnail_height').attr('readonly', false);
					}
					break;
				case 'fluid':
					container.find(".jsn-themegrid-image img").each(function(){
						$(this).css({width:thumbnail_width,height : "",top:0,left:0});
					});
					container.find(".jsn-themegrid-box").css({width:thumbnail_width,height : ""});
					if(document.getElementById('thumbnail_height') != undefined){
						$('#thumbnail_height').attr('readonly', true);
					}	
					break;
			}
		},
		initThumbnailWidth:function(width){
			thumbnail_width = width;
			$(this).initLayout();
		},
		initThumbnailHeight:function(height){
			thumbnail_height = height;
			$(this).initLayout();
		},
		initThumbnailSpace:function(container,thumbnail_space){
			var key = '';
			var numberImg = container.find('.jsn-themegrid-box').length;
			for(var i=1;i<=numberImg;i++){
				key = (themeId=='')?i:themeId+'_'+i;
				document.getElementById(key).style.marginLeft = thumbnail_space+"px";
				document.getElementById(key).style.marginTop = thumbnail_space+"px";
			}
		},
		initThumbnailBorder:function(container,themeId,thumbnail_border,thumbnail_border_color){
			var key = '';
			var numberImg = container.find('.jsn-themegrid-box').length;
			for(var i=1;i<=numberImg;i++){
				key = (themeId=='')?i:themeId+'_'+i;
				document.getElementById(key).style.border = thumbnail_border+"px solid "+thumbnail_border_color;
			}
		},
		initThumbnailRoundedCorner:function(container,thumbnail_rounded_corner){
			container.find(".jsn-themegrid-box").css({
				'border-radius': thumbnail_rounded_corner+'px',
				'-moz-border-radius': thumbnail_rounded_corner+'px',
				'-webkit-border-radius': thumbnail_rounded_corner+'px'
			});
		},
		initThumbnailShadow:function(container,thumbnail_shadow){
			switch(thumbnail_shadow){
				case "0":
					container.find(".jsn-themegrid-box").css({
						'box-shadow' : '0px 0px 0px #888888',
						'-moz-box-shadow' : '0px 0px 0px #888888',
						'-webkit-box-shadow' : '0px 0px 0px #888888',
					}); 
					break;
				case "1":
					container.find(".jsn-themegrid-box").css({
						'box-shadow' : '0px 0px 3px 1px #aaa',
						'-moz-box-shadow' : '0px 0px 3px 1px #aaa',
						'-webkit-box-shadow' : '0px 0px 3px 1px #aaa',
					}); 
					break;
				case "2":
					container.find(".jsn-themegrid-box").css({
						'box-shadow' : '0 2px 5px 0 #888',
						'-moz-box-shadow' : '0 2px 5px 0 #888',
						'-webkit-box-shadow' : '0 2px 5px 0 #888',
					});
			}
		},
		scaleResize: function(thumbnail_width,thumbnail_height,imageW, imageH, imgID)
		{
			var imageElement 	= document.getElementById(imgID);
			var imageRatio   	= imageW/imageH;
			var imageBoxRatio	= thumbnail_width/thumbnail_height;
			var leftOffset		= 0;
			var topOffset		= 0;
			if(imageRatio < imageBoxRatio){
				//cut top and bottom of image
				imageElement.style.width = thumbnail_width+'px';
				var imageHeight	= Math.floor(thumbnail_width/imageRatio);
				topOffset		= Math.floor((thumbnail_height - imageHeight)/2);
				imageElement.style.height	= imageHeight+'px';
				imageElement.style.top		= topOffset+'px';				
			}else{
				//cut left and right of image
				imageElement.style.height = thumbnail_height+'px';
				var imageWidth	= Math.floor(thumbnail_height*imageRatio);
				leftOffset		= Math.floor((thumbnail_width - imageWidth)/2);
				imageElement.style.width	= imageWidth+'px';	
			}
			imageElement.style.top		= topOffset+'px';
			imageElement.style.left		= leftOffset+'px';
		}
	});
	$.fn.gridtheme = function(options) {
		var heightOfContainer = (options==undefined)?'345':options.height;
		var container	=  this;
		if (heightOfContainer != undefined)
		{
			container.imagesLoaded( function(){
				container.initGrid(container,options);
				container.masonry({
					itemSelector : '.jsn-themegrid-box'
				}),(container.css("height",heightOfContainer));
	  		});
		}
		else
		{
			container.imagesLoaded( function(){
				container.initGrid(container,options);
				container.masonry({
					itemSelector : '.jsn-themegrid-box'
				});
	  		});
		}		
    	this.kinetic();
    	if(options==undefined){
	    	$('.imagePanel').change( function() {
	    		$(this).changeValueVisual(container,$(this).attr('name'),$(this).val());
	    		container.masonry({
		    		itemSelector : '.jsn-themegrid-box'
		    	}),(container.css("height",heightOfContainer));
	    	});
    	}
	};
})(jsnThemeGridjQuery);;


/* FILE: /plugins/jsnimageshow/themegrid/assets/js/jsn_is_gridthemelightbox.js */
/**
 * @author JoomlaShine.com Team
 * @copyright JoomlaShine.com
 * @link joomlashine.com
 * @package JSN ImageShow - Theme Classic
 * @version $Id$
 * @license GNU/GPL v2 http://www.gnu.org/licenses/gpl-2.0.html
 */
(function($) {
	$.fn.gridtheme.lightbox = function(options) {
		var allow = false;
		var bottom_panel = desc = gallery = caption = literal = '';
		var objAllow = $('#data_allow_grid_' + options.rand).val();
		if (objAllow) {
			objAllow = JSON.parse(objAllow);
			if (objAllow.show_caption == 'yes') {
				caption = '<div class="ppt">&nbsp;</div>';
			} else {
				caption = '<div class="ppt jsn-themegrid-hidden">&nbsp;</div>';
			}
			if (objAllow.show_description == 'yes') {
				desc	= '<p class="pp_description"></p>';
			} else {
				desc	= '<p class="pp_description jsn-themegrid-hidden"></p>';
			}
			if (objAllow.show_close == 'yes') {
				literal = '<a class="pp_close" href="#">Close</a>';
			} else {
				literal = '<a class="pp_close jsn-themegrid-hidden" href="#">Close</a>';
			}

			bottom_panel = '<div class="pp_details ' + ((objAllow.show_description != 'yes' && objAllow.show_close != 'yes') ? 'jsn-themegrid-hidden' : '') +'"> \
				' + desc + ' \
				' + literal + ' \
			</div>';
			
			if (objAllow.show_thumbs == 'yes') {
				gallery = '<div class="pp_gallery"> \
					<a href="#" class="pp_arrow_previous">Previous</a> \
					<div> \
						<ul> \
							{gallery} \
						</ul> \
					</div> \
					<a href="#" class="pp_arrow_next">Next</a> \
				</div>';
			}
			
		}
		$("div.jsn-themegrid-container-"+options.rand+" a[rel^='prettyPhoto']").prettyPhoto({
			animation_speed: 'fast', /* fast/slow/normal */
			slideshow: 5000, /* false OR interval time in ms */
			autoplay_slideshow: false, /* true/false */
			opacity: 0.80, /* Value between 0 and 1 */
			show_title: true, /* true/false */
			allow_resize: true, /* Resize the photos bigger than viewport. true/false */
			default_width: 500,
			default_height: 344,
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			horizontal_padding: 20, /* The padding on each side of the picture */
			hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque', /* Set the flash wmode attribute */
			autoplay: true, /* Automatically start videos: True/False */
			modal: false, /* If set to true, only the close button will close the window */
			deeplinking: false, /* Allow prettyPhoto to update the url to enable deeplinking. */
			overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
			keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
			changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
			callback: function(){}, /* Called when prettyPhoto is closed */
			ie6_fallback: true,
			markup: '<div class="pp_pic_holder"> \
						' + caption + ' \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										' + bottom_panel + ' \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
			gallery_markup: gallery,				
		});
	}	
})(jsnThemeGridjQuery);;
