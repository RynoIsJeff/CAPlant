jQuery(function ($) {
	'use strict';

	/* ----------------------------------------------------------- */
	/*  Fixed header
	/* ----------------------------------------------------------- */
	$(window).on('scroll', function () {

		// fixedHeader on scroll
		function fixedHeader() {
			var headerTopBar = $('.top-bar').outerHeight();
			var headerOneTopSpace = $('.header-one .logo-area').outerHeight();

			var headerOneELement = $('.header-one .site-navigation');
			var headerTwoELement = $('.header-two .site-navigation');

			if ($(window).scrollTop() > headerTopBar + headerOneTopSpace) {
				$(headerOneELement).addClass('navbar-fixed');
				$('.header-one').css('margin-bottom', headerOneELement.outerHeight());
			} else {
				$(headerOneELement).removeClass('navbar-fixed');
				$('.header-one').css('margin-bottom', 0);
			}
			if ($(window).scrollTop() > headerTopBar) {
				$(headerTwoELement).addClass('navbar-fixed');
				$('.header-two').css('margin-bottom', headerTwoELement.outerHeight());
			} else {
				$(headerTwoELement).removeClass('navbar-fixed');
				$('.header-two').css('margin-bottom', 0);
			}
		}
		fixedHeader();


		// Count Up
		function counter() {
			var oTop;
			if ($('.counterUp').length !== 0) {
				oTop = $('.counterUp').offset().top - window.innerHeight;
			}
			if ($(window).scrollTop() > oTop) {
				$('.counterUp').each(function () {
					var $this = $(this),
						countTo = $this.attr('data-count');
					$({
						countNum: $this.text()
					}).animate({
						countNum: countTo
					}, {
						duration: 1000,
						easing: 'swing',
						step: function () {
							$this.text(Math.floor(this.countNum));
						},
						complete: function () {
							$this.text(this.countNum);
						}
					});
				});
			}
		}
		counter();


		// scroll to top btn show/hide
		function scrollTopBtn() {
			var scrollToTop = $('#back-to-top'),
				scroll = $(window).scrollTop();
			if (scroll >= 50) {
				scrollToTop.fadeIn();
			} else {
				scrollToTop.fadeOut();
			}
		}
		scrollTopBtn();
	});


	$(document).ready(function () {

		// navSearch show/hide
		function navSearch() {
			$('.nav-search').on('click', function () {
				$('.search-block').fadeIn(350);
			});
			$('.search-close').on('click', function () {
				$('.search-block').fadeOut(350);
			});
		}
		navSearch();

		// navbarDropdown
		function navbarDropdown() {
			if ($(window).width() < 992) {
				$('.site-navigation .dropdown-toggle').on('click', function () {
					$(this).siblings('.dropdown-menu').animate({
						height: 'toggle'
					}, 300);
				});

				var navbarHeight = $('.site-navigation').outerHeight();
				$('.site-navigation .navbar-collapse').css('max-height', 'calc(100vh - ' + navbarHeight + 'px)');
			}
		}
		navbarDropdown();


		// back to top
		function backToTop() {
			$('#back-to-top').on('click', function () {
				$('#back-to-top').tooltip('hide');
				$('body,html').animate({
					scrollTop: 0
				}, 800);
				return false;
			});
		}
		backToTop();


		// banner-carousel
		function bannerCarouselOne() {
			$('.banner-carousel.banner-carousel-1').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				dots: true,
				speed: 600,
				arrows: true,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
			});
			$('.banner-carousel.banner-carousel-1').slickAnimation();
		}
		bannerCarouselOne();


		// banner Carousel Two
		function bannerCarouselTwo() {
			$('.banner-carousel.banner-carousel-2').slick({
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				dots: false,
				speed: 600,
				arrows: true,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
			});
		}
		bannerCarouselTwo();


		// pageSlider
		function pageSlider() {
			$('.page-slider').slick({
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				dots: false,
				speed: 600,
				arrows: true,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
			});
		}
		pageSlider();


		// Shuffle js filter and masonry
		function projectShuffle() {
			if ($('.shuffle-wrapper').length !== 0) {
				var Shuffle = window.Shuffle;
				var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
					itemSelector: '.shuffle-item',
					sizer: '.shuffle-sizer',
					buffer: 1
				});
				$('input[name="shuffle-filter"]').on('change', function (evt) {
					var input = evt.currentTarget;
					if (input.checked) {
						myShuffle.filter(input.value);
					}
				});
				$('.shuffle-btn-group label').on('click', function () {
					$('.shuffle-btn-group label').removeClass('active');
					$(this).addClass('active');
				});
			}
		}
		projectShuffle();




		// media popup
		function mediaPopup() {
			$('.gallery-popup').colorbox({
				rel: 'gallery-popup',
				transition: 'slideshow',
				innerHeight: '500'
			});
			$('.popup').colorbox({
				iframe: true,
				innerWidth: 600,
				innerHeight: 400
			});
		}
		mediaPopup();

		// Contact form validation and submission
		function contactFormHandler() {
			var $form = $('#contact-form');
			if ($form.length === 0) return;

			var $errorContainer = $('.error-container');
			var $successContainer = $('.success-container');
			var $submitButton = $form.find('button[type="submit"]');
			var $buttonText = $submitButton.find('.button-text');
			var $buttonLoading = $submitButton.find('.button-loading');

			function showError(message) {
				$errorContainer.html('<div class="alert alert-danger" role="alert">' + message + '</div>');
				$successContainer.html('');
				$errorContainer.focus();
			}

			function showSuccess(message) {
				$successContainer.html('<div class="alert alert-success" role="alert">' + message + '</div>');
				$errorContainer.html('');
				$form[0].reset();
				$form.find('.error-message').text('');
				$form.find('.form-control').removeClass('error');
			}

			function validateField($field) {
				var value = $field.val().trim();
				var isValid = true;
				var errorMessage = '';

				if ($field.prop('required') && !value) {
					isValid = false;
					errorMessage = 'This field is required.';
				} else if ($field.attr('type') === 'email' && value) {
					var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					if (!emailRegex.test(value)) {
						isValid = false;
						errorMessage = 'Please enter a valid email address.';
					}
				}

				var $errorSpan = $('#' + $field.attr('aria-describedby'));
				if ($errorSpan.length) {
					$errorSpan.text(errorMessage);
				}

				if (isValid) {
					$field.removeClass('error');
				} else {
					$field.addClass('error');
				}

				return isValid;
			}

			// Real-time validation
			$form.find('input, textarea').on('blur', function() {
				validateField($(this));
			});

			$form.on('submit', function(e) {
				e.preventDefault();

				var isValid = true;
				$form.find('input[required], textarea[required]').each(function() {
					if (!validateField($(this))) {
						isValid = false;
					}
				});

				if (!isValid) {
					showError('Please correct the errors in the form.');
					$form.find('.error').first().focus();
					return false;
				}

				// Disable submit button and show loading state
				$submitButton.prop('disabled', true);
				$buttonText.hide();
				$buttonLoading.show();

				// Submit form via AJAX
				$.ajax({
					url: $form.attr('action'),
					method: 'POST',
					data: $form.serialize(),
					dataType: 'json',
					success: function(response) {
						showSuccess('Thank you! Your message has been sent successfully. We will get back to you soon.');
						$submitButton.prop('disabled', false);
						$buttonText.show();
						$buttonLoading.hide();
					},
					error: function(xhr) {
						var errorMsg = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
						if (xhr.responseJSON && xhr.responseJSON.error) {
							errorMsg = xhr.responseJSON.error;
						}
						showError(errorMsg);
						$submitButton.prop('disabled', false);
						$buttonText.show();
						$buttonLoading.hide();
					}
				});

				return false;
			});
		}
		contactFormHandler();

	});


});