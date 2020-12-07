$(document).ready(function() {
	const navOffset = $('.header-nav').offset().top;
	$(window).scroll(function() {
		const scrolled = $(this).scrollTop();
		if (scrolled > navOffset) {
			$('.header-nav').addClass('fixed');
			$('.logo').addClass('center');
			$('.slider').addClass('padding-top');
		}
		else if (scrolled < navOffset) {
			$('.header-nav').removeClass('fixed');
			$('.logo').removeClass('center');
			$('.slider').removeClass('padding-top');
		}
	});

	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll('.lock-padding');
	let unlock = true;
	const timeout = 800;
	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener('click', function(e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const currentPopup = document.getElementById(popupName);
				popupOpen(currentPopup);
				e.preventDefault();
			});
		}
	}
	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}
	function popupOpen(currentPopup) {
		if (currentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			currentPopup.classList.add('open');
			currentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup-content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}
	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock) {
				bodyUnLock();
			}
		}
	}
	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue/2;
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');
		unlock = false;
		setTimeout(function() {
			unlock = true;
		},  timeout);
	}
	function bodyUnLock() {
		setTimeout(function() {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		},  timeout);
		unlock = false;
		setTimeout(function() {
			unlock = true;
		},  timeout);
	}

	$('.slider').slick({
		arrows:false,
		dots:true,
		adaptiveHeight:true,
		autoplay:true,
		responsive:[{
			breakpoint:737,
			settings:{
				adaptiveHeight:false
			}
		}]
	});

	$('.burger').on('click', function(event) {
		event.preventDefault;
		$(this).toggleClass('active');
		$('.burger_content').toggleClass('active_content');
		$('body').toggleClass('lock');
	});

	$('.slider-fastfood').slick({
		slidesToShow:5,
		slidesToScroll:5,
		prevArrow: "<img src='../restaurant/img/arrow-left.svg' class='prev' alt='1'>",
    	nextArrow: "<img src='../restaurant/img/arrow-right.svg' class='next' alt='2'>",
    	responsive:[{
    		breakpoint:1000,
    		settings:{
    			slidesToShow:4,
    			slidesToScroll:4
    	}},{
    		breakpoint:777,
    		settings:{
    			slidesToShow:3,
    			slidesToScroll:3
    	}},{
    		breakpoint:555,
    		settings:{
    			slidesToShow:2,
    			slidesToScroll:2
    	}},{
    		breakpoint:404,
    		settings:{
    			slidesToShow:1,
    			slidesToScroll:1,
    			centerMode:true
    		}
    	}]
	});

	$('.num_list>li').on('click', function(event) {
		event.preventDefault;
		$(this).toggleClass('active').next().slideToggle(300);
	});

	$('.slider-stuff').slick({
		slidesToShow:3,
		slidesToScroll:3,
		prevArrow: "<img src='../restaurant/img/arrow-left.svg' class='prev' alt='1'>",
    	nextArrow: "<img src='../restaurant/img/arrow-right.svg' class='next' alt='2'>",
    	responsive:[{
    		breakpoint:1000,
    		settings:{
    			slidesToShow:2,
    			slidesToScroll:2,
    	}},{
    		breakpoint:600,
    		settings:{
    			slidesToShow:1,
    			slidesToScroll:1,
    			centerMode:true
    		}
    	}]
	});

	$('.menu-list>li>a').on('click', function(event) {
		event.preventDefault();
		$('.menu-list>li>a').removeClass('active');
		$('.menu-block').removeClass('active-tab');
		$(this).addClass('active');
		$($(this).attr('href')).addClass('active-tab');
	});
	$('.menu-list>li>a:first').click();
	// document.querySelectorAll('.menu-list>li>a').forEach((item) =>
	// 	item.addEventListener('click', function(e) {
	// 		e.preventDefault();
	// 		const id = e.target.getAttribute('href').replace('#', '');
	// 		document.querySelectorAll('.menu-list>li>a').forEach(
	// 			(child) => child.classList.remove('active')
	// 		);
	// 		document.querySelectorAll('.menu-block').forEach(
	// 			(child) => child.classList.remove('active-tab')
	// 		);
	// 		item.classList.add('active');
	// 		document.getElementById(id).classList.add('active-tab');
	// 	})
	// );
});