import { seriesData } from './data.js';
var seriesTbody = document.getElementById('series');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var avrgTemps = document.getElementById("promedio-temporadas");
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderSeriesInTable(seriesData);
avrgTemps.innerHTML = "".concat(getAverageTemporadas(seriesData));
function renderSeriesInTable(series) {
    console.log('Desplegando series');
    series.forEach(function (serie) {
        var _a;
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(serie.id, "</td>\n                            <td class=\"show-card\">").concat(serie.nombre, "</td>\n                            <td>").concat(serie.plataforma, "</td>\n                            <td>").concat(serie.temporadas, "</td>");
        (_a = trElement.querySelector('.show-card')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            var card = document.querySelector('#detalles');
            if (card) {
                card.innerHTML = "\n        <div class=\"card\">\n        <img class=\"card-img-top\" src=\"".concat(serie.imagen, "\" alt=\"").concat(serie.nombre, " imagen\">\n        <div class=\"card-body\">\n            <h5 class=\"card-title\">").concat(serie.nombre, "</h5>\n            <p class=\"card-text\">").concat(serie.descripcion, "</p>\n            <a href=\"").concat(serie.pagina, "\" target=\"_blank\">").concat(serie.pagina, "</a>\n        </div>\n        </div>");
            }
        });
        seriesTbody.appendChild(trElement);
    });
    var average = getAverageTemporadas(series);
    var promedio = document.createElement("tr");
    promedio.innerHTML = "<td colspan=\"4\">Promedio Temporadas: ".concat(average, "</td>");
    seriesTbody.appendChild(promedio);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearSeriesInTable();
    var seriesFiltered = searchSerieByName(text, seriesData);
    renderSeriesInTable(seriesFiltered);
}
function searchSerieByName(nameKey, series) {
    return nameKey === '' ? seriesData : series.filter(function (c) {
        return c.nombre.match(nameKey);
    });
}
function getAverageTemporadas(series) {
    var totalTemps = 0;
    var numSeries = 0;
    series.forEach(function (serie) {
        totalTemps += serie.temporadas; // Fix: Use the += operator to accumulate total seasons
        numSeries++; // Fix: Increment the count of series
    });
    if (numSeries === 0) {
        return 0; // Avoid division by zero if there are no series
    }
    var avrg = totalTemps / numSeries;
    return avrg;
}
function clearSeriesInTable() {
    while (seriesTbody.hasChildNodes()) {
        if (seriesTbody.firstChild != null) {
            seriesTbody.removeChild(seriesTbody.firstChild);
        }
    }
}
