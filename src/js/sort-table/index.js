function SortTable(tables) {
    for (i = 0; i < tables.length; i++) {
        var buttons = tables[i].querySelectorAll("[data-sort]");
        for (b = 0; b < buttons.length; b++) {
            buttons[b].addEventListener("click", function (e) {
                e.preventDefault();
                var sortField = this.getAttribute("data-sort");
                var sortDirection = this.getAttribute("data-direction") == 'true';
                var sortType = this.getAttribute("data-type");
                var headers = this.parentNode.parentNode.parentNode.children;
                for (z = 0; z < headers.length; z++) {
                    var h = headers[z];
                    if (h != this.parentNode.parentNode) {
                        h.classList.remove("active");
                    }
                    else {
                        h.classList.add("active");
                    }
                }
                doSort(sortDirection, sortField, this.parentNode.parentNode.parentNode.parentNode.parentNode, sortType);
                clearActive(buttons);
                this.classList.add("active");
            });
        }
        function clearActive(els) {
            for (b = 0; b < els.length; b++) {
                els[b].classList.remove("active");
            }
        }
    }
}
function doSort(ascending, columnClassName, el, dataType) {
    var tbody = el.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    var unsorted = true;
    while (unsorted) {
        unsorted = false;
        for (var r = 0; r < rows.length - 1; r++) {
            var row = rows[r];
            var nextRow = rows[r + 1];
            var value = row.getElementsByClassName(columnClassName)[0].innerHTML;
            var nextValue = nextRow.getElementsByClassName(columnClassName)[0].innerHTML;
            switch (dataType) {
                case "number":
                    value = cleanNumber(value);
                    nextValue = cleanNumber(nextValue);
                    if (!ascending ? value > nextValue : value < nextValue) {
                        tbody.insertBefore(nextRow, row);
                        unsorted = true;
                    }
                    break;
                case "date":
                    value = new Date(value);
                    nextValue = new Date(nextValue);  
                    if (!ascending ? value > nextValue : value < nextValue) {
                        tbody.insertBefore(nextRow, row);
                        unsorted = true;
                    }
                    break;
                default:
                    if (ascending ? value > nextValue : value < nextValue) {
                        tbody.insertBefore(nextRow, row);
                        unsorted = true;
                    }
                    break;
            }

        }
    }
}
function cleanNumber(n) {
    n = n.replace("$", "");
    n = n.replace("%", "");
    return parseFloat(n);
}

module.exports = SortTable;