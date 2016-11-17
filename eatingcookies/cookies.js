$(document).ready(function(){
	var $originalPlate = null;
	var originalTop = null;
	var originalLeft = null;
	var originalPosition = null;
	var originalCss = {};

	//A constructor for handling the cookies
	function Cookies() {
		this.cookies = {};//An object that will hold all cookies
		// Gets the cookie value searched for or returns 0
		this.get = function(name){
			if (this.cookies[name]) {
				return this.cookies[name];//Returns cookie value
			}
			return 0;
		}
		//Sets a cookies value
		this.set = function(name, value){
			this.cookies[name] = value;
		}
	}

	var cookies = new Cookies();

	//Set all cookies to 0 and update page counts
	function resetCookies() {
		cookies.set('chocolate', 0);
		cookies.set('sugar', 0);
		cookies.set('lemon', 0);
		fillCounts();
	}

	//Updates page counts
	function fillCounts() {
		$('#chocolate-count').children('span').text(cookies.get('chocolate'));
		$('#sugar-count').children('span').text(cookies.get('sugar'));
		$('#lemon-count').children('span').text(cookies.get('lemon'));
	}
	fillCounts();//Update page counts on page load

	// Accepts the html element with the class of cookie, checks 
	// which class it has, then finds that cookie and increments it by 1
	function increaseCount($this) {
		if ($this.hasClass('chocolate')) {
			cookies.set('chocolate', cookies.get('chocolate')+1);
		}
		if ($this.hasClass('sugar')) {
			cookies.set('sugar', cookies.get('sugar')+1);
		}
		if ($this.hasClass('lemon')) {
			cookies.set('lemon', cookies.get('lemon')+1);
		}
		fillCounts(); //Update page counts
	}


//------------------ jQuery event listeners ------------------\\
	var droppedInRightPlace = false;
	$('.cookie').draggable({ //Makes the cookies draggable
		snap: ".cookie-monster.bottom .snap",
		snapMode: "inner",
		revert: 'invalid',
		start: function(){//As soon as the cookie is grabbed
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
		stop: function(){//As soon as the cookie is released
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

	$('.snap').droppable({//This is where the cookies will be dropped
		drop: function(){
			droppedInRightPlace = true;
		}
	});

	$(document).on('keypress', function(e){//Listens for a key press
		console.log(e.which);
		if (e.which === 26) {//If ctrl+z is pushed, reset cookie count and update page
			resetCookies();
		}
	});
});