$(document).ready(function(){
	var $originalPlate = null;
	var originalTop = null;
	var originalLeft = null;
	var originalPosition = null;
	var originalCss = {};

	function resetCookies() {
		Cookies.set('chocolate', 0);
		Cookies.set('sugar', 0);
		Cookies.set('lemon', 0);
		fillCounts();
	}

	function fillCounts() {
		$('#chocolate-count').children('span').text(Cookies.get('chocolate'));
		$('#sugar-count').children('span').text(Cookies.get('sugar'));
		$('#lemon-count').children('span').text(Cookies.get('lemon'));
	}
	fillCounts();

	function increaseCount($this) {
		if ($this.hasClass('chocolate')) {
			var current = parseInt(Cookies.get('chocolate'));
			Cookies.set('chocolate', (isNaN(current) ? 1 : current+1));
		}
		if ($this.hasClass('sugar')) {
			var current = parseInt(Cookies.get('sugar'));
			Cookies.set('sugar', (isNaN(current) ? 1 : current+1));
		}
		if ($this.hasClass('lemon')) {
			var current = parseInt(Cookies.get('lemon'));
			Cookies.set('lemon', (isNaN(current) ? 1 : current+1));
		}
		fillCounts();
	}

	var droppedInRightPlace = false;
	$('.cookie').draggable({
		snap: ".cookie-monster.bottom .snap",
		snapMode: "inner",
		revert: 'invalid',
		start: function(){
			//Gather original CSS so we can reset it once it's eaten
			$originalPlate = $(this).parent();
			originalTop = $(this).css('top');
			originalLeft = $(this).css('left');
			originalPosition = $(this).css('position');
			originalCss = {
				top: originalTop,
				left: originalLeft,
				position: originalPosition
			};
		},
		stop: function(){
			if (droppedInRightPlace) {//Checks if dropped in right place
				$(this).appendTo('.cookie-monster.bottom').css({
					top: '0px',//Have to reset the top since dragging changed it
					left: '62px'
				}).animate({
					top: '-120px'//Where it moves to
				}, 3000, function(){
					//Reset the CSS
					$(this).appendTo($originalPlate).css(originalCss);
					droppedInRightPlace = false;//Reset to false
				});
				increaseCount($(this));
			}//end if
		}//end stop function
	});

	$('.snap').droppable({
		drop: function(){
			droppedInRightPlace = true;
		}
	});

	$(document).on('keypress', function(e){
		console.log(e.which);
		if (e.which === 26) {
			resetCookies();
		}
	});

	$('.how-it-works').hover(function(){
		$('#directions').toggleClass('hidden');
	});
});