jQuery(document).ready(function ($) {

    $('.thumbnails-list').each(function () {
        var thumbnailid = $(this).attr('id');
        $(this).waypoint({
            handler: function (direction) {
                var tl = new TimelineMax();
                if (direction == 'down') {
                    TweenMax.staggerTo("#" + thumbnailid + " .thumbnail-container:lt(4)", 1, { className: '+=animate', delay: 0.5, ease: Elastic.easeOut, force3D: true }, 0.2);
                }
                if (direction == 'up') {
                }
            },
            offset: '120%'
        });
    });

    $(".thumbnail-container").click(function () {
        var thumbnaillist = $(this).parent().attr('id');

        var index = $(this).index("#" + thumbnaillist + " .thumbnail-container") + 1;
        var setIndex = Math.ceil(index / 4);
        var setMax = Math.ceil(($("#" + thumbnaillist + " .thumbnail-container").length) / 4);

        var csFirst = (setIndex * 4) - 3;
        var csLast = (setIndex * 4);

        TweenMax.staggerTo("#" + thumbnaillist + " .thumbnail-container:nth-child(n+" + csFirst + "):nth-child(-n+" + csLast + ")", 1, { className: '-=animate', delay: 0.5, ease: Elastic.easeOut, force3D: true }, 0.2);
        for (var i = csFirst; i <= csLast; i++) {
            $("#" + thumbnaillist + " .thumbnail-container:nth-child(" + i + ")").hide();
        }

        var nsFirst = ((setIndex + 1) * 4) - 3;
        var nsLast = ((setIndex + 1) * 4);

        if (setIndex < setMax) {
            for (var i = nsFirst; i <= nsLast; i++) {
                $("#" + thumbnaillist + " .thumbnail-container:nth-child(" + i + ")").show();
            }
            TweenMax.staggerTo("#" + thumbnaillist + " .thumbnail-container:nth-child(n+" + nsFirst + "):nth-child(-n+" + nsLast + ")", 1, { className: '+=animate', delay: 0.5, ease: Elastic.easeOut, force3D: true }, 0.2);
        }
        else {
            $("#" + thumbnaillist + " .thumbnail-container:lt(4)").show();
            TweenMax.staggerTo("#" + thumbnaillist + " .thumbnail-container:lt(4)", 1, { className: '+=animate', delay: 0.5, ease: Elastic.easeOut, force3D: true }, 0.2);
        }
    });

    $(window).on("load resize", function (e) {
        setLeadershipHeight();
    });
});

function setLeadershipHeight() {
    var tallest = 0;

    $(".leadership-list .thumbnail-container .leader-info").each(function () {
        if ($(this).height() > tallest) {
            tallest = $(this).height();
        }
    });

    var imgHeight = $(".leadership-list .thumbnail-container img").height(); 
    var height = tallest + imgHeight + 80;

    $(".leadership-list .thumbnail-container").height(height + "px");
}