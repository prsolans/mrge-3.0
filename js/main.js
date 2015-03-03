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
        var setIndex = Math.ceil(index / 4) * 4;

        $("#" + thumbnaillist + " .thumbnail-container:lt(" + setIndex + ")").each(function () {
            $(this).slideUp();
        });

        if (setIndex < 4) {
            $("#" + thumbnaillist + " .thumbnail-container:lt(" + (setIndex + 1) + ")").slideIn();
        }
        else {
            $("#" + thumbnaillist + " .thumbnail-container:lt(" + (1) + ")").slideIn();
        }
    });
});