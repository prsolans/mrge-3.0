/**
 * Main application functions
 * - document.ready()
 * -
 */

$(document).ready(function () {

    var menu = $('#menu');
    var logo = $('.logo');
    var menuIcon = $('.menu-icon');

    var screenWidth = $(window).width();

    $(".overlay").mouseenter(function(){
        clearTimeout($(this).data('timeoutId'));
        backgroundColorChange('.overlay');
    }).mouseleave(function(){
        var someElement = $(this),
            timeoutId = setTimeout(function(){
                fadeToGray('.overlay');
            }, 650);
        //set the timeoutId, allowing us to clear this trigger if the mouse comes back over
        someElement.data('timeoutId', timeoutId);
    });

    menuIcon.on('click', function () {


        if(!menu.hasClass('open')) {
            logo.hide();
            menu.addClass('open');
            menu.show();
            menuIcon.attr('src', 'images/menu-on.png').fadeOut(800, function(){
                console.log('1');
                menuIcon.css('background', '#292929').attr('src', 'images/menu-close.png');
                menuIcon.show();
            });
            textColorChange('.menu-link');
            backgroundColorChange('.menu-icon');
        }
        else{
            logo.show();
            menu.removeClass('open');
            menu.hide();
            menuIcon.attr('src', 'images/menu.png');
        }
    });

    menuIcon.on('tap', function () {

        if(!menu.hasClass('open')) {
            logo.hide();
            menu.addClass('open');
            menu.show();
            menuIcon.attr('src', 'images/menu-on.png').fadeOut(800, function(){
                console.log('1');
                menuIcon.css('background', '#292929').attr('src', 'images/menu-close.png');
                menuIcon.show();
            });
            textColorChange('.menu-link');
            backgroundColorChange('.menu-icon');
        }
        else{
            logo.show();
            menu.removeClass('open');
            menu.hide();
            menuIcon.attr('src', 'images/menu.png');
        }
    });

    $('.menu-close').on('click', function() {
        menu.slideToggle();
       menuIcon.attr('src', 'images/menu.png');
       logo.show();

    });

    $('.menu-close').on('tap', function() {
        menu.slideToggle();
        menuIcon.attr('src', 'images/menu.png');
    });


    if (screenWidth <= '1024') {
        menu.addClass('menu-small');
    }


    $('.project-thumb-container').hover(

        function () {

            var image = new Image();
            image = $(this).find('img');

            var colorThief = new ColorThief();
            var color = colorThief.getColor(image[0], 1);

            var colors = 'rgba('+color[0] + ',' + color[1] + ',' + color[2] +')';

            $("<div id='"+color[0]+"-"+color[1]+"-"+color[2]+"'/>").css({
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                zIndex: 1000,  // to be on the safe side
                backgroundColor: 'transparent',
                opacity:0,
                cursor: 'pointer'
            }).appendTo($(this).css("position", "relative")).animate({opacity:.6, backgroundColor: colors}, 800);

            // complement
            var thisrgb = [color[0], color[1], color[2]];
            var complement = contrastingColor(thisrgb);
            var text = $(this).find('p');
            text.animate({'color': '#'+complement}, 600);

            return;
        },
        function () {
            var image = new Image();
            image = $(this).find('img');

            var colorThief = new ColorThief();
            var color = colorThief.getColor(image[0], 1);

            var colors = 'rgba('+color[0] + ',' + color[1] + ',' + color[2] +')';
            var image = $(this).find('img');

            var id = '#'+color[0]+'-'+color[1]+'-'+color[2];
            $(id).animate({opacity: 0,}, 800, function() {
                $(id).remove();
            })

            // complement
            var thisrgb = [color[0], color[1], color[2]];
            var complement = contrastingColor(thisrgb);
            var text = $(this).find('p');

            if(text.hasClass('white')) {
                text.animate({'color': 'white'}, 600);
            }
            else {
                text.animate({'color': '#999999'}, 600);
            }
            return;
        }
    );

    $('.project-thumb-container').on('tap',
        function () {
            var image = $(this).find('img');
            image.addClass('blur');
            return;
        }
    );

    $(window).resize(function () {
        if ($(document).width() >= '1024') {
            logo.show();
            menu.show().removeClass('menu-small', 0).removeClass('open', 0);
            $('.menu-link').css('color', 'rgb(41,41,41)');
            headerScrollControl();
        }
        else {
            menu.addClass('menu-small', 0);
        }
    });


    headerScrollControl();

});

// animation functions
function backgroundColorChange(element){
    var colors = ['#7EC300', '#CC0066', '#FF6600', '#FF9900'];
    $.each(colors, function(val){
        $(element).animate({backgroundColor: colors[val]}, 3000).delay(500);
    });
    fadeToGray(element);
}

function fadeToGray(element){
    if($(element).hasClass('menu-link')){
        $(element).animate({color: '#292929'}, 3000).delay(500);
    }
    else {
        $(element).animate({backgroundColor: '#292929'}, 3000).delay(500);
    }
}

function textColorChange(element){
    var colors = ['#7EC300', '#CC0066', '#FF6600', '#FF9900'];
    $.each(colors, function(val){
        $(element).animate({color: colors[val]}, 3000).delay(500);
    });
    fadeToGray(element);
}

function headerScrollControl() {
    $(window).scroll(function(){

        var screenWidth = $(window).width();

        if(screenWidth >= 1024) {
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

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// carousel functions
function carouselInit(data){
    $('#carousel-status').html('1<span class="slash">/</span>' + $('.ls-slide').length);
    layerSliderTransitions.t2d[0].transition.duration = 500;
    layerSliderTransitions.t2d[0].transition.easing = 'easeInOutCirc';
}

function carouselAnim(data) {
    $('#carousel-status').html(data['curLayerIndex'] + '<span class="slash">/</span>' + data['layersNum'])
}