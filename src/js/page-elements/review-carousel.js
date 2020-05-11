var Flickity = require("flickity");

function ReviewCarousel(els) {
    if (els[0].querySelectorAll(".slide").length>1) {
        var rc = new Flickity(els[0], {
            "wrapAround": true,
            "pageDots": true,
            "lazyLoad": 6,
            "autoPlay": false,
            "adaptiveHeight": false
        });
        rc.resize();
        rc.on("change", function(e) {
            var zooms = document.querySelectorAll(".lens");
            for (i=0;i<zooms.length;i++) {
                zooms[i].classList.remove("active");
            }
        });
    }

}
module.exports = ReviewCarousel;