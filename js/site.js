/**
 * Main application functions
 * - document.ready()
 * -
 */

$(document).ready(function () {


    function onWindowResize() {
        $('.colored-box-image').each(function () {
            $(this).prev().height($(this).height());
        });

        var windowWidth = window.outerWidth != 0 ? window.outerWidth : $(window).width();

        if (windowWidth > 480) {
            $('.contact-social-links').each(function () {
                var width = (($(this).width() - 3) / 4);

                $(this).find('.contact-social-link').width(width);
                $(this).find('.contact-social-link').css('border-right', '1px solid black');
                $(this).find('.contact-social-link-last').css('border-right', '0');
            });
        } else {
            $('.contact-social-links').each(function () {
                var width = (($(this).width() - 1) / 2);

                $(this).find('.contact-social-link').width(width);
                $(this).find('.contact-social-link').css('border-right', '0');
                $(this).find('.contact-social-link:nth-child(1)').css('border-bottom', '1px solid black');
                $(this).find('.contact-social-link:nth-child(2)').css('border-bottom', '1px solid black');
                $(this).find('.contact-social-link:even').css('border-right', '1px solid black');
            });
        }
    }

    onWindowResize();
    $(window).resize(onWindowResize);

    $('.contact-social-link').on('mouseover', function () {
        backgroundColorChange($(this).find('img'));
    });

    var menu = $('#menu');
    var logo = $('.logo');
    var menuIcon = $('.menu-icon');
    var menuLink = $('.menu-link');

    var screenWidth = $(window).width();

    if (screenWidth < '1024') {
        menu.addClass('menu-small');
        menuLink.addClass('menu-small-open');
    }


    // logo animation
    logo.hover(
        function () {
            animateImageBackground(this);
        },
        function () {
            animateToGray(this);
        });

    // menu animation
    menuIcon.on('click', function () {
        if (menu.hasClass('open')) {
            menuIcon.attr('src', 'images/menu.png');
            menuLink.animate({opacity: 0}, 350, function(){
                menu.removeClass('open');
                logo.show().animate({opacity:1}, 200, function(){});
                menuIcon.attr('src', 'images/menu.png');

            });

        }
        else {
            logo.hide().animate({opacity: 0}, 0, function(){});
            menu.addClass('open');
            menuIcon.css('background-color', '#292929').attr('src', 'images/menu-on.png');

            menu.animate({opacity: 1}, 50, function(){
                menuLink.animate({ opacity: 1 }, 550, function () {
                    menuIcon.css('background-color', '#292929').attr('src', 'images/menu-close.png');
                });
            });

            menu.promise().done(function () {
                animateTextColor(menuLink);
            });
        }
    });

    menuIcon.on('tap', function () {
        if (menu.hasClass('open')) {
            menuIcon.attr('src', 'images/menu.png');
            menuLink.animate({opacity: 0}, 350, function(){
                menu.removeClass('open');
                logo.show().animate({opacity:1}, 200, function(){});
                menuIcon.attr('src', 'images/menu.png');

            });

        }
        else {
            logo.hide().animate({opacity: 0}, 0, function(){});
            menu.addClass('open');
            menu.animate({opacity: 1}, 0, function(){
                menuLink.animate({opacity: 1}, 350)
                menuIcon.css('background-color', '#292929').attr('src', 'images/menu-close.png');//.delay(350).css('background-color', '#292929').attr('src', 'images/menu-close.png');
            });
        }
    });

    // portfolio animation
    $('.project-thumb-container').hover(
        function () {

            var image = new Image();
            image = $(this).find('img');

            var colorThief = new ColorThief();
            var color = colorThief.getColor(image[0], 1);

            var colors = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ')';

            var timing = 350;
            $("<div id='" + color[0] + "-" + color[1] + "-" + color[2] + "'/>").css({
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                zIndex: 1000,  // to be on the safe side
                backgroundColor: 'transparent',
                opacity: 0,
                cursor: 'pointer'
            }).appendTo($(this).css("position", "relative")).animate({opacity: .6, backgroundColor: colors}, timing);

            // complement
            var thisrgb = [color[0], color[1], color[2]];
            var complement = contrastingColor(thisrgb);
            var text = $(this).find('p');
            text.animate({'color': '#' + complement}, timing);

            return;
        },
        function () {
            var image = new Image();
            image = $(this).find('img');

            var colorThief = new ColorThief();
            var color = colorThief.getColor(image[0], 1);

            var colors = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
            var image = $(this).find('img');

            var id = '#' + color[0] + '-' + color[1] + '-' + color[2];
            var timing = 350;
            $(id).animate({opacity: 0,}, timing, function () {
                $(id).remove();
            })

            // complement
            var text = $(this).find('p');

            if (text.hasClass('white')) {
                text.animate({'color': 'white'}, timing);
            }
            else {
                text.animate({'color': '#999999'}, timing);
            }
            return;
        }
    );

    // window resize actions
    $(window).resize(function () {
        if ($(document).width() >= '1024') {
            logo.show();
            menuIcon.attr('src', 'images/menu.png').hide();
            menu.show().removeClass('menu-small', 0).removeClass('open', 0);
            menuLink.show().css('color', 'rgb(41,41,41)');
            headerScrollControl();
        }
        else {
            logo.css('opacity', '1.0');
            menuIcon.show();
            menu.addClass('menu-small', 0);
        }

        $('#menu.menu-small.open ul li').css('height', '20%');
    });

    headerScrollControl();

});

// animation functions

function animateImageBackground(element) {

    var mouseover = true;
    $(element).mouseenter(function () {
        mouseover = true;
    })
    $(element).mouseleave(function () {
        mouseover = false;
        animateToGray(element);
        return;
    });

    var colors = ['#7EC300', '#CC0066', '#FF6600', '#FF9900'];

    if($(element).hasClass('logo')) {
        $(element).animate({backgroundColor: '#33cc00'}, 500, function () {
            if (mouseover == true) {
                $(element).animate({backgroundColor: '#' + colors[0]}, 3000, function () {
                    if (mouseover == true) {
                        $(element).animate({backgroundColor: '#' + colors[1]}, 3000, function () {
                            if (mouseover == true) {
                                $(element).animate({backgroundColor: '#' + colors[2]}, 3000, function () {
                                    if (mouseover == true) {
                                        $(element).animate({backgroundColor: '#' + colors[3]}, 3000, function () {
                                            animateToGray(element);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }

        });
    }
}

function animateTextColor(element) {

    console.log('running');
    var colors = ['#7EC300', '#CC0066', '#FF6600', '#FF9900'];

    $(element).animate({color: '#33cc00'}, 500, function () {
        console.log('1');
    });

    $(element).promise().done(function () {
        $(element).animate({color: colors[0]}, 3000, function() {
            console.log('2');
        });
    });

    $(element).promise().done(function () {
        $(element).animate({ color: colors[1] }, 3000, function () {
            console.log('3');
        });
    });

    $(element).promise().done(function () {
        $(element).animate({ color: colors[2] }, 3000, function () {
            console.log('4');
        });
    });

    $(element).promise().done(function () {
        $(element).animate({ color: colors[3] }, 3000, function () {
            animateToGray(element);

            console.log('5');
        });
    });
}


function animateToGray(element) {
    if ($(element).hasClass('menu-link')) {
        $(element).animate({color: '#292929'}, 500).delay(500);
    }
    else {
        $(element).animate({backgroundColor: '#292929'}, 500).delay(500);
    }
}

function headerScrollControl() {
    $(window).scroll(function () {

        var screenWidth = $(window).width();

        if (screenWidth >= 1024) {
            if ($(document).scrollTop() > 0) {
                $('header').removeClass('header-tall').addClass('header-small');
            }
            if ($(document).scrollTop() <= 0) {
                $('header').removeClass('header-small').addClass('header-tall');
            }
        }
        else {
            $('header').removeClass('header-tall').addClass('header-small');
        }
    });
}


// carousel functions
function carouselInit(data) {
    $('#carousel-status').html('1<span class="slash">/</span>' + $('.ls-slide').length);
    layerSliderTransitions.t2d[0].transition.duration = 500;
    layerSliderTransitions.t2d[0].transition.easing = 'easeInOutCirc';
}

function carouselAnim(data) {
    $('#carousel-status').html(data['curLayerIndex'] + '<span class="slash">/</span>' + data['layersNum'])
}

//

function scrollTo(element){
    $(window).scrollTop(element);
}