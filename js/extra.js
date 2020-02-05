const myApiKey = "206d41bfd8394758727be2110432ff6b";
const banner = $("#banner-message");
const button = $("button");
const eventos = $("#eventos");
var miSpinner = $("<img id='spinner'>");
miSpinner.attr("src", "img/spinner.gif");
miSpinner.appendTo(eventos);
miSpinner.hide();

button.on("click", function() {
  banner.addClass("alt");
  let output = "";

  $.ajax({
    url: "https://gateway.marvel.com:443/v1/public/events?apikey=" + myApiKey,
    type: "GET",
    beforeStart: () => {
      miSpinner.show();
    },
    complete: () => {
      miSpinner.hide();
    },
    success: response => {
      $.each(response.data.results, (key, value) => {
        output += "<h2>" + value.title + "</h2>";
        output += "<div>" + value.description + "</div>";
        output += "<img src=" + value.thumbnail.path + "." + value.thumbnail.extension + " />";
      });
      output ? eventos.html(output) : eventos.html("No se han encontrado resultados");
    }
  });
})

/** PAGINACION */
/*$(function() {
  (function() {
    var container = $('#eventos');
    container.pagination({
      dataSource: "https://gateway.marvel.com:443/v1/public/events?apikey=" + myApiKey,
      locator: 'data',
      totalNumber: 120,
      pageSize: 20,
      ajax: {
        beforeSend: function() {
          miSpinner.show();
        }
      },
      callback: function(response, pagination) {
        $.each(response.data.results, (key, value) => {
          output += "<h2>" + value.title + "</h2>";
          output += "<div>" + value.description + "</div>";
          output += "<img src=" + value.thumbnail.path + "." + value.thumbnail.extension + " />";
        });
        output ? eventos.html(output) : eventos.html("No se han encontrado resultados");
      }
    })
  })('eventos');
})*/