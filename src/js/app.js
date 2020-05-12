const Flickity = require("flickity")

const siteSettings = {
  "imagePath": "",
  "videoPath": "",
  "templates": {},
  "breakpoints": {
    "xs": 0,
    "s": 641,
    "m": 1025,
    "l": 1321,
    "xl": 1921
  }
};

window.addEventListener("load", function () {
  for (i in siteActions) {
    var thisAction = siteActions[i];
    if (document.querySelectorAll(thisAction.element).length > 0) {
      thisAction.action(document.querySelectorAll(thisAction.element), siteSettings.scrollController);
    }
  }
});

var siteActions = [{
  "element": "#photo-gallery",
  "action": els => {
    let gallery = els[0];
    new Flickity(gallery)
  }
}, {
  "element": "[data-bg]",
  "action": require("./utils/data-bg")
}, {
  "element": "[data-bg-array]",
  "action": require("./utils/data-bg-array")
}];