var siteSettings = {
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
var parseHTML = require("./utils/parse-html.js");

var widgetTemplates = {
  "sortTable": require("./sort-table/table.pug")
};
var ReviewCarousel = require("./page-elements/review-carousel");
var Magnifier = require("./magnifier/");
var SortTable = require("./sort-table/");
var ScrollMagic = require("scrollmagic");

window.addEventListener("load", function () {
  for (i in siteActions) {
    var thisAction = siteActions[i];
    if (document.querySelectorAll(thisAction.element).length > 0) {
      thisAction.action(document.querySelectorAll(thisAction.element), siteSettings.scrollController);
    }
  }
});

var siteActions = [{
  "element": "#product-table-sortable",
  "action": function (els) {
    console.log(productData);
    if (productData) {
      els[0].appendChild(parseHTML(widgetTemplates.sortTable(productData)));
    }
    SortTable(els);
  }
}, {
  "element": ".zoom-icon",
  "action": function (els) {
    for (i = 0; i < els.length; i++) {
      els[i].addEventListener("click", function (e) {
        e.preventDefault();
        console.log(e.target.parentNode);
        var lens = e.target.parentNode.querySelectorAll(".lens")[0];
        var slide = e.target.parentNode.querySelectorAll(".slide-image")[0];

        if (lens) {
          dropLens();
        }
        function dropLens(e) {
          if (lens.classList.contains("active")) {
            lens.classList.remove("active");
            slide.removeEventListener("mouseleave", dropLens);
          }
          else {
            lens.classList.add("active");

            slide.addEventListener("mouseleave", dropLens);
          }
        }
      });
    }
  }
}, {
  "element": ".magnify",
  "action": function (els) {
    for (i = 0; i < els.length; i++) {
      Magnifier(els[i], 2, 400, document.getElementById("review-carousel"));
    }
  }
}, {
  "element": "#review-carousel",
  "action": ReviewCarousel
}, {
  "element": "[data-bg]",
  "action": require("./utils/data-bg")
}, {
  "element": "[data-bg-array]",
  "action": require("./utils/data-bg-array")
}, {
  "element": "#more-posts",
  "action": require("./get-posts/")
}];