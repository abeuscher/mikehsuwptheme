var isElement = require("./is-element.js");

function DataBg(backgroundImages) {
    for (i in backgroundImages) {
        if (isElement(backgroundImages[i])) {
            thisElement = backgroundImages[i];
            if (thisElement.getAttribute("data-bg")!="") {
                thisElement.style.backgroundImage = "url('" + thisElement.getAttribute("data-bg") + "')";
            }
        }
    }
}
module.exports = DataBg;