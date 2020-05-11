function Magnifier(el, zoom, lensSize, boundingBox) {
    const copy = el.cloneNode(true);
    const lens = document.createElement("div");

    lens.setAttribute("class", "lens")
    lens.style.width = lensSize + "px";
    lens.style.height = lensSize + "px";

    el.appendChild(lens);
    el.getBoundingClientRect();
    //copy.style.zoom = zoom;
    lens.appendChild(copy);

    copy.style.width = (el.offsetWidth * zoom) + "px";
    copy.style.height = (el.offsetHeight * zoom) + "px";
    copy.style.position = "absolute";

    el.addEventListener("mousemove", (ev) => {
        var galleryOffsetLeft = boundingBox.offsetLeft;
        var galleryOffsetTop = boundingBox.offsetTop;

        ev.preventDefault();
        ev.stopPropagation();
        const pos = getCursorPos(ev);
        var posX = (- (pos.x - el.offsetLeft) + lensSize) * (zoom);
        var posY = (- (pos.y - el.offsetTop) + lensSize) * (zoom);
        //console.log(pos.x, pos.y, posX, posY);
        var t = "translateX(" + posX + "px) translateY(" + posY + "px)";
        lens.style.left = - galleryOffsetLeft - (lensSize / 2) + pos.x + "px";
        lens.style.top = - galleryOffsetTop - (lensSize / 2) + pos.y + "px";
        copy.style.left = posX + "px";
        copy.style.top = posY + "px";

    });

}


function getCursorPos(e) {
    var x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    var y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    return { x: x, y: y };
}

module.exports = Magnifier;