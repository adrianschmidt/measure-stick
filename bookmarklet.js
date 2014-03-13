javascript:(function($) {

	var jqui = $.getScript('//code.jquery.com/ui/1.10.3/jquery-ui.js', function() {
		var ms = $('<div></div>');
		ms.css({
			backgroundColor: 'orange',
			height: '10px',
			left: '20px',
			position: 'absolute',
			top: '20px',
			width: '10px',
			zIndex: '999999'
		}).appendTo('body').draggable({ grid: [ 20, 20 ] });

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
				return true;
			}

			return false;
		});
	});

}(jQuery))