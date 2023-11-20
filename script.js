(function ($) {
    $(document).ready(function () {

        var docStyle = document.documentElement.style;
        var transformProp = typeof docStyle.transform == 'string' ?
            'transform' : 'WebkitTransform';

        $('.carousel').each(function (i, carousel) {
            var $carousel = $(carousel);
            $carousel.flickity({
                imagesLoaded: true,
                percentPosition: false,
            });

            var $imgs = $carousel.find('.carousel-cell img');
            // get Flickity instance
            var flkty = $carousel.data('flickity');

            $carousel.on('scroll.flickity', function () {
                flkty.slides.forEach(function (slide, i) {
                    var img = $imgs[i];
                    var x = (slide.target + flkty.x) * -1 / 3;
                    img.style[transformProp] = 'translateX(' + x + 'px)';
                });
            });

        });
    });
})(jQuery)