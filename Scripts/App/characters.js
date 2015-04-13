function processCharacters(results) {
    if (results == null)
        return;

    $("#divResults").append('<div class="row"></div>');

    for (var i = 0; i < results.length; i++) {
        var character = results[i];

        var img = '';
        if (character.thumbnail) {
            img = '<img class="characterThumbnail img-responsive center-block" src="' + character.thumbnail.path + '/portrait_fantastic.' + character.thumbnail.extension + '"/>';
        }

        var links = '<ul class="list-inline">';
        for (var j = 0; j < character.urls.length; j++) {
            switch (character.urls[j].type) {
                case "detail":
                    links += '<li><a href="' + character.urls[j].url + '">Marvel.com</a></li>';
                    break;
                default:
                    links += '<li><a href="' + character.urls[j].url + '">' + character.urls[j].type + '</a></li>';
                    break;
            }
        }
        links += '</ul>';

        var href = location.href.split("?")[0];
        if (href.indexOf('index.html') != -1) {
            href = href.substr(0, href.indexOf('index.html'));
        }
        $("#divResults > div.row").append(
            '<div class="col-sm-4 col-md-3 col-lg-2">' +
                '<div class="panel panel-default">' +
                    '<a href="' + href + 'detail.html?entity=character&id=' + character.id + '" class="list-group-item">' +
                    '<div class="text-center">' +
                        img +
                        '<div>' + character.name + '</div>' +
                    '</div>' +
                    '</a>' +
                    '<div class="text-center">' +
                        links +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }

    // fix all comic cells to the same height
    var cells = $('#divResults > div.row > div');

    var maxHeight = Math.max.apply(null, cells.map(function () { return $(this).height(); }).get());

    cells.height(maxHeight);
}