javascript:
(function(){
	function getScript(url, success) {
	    var script = document.createElement('script');
	    script.src = url;
	    var head = document.getElementsByTagName('head')[0],
	        done = false;
	    script.onload = script.onreadystatechange = function() {
	        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
	            done = true;
	            success();
	            script.onload = script.onreadystatechange = null;
	            head.removeChild(script);
	        }
	    };
	    head.appendChild(script);
	}
	function createMeasureStick($) {
		var jqui = getScript('//code.jquery.com/ui/1.12.1/jquery-ui.min.js', function() {
			var ms = $('<div></div>');
			var label = $('<span></span>');
			ms.css({
				backgroundColor: 'orange',
				height: '10px',
				left: '20px',
				position: 'absolute',
				top: '20px',
				width: '10px',
				zIndex: '999999'
			}).appendTo('body');
			ms.draggable({
				grid: [20, 20],
				drag: function() {
					updateLabel()
				}
			});
			label.css({
				position: 'fixed',
				zIndex: '999999',
				backgroundColor: '#000000',
				color: '#FFFFFF',
				top: '0',
				right: '0',
				padding: '5px',
			}).appendTo('body');
			$(document).keydown(function(e) {
				var step = e.shiftKey ? 10 : 1;
				switch (e.keyCode) {
				case 37: /* left */
					if (e.altKey) {
						ms.width(ms.width() - step);
					} else {
						ms.css('left', (parseInt(ms.offset().left, 10) - step) + 'px');
					}
					break;
				case 38: /* up */
					if (e.altKey) {
						ms.height(ms.height() - step);
					} else {
						ms.css('top', (parseInt(ms.offset().top, 10) - step) + 'px');
					}
					break;
				case 39: /* right */
					if (e.altKey) {
						ms.width(ms.width() + step);
					} else {
						ms.css('left', (parseInt(ms.offset().left, 10) + step) + 'px');
					}
					break;
				case 40: /* down */
					if (e.altKey) {
						ms.height(ms.height() + step);
					} else {
						ms.css('top', (parseInt(ms.offset().top, 10) + step) + 'px');
					}
					break;
				default:
					/* If not a key we care about, let it through */
					return true;
				}
				updateLabel();
				return false;
			});
			var updateLabel = function() {
				label.html(ms.width() + ', ' + ms.height());
				var msBorderTop = parseInt(ms.offset().top, 10);
				var msBorderRight = parseInt(ms.offset().left, 10) + ms.width();
				var labelBorderTop = label.height() + 20;
				var labelBorderLeft = parseInt(label.offset().left, 10) - 20;
				var labelAtTop = parseInt(label.offset().top, 10) < 1;
				if (msBorderTop < labelBorderTop && msBorderRight > labelBorderLeft) {
					label.css({
						right: 0,
						top: '',
						bottom: 0
					});
				} else {
					label.css({
						right: 0,
						top: 0,
						bottom: ''
					});
				}
			};
			updateLabel();
		});
	}
	function getjQuery() {
	    var el = document.createElement('div'),
	        b = document.getElementsByTagName('body')[0],
	        otherlib = false,
	        msg = '';
	    el.style.position = 'fixed';
	    el.style.height = '32px';
	    el.style.width = '220px';
	    el.style.marginLeft = '-110px';
	    el.style.top = '0';
	    el.style.left = '50%';
	    el.style.padding = '5px 10px';
	    el.style.zIndex = 1001;
	    el.style.fontSize = '12px';
	    el.style.color = '#222';
	    el.style.backgroundColor = '#f99';
	    if (typeof jQuery != 'undefined') {
	        msg = 'This page already using jQuery v' + jQuery.fn.jquery;
	        createMeasureStick(jQuery);
	        return showMsg();
	    } else if (typeof $ == 'function') {
	        otherlib = true;
	    }

	    getScript('//code.jquery.com/jquery-3.4.1.min.js', function() {
	        if (typeof jQuery == 'undefined') {
	            msg = 'Sorry, but jQuery wasn\'t able to load';
	        } else {
	            msg = 'This page is now jQuerified with v' + jQuery.fn.jquery;
	            if (otherlib) {
	                msg += ' and noConflict(). Use $jq(), not $().';
	            }
	        }
	        createMeasureStick(jQuery);
	        return showMsg();
	    });

	    function showMsg() {
	        el.innerHTML = msg;
	        b.appendChild(el);
	        window.setTimeout(function() {
	            if (typeof jQuery == 'undefined') {
	                b.removeChild(el);
	            } else {
	                jQuery(el).fadeOut('slow', function() {
	                    jQuery(this).remove();
	                });
	                if (otherlib) {
	                    $jq = jQuery.noConflict();
	                }
	            }
	        }, 2500);
	    }
	}
	getjQuery();
})()
