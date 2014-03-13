javascript: (function($) {
	var jqui = $.getScript('//code.jquery.com/ui/1.10.3/jquery-ui.js', function() {
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
}(jQuery))
