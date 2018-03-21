var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

var winSmall = 715;
var winMidle = 1425;

if (isTouch()) {
    var winMidle = 1440;
    var winSmall = 730;
}
$(document).ready(function() {


    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	checkOnResize();
    
    $('body').on('click', '.gridToggleInfo__video_count', function(event) {
        event.preventDefault();
        var wrap = $(this).closest('.gridToggleInfo__video');
        var id = $(this).data('video');
        var togle = wrap.find('.gridToggleInfo__video_count');
        var video = wrap.find('.video__wrap');

        togle.removeClass('active');
        video.removeClass('active');

        $(this).addClass('active');
        wrap.find('[data-video-id='+id+']').addClass('active');

    });

    jobsInfoToggler();

});

// begin Jobs page show description
function jobsInfoToggler() {

    $('body').on('click touchend', '.gridToggle__wrap', function(event) {
        event.preventDefault();
        var wrap = $(this).closest('.gridToggle__item'),
            row = $(this).closest('.gridToggle__row'),
            id = wrap.attr('id'),
            info = wrap.find('.gridToggleInfo'),
            infoCont = wrap.find('.gridToggleInfo > .container'),
            cloned = row.find('.gridToggleInfo.cloned'),
            clonedContent = row.find('.gridToggleInfo.cloned > .container'),
            clonedId = cloned.data('cloned');

        if ($(window).width() >= winSmall) {
            if ($('.gridToggle__wrap.active').length > 0) {
                jobsInfoHide();
            }

            if (id != clonedId) {

                $(this).addClass('active');
                info.clone().addClass('cloned').appendTo(row);

                setTimeout(function() {
                    sliderInfoInit(row.find('.gridToggleInfo.cloned').find('.gridToggleSlider'), row.find('.gridToggleInfo.cloned').find('.gridToggleSlider_thumbs'))
                }, 300);
        
                if ($(window).width() <= winMidle) {
                    $('.gridToggleInfo.cloned').find('.gridToggleInfo__name').prependTo('.gridToggleInfo.cloned> .container');
                }

                return false;
 
            }

        } else {
            if ($(this).hasClass('active')) {

                $(this).removeClass('active');

                info.removeClass('active');

            } else {
                $('.gridToggle__wrap').not($(this)).removeClass('active');

                $('.gridToggleInfo').not(info).removeClass('active');
                
                $(this).addClass('active');

                info.addClass('active');

                setTimeout(function() {
                    sliderInfoInit(wrap.find('.gridToggleSlider'), wrap.find('.gridToggleSlider_thumbs'))
                }, 300);
            }

            if ($(window).width() <= winMidle) {
                info.find('.gridToggleInfo__name').prependTo(infoCont);
            }

        }

    });

}

function jobsItemWrap() {
    var $set = $('.gridToggle__row').children();    
    if ($(window).width() <= winMidle) {
        if ($('div').is('.gridToggle__row_mob') == false) {
            $('.gridToggle__row').each(function(){

                var item = $(this).find('.gridToggle__item:lt(2)');

                item.wrapAll('<div class="gridToggle__row gridToggle__row_mob"></div>');

                jobsInfoHide();
                
            });
        }
    } else {
        $('.gridToggle__row .gridToggle__item').unwrap('.gridToggle__row_mob');
        jobsInfoHide();
    }
}

function jobsInfoHide() {
    $('.gridToggleInfo.cloned').remove();
    $('.gridToggle__wrap').removeClass('active');
    return false;
}

function sliderInfoInit(slider, sliderNav) {
    if (slider.hasClass('.slick-initialized')) {
        $(slider, sliderNav).each(function() {        
            $(this).slick('resize');
        });
    } else {    
        slider.not('.slick-initialized').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: sliderNav
        });
        sliderNav.not('.slick-initialized').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: slider,
            dots: false,
            infinite: false,
            centerMode: false,
            focusOnSelect: true,
            prevArrow: '<div class="owl-prev"><img src="img/arrow.svg"></div>',
            nextArrow: '<div class="owl-next"><img src="img/arrow.svg"></div>'
        });
    }
}
// end Jobs page show description


$(window).resize(function() {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) { return; }
    TempApp.resized = windowWidth;

	checkOnResize()
});

function checkOnResize() {
    jobsItemWrap();
    if ($(window).width() < winSmall) {
        if ($('.gridToggleInfo.cloned')) {
            jobsInfoHide();
        }
    }
}

// Скрипты написанные до меня
$(function() {
    "use strict";

    $('.scroll').click(function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
    });

    var steps = $('.steps-layout.owl-carousel'),
        stepResolution = 1024,
        stepSettings = {
            loop: false,
            margin: 0,
            nav: true,
            dots: false,
            autoWidth: true,
            navText: ["<img src='img/arrow.svg'>", "<img src='img/arrow.svg'>"]
        };

    if (steps.parents('.background-lighter').length) {
        stepResolution = 560;
    }

    if ($(window).width() < stepResolution) {
        var owlActive = steps.owlCarousel(stepSettings);
    } else {
        steps.addClass('off');
    }

    $(window).resize(function() {
        $('.owl-carousel').trigger('refresh.owl.carousel');

        if ($(window).width() < stepResolution) {
            if ($('.owl-carousel').hasClass('off')) {
                var owlActive = steps.owlCarousel(stepSettings);
                steps.removeClass('off');
            }
        } else {
            if (!$('.owl-carousel').hasClass('off')) {
                steps.addClass('off').trigger('destroy.owl.carousel');
                steps.find('.owl-stage-outer').children(':eq(0)').unwrap();
            }
        }
    });

    var overflowCarouselSettings = {
        loop: false,
        margin: 30,
        nav: true,
        dots: false,
        autoWidth: true,
        navText: ["<img src='img/arrow.svg'>", "<img src='img/arrow.svg'>"],
    };

    var imagesCarouselSetting = {
        items: 1,
        loop: false,
        dots: true,
        nav: false,
        margin: 20,
        autoheight: true
    };

    var reviewsCarouselSettings = {
        items: 1,
        loop: false,
        dots: false,
        nav: true,
        mouseDrag: false,
        touchDrag: false,
        autoheight: true,
        navText: ["<img src='img/arrow.svg'>", "<img src='img/arrow.svg'>"]
    };

    $(window).on('load', function() {
        var ovfCarousel = $('.overflow-carousel').owlCarousel(overflowCarouselSettings);

        var imgCarousel = $('.images-carousel').owlCarousel(imagesCarouselSetting);

        var reviewsCarousel = $('.reviews-carousel').owlCarousel(reviewsCarouselSettings);

        imgCarousel.on('resize.owl.carousel', function(event) {

        });

        $('.review-text').mCustomScrollbar({
            setHeight: "275px"
        });

        // $("input[type=tel]").mask("+7 (999) 999-99-99");
    });

    $('input[type=tel]').keypress(function validate(event) {
        var theEvent = event || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        // var regex = /^[- +()]*[0-9][- +()0-9]*/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    });

    // Cache selectors
    var lastId,
        nav = $(".nav-vertical"),
        heightDiff = $(window).height() / 2 - nav.height() / 2,
        // All list items
        menuItems = nav.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop - heightDiff + 1
        }, 850);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + heightDiff;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (cur.length) {
            if (cur.hasClass('banner-section')) {
                nav.addClass('banner');
            } else {
                nav.removeClass('banner');
            }
        }

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=\\#" + id + "]").parent().addClass("active");
        }
    });

    $(window).scroll();

    $('.foundation-preview').click(function(event) {
        event.preventDefault();
        var index = $(this).index();
        var toOpen = $(this).parent().next().find('.foundation-info').eq(index);
        toOpen.fadeIn();
        $('html, body').stop().animate({
            scrollTop: toOpen.offset().top
        }, 850);
        $('.foundation-overlay').fadeIn();
    });

    function openModal(modalToOpen) {
        $(modalToOpen).fadeIn();
        $('.overlay').fadeIn();
    }

    $('.foundation-info .cross a').click(function(event) {
        event.preventDefault();
        $(this).parents('.foundation-info').fadeOut();
        $(this).parents('.foundation-info').siblings('.foundation-overlay').fadeOut();
    });

    $('.modal .cross a').click(function(event) {
        event.preventDefault();
        $(this).parents('.modal').fadeOut();
        $('.overlay:visible').fadeOut();
    });

    $('.overlay').click(function(event) {
        $('.modal:visible').fadeOut();
    });

    $('.foundation-overlay').click(function(event) {
        $('.foundation-info:visible').fadeOut();
        $(this).fadeOut();
    });

    $('.nav-container .cross a').click(function(event) {
        event.preventDefault();
        $(this).parents('.nav-container').toggleClass('open');
        $('.nav-container').css('transition', 'all 0.3s ease-in-out');
        setTimeout(function() {
          $('.nav-container').css('transition', '');
        }, 300);
    });

    $('.toggle-menu').click(function() {
        $('.nav-container').toggleClass('open');
        $('.nav-container').css('transition', 'all 0.3s ease-in-out');
        setTimeout(function() {
          $('.nav-container').css('transition', '');
        }, 300);
    });

    $('form').submit(function(event) {
        event.preventDefault();
        var form = $(this);
        form.find('input:required', 'textarea:required').each(function() {
            var input = $(this);

            if (!input.val()) {
                input.addClass('error');
                input.parents('.form-block').addClass('error');
                if (!input.parents('.form-block').find('.error-message').length) {
                    var el = $('<span class="error-message"></span>');
                    switch (input.attr('name')) {
                        case 'name':
                            el.text('Введите Ваше имя');
                            break;
                        case 'tel':
                            el.text('Введите номер телефона');
                            break;
                        case 'email':
                            el.text('Введите Ваш e-mail');
                            break;
                        default:
                            el.text('Заполните поле');
                    }
                    input.parents('.form-block').append(el);
                }
            } else {
                if (input.attr('name') == 'email') {
                    if (!validateEmail(input.val())) {
                        var emailText = 'Введите корректный e-mail';
                        if (input.hasClass('error')) {
                            input.siblings('.error-message').text(emailText);
                        } else {
                            input.addClass('error');
                            input.parents('.form-block').addClass('error');
                            var elEmail = $('<span class="error-message"></span>');
                            elEmail.text(emailText);
                            input.parents('.form-block').append(elEmail);
                        }
                    } else {
                        input.removeClass('error');
                        input.parents('.form-block').removeClass('error');
                        input.parents('.form-block').find('.error-message').remove();
                    }
                } else {
                    input.removeClass('error');
                    input.parents('.form-block').removeClass('error');
                    input.parents('.form-block').find('.error-message').remove();
                }
            }
        });

        if (!form.find('input.error').length) {
            if (form.attr('action')) {
                $.post(form.attr('action'));
            }
            form.parents('.modal').fadeOut();
            openModal($('.callback-success'));
            form.find('button[type=submit]').attr('disabled', 'disabled');
        }
    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    $('.open-callback').click(function(event) {
        event.preventDefault();
        openModal('.callback');
    });

    $('.open-callback2').click(function(event) {
        event.preventDefault();
        openModal('.callback2');
    });

    $('.open-callback3').click(function(event) {
        event.preventDefault();
        openModal('.callback3');
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('.modal:visible').fadeOut();
            $('.foundation-info-list > div:visible').fadeOut();
        }
    });
});
