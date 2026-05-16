(function ($) {
    function ensureModal() {
        if (document.getElementById('fullscreen-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'fullscreen-modal';
        modal.innerHTML = `
            <div class="fullscreen-modal__backdrop" aria-hidden="true"></div>
            <div class="fullscreen-modal__content" role="dialog" aria-modal="true" aria-label="Imagine fullscreen">
                <button class="fullscreen-modal__close" type="button" aria-label="Închide">&times;</button>
                <img class="fullscreen-modal__img" alt="Imagine" />
            </div>
        `;
        document.body.appendChild(modal);

        const close = modal.querySelector('.fullscreen-modal__close');
        const backdrop = modal.querySelector('.fullscreen-modal__backdrop');

        close.addEventListener('click', hideModal);
        backdrop.addEventListener('click', hideModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') hideModal();
        });
    }

    function showModal(src) {
        ensureModal();
        const modal = document.getElementById('fullscreen-modal');
        const img = modal.querySelector('.fullscreen-modal__img');
        img.src = src;
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        const modal = document.getElementById('fullscreen-modal');
        if (!modal) return;
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        const img = modal.querySelector('.fullscreen-modal__img');
        img.src = '';
    }

    $(document).ready(function () {
        var docStyle = document.documentElement.style;
        var transformProp = typeof docStyle.transform == 'string' ?
            'transform' : 'WebkitTransform';

        // Fullscreen click handler for all carousel images
        $(document).on('click', '.carousel .carousel-cell img', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const src = this.currentSrc || this.src;
            if (src) showModal(src);
        });

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

