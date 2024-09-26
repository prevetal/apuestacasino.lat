WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Forecasts slider
	const forecastsSliders = [],
		forecasts = document.querySelectorAll('.forecasts .swiper')

	forecasts.forEach((el, i) => {
		el.classList.add('forecasts_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			slidesPerView: 'auto',
			breakpoints: {
				0: {
					spaceBetween: 24
				},
				1280: {
					spaceBetween: 30
				}
			}
		}

		forecastsSliders.push(new Swiper('.forecasts_s' + i, options))
	})


	// First section spoler
	$('.first_section .mob_spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.first_section .text_block').toggleClass('show')
	})


	// Mini popups
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Close the popup when clicking outside of it
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Bookmakers - spoler
	$('.bookmakers .spoler_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.item')

		$(this).toggleClass('active')
		parent.next('.data').slideToggle(300)
	})


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Copy to clipboard
	const clipboard = new ClipboardJS('.copy_btn')

	clipboard.on('success', e => {
		e.preventDefault()

		$(e.trigger).addClass('copied')

		setTimeout(() => $(e.trigger).removeClass('copied'), 3000)

		e.clearSelection()
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header').toggleClass('show')
	})


	// Theme toggle
	$('.theme_btn').click(function(e) {
		e.preventDefault()

		$('html').toggleClass('dark_theme')
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 390) document.getElementsByTagName('meta')['viewport'].content = 'width=390, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})