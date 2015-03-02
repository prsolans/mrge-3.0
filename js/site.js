// carousel functions
function carouselInit(data){
    $('#carousel-status').html('1<span class="slash">/</span>' + $('.ls-slide').length);
    layerSliderTransitions.t2d[0].transition.duration = 500;
    layerSliderTransitions.t2d[0].transition.easing = 'easeInOutCirc';
}

function carouselAnim(data) {
    $('#carousel-status').html(data['curLayerIndex'] + '<span class="slash">/</span>' + data['layersNum'])
}
