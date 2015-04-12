function processComics(results) {
    for (var i = 0; i < results.length; i++) {
        var comic = results[i];

        var img = '';
        if (comic.thumbnail) {
            img = '<img class="comicThumbnail" src="' + comic.thumbnail.path + '/portrait_fantastic.' + comic.thumbnail.extension + '"/>';
        }

        var href = "#";
        if (comic.urls.length != 0) {
            href = comic.urls[0].url;
        }

        var linksDiv = '<div id="links' + comic.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < comic.urls.length; j++) {
            var url = ''
            if (comic.urls[j].type == 'reader') {
                url = Marvel.ReplaceReaderUrl(comic.urls[j].url);
            }
            else {
                url = comic.urls[j].url;
            }
            linksDiv += '<li><a href="' + url + '" target="_blank">' + comic.urls[j].type + '</a></li>';
        }
        linksDiv += '</div>';

        var creatorsDiv = '<div id="creators' + comic.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < comic.creators.returned; j++) {
            creatorsDiv += '<li>' + comic.creators.items[j].name + '</li>';
        }
        creatorsDiv += '</div>';

        var charactersDiv = '<div id="characters' + comic.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < comic.characters.returned; j++) {
            charactersDiv += '<li>' + comic.characters.items[j].name + '</li>';
        }
        charactersDiv += '</div>';

        var storiesDiv = '<div id="stories' + comic.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < comic.stories.returned; j++) {
            storiesDiv += '<li>' + comic.stories.items[j].name + '</li>';
        }
        storiesDiv += '</div>';

        var storiesDiv = '<div id="stories' + comic.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < comic.stories.returned; j++) {
            storiesDiv += '<li>' + comic.stories.items[j].name + '</li>';
        }
        storiesDiv += '</div>';

        var eventsDiv = '<div id="events' + comic.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < comic.events.returned; j++) {
            eventsDiv += '<li>' + comic.events.items[j].name + '</li>';
        }
        eventsDiv += '</div>';

        $("#divResults").append(
            '<div class="row">' +
            '<div class="col-md-2">' +
                img +
            '</div>' +
            '<div class="col-md-10">' +
                '<h2>' + comic.title + '</h2>' +
                '<ul class="nav nav-tabs" role="tablist">' +
                    '<li class="active"><a data-toggle="tab" href="#desc' + comic.id + '">Description</a></li>' +
                    '<li><a data-toggle="tab" href="#links' + comic.id + '">Links</a></li>' +
                    '<li><a data-toggle="tab" href="#creators' + comic.id + '">Creators</a></li>' +
                    '<li><a data-toggle="tab" href="#characters' + comic.id + '">Characters</a></li>' +
                    '<li><a data-toggle="tab" href="#stories' + comic.id + '">Stories</a></li>' +
                    '<li><a data-toggle="tab" href="#events' + comic.id + '">Events</a></li>' +
                '</ul>' +
                '<div class="tab-content">' +
                    '<div id="desc' + comic.id + '" class="tab-pane active">' + comic.description + '</div>' +
                    linksDiv +
                    creatorsDiv +
                    charactersDiv +
                    storiesDiv +
                    eventsDiv +
                '</div>' +
            '</div>' +
            '</div>'
        );
    }
}

function processComicTiles(results) {
    $("#divComicProgress").remove();

    if (results == null)
        return;

    for (var i = 0; i < results.length; i++) {
        var comic = results[i];

        // Don't include variants
        if (comic.variantDescription != '')
            continue;

        var img = '';
        if (comic.thumbnail) {
            img = '<img src="' + comic.thumbnail.path + '/portrait_incredible.' + comic.thumbnail.extension + '"/>';
        }

        var readerLink = '';
        for (var j = 0; j < comic.urls.length; j++) {
            if (comic.urls[j].type == 'reader')
                readerLink = '<div><a href="' + Marvel.ReplaceReaderUrl(comic.urls[j].url) + '" target="_blank">Reader</a></div>';
        }

        $('#divDetail > div.row').append(
            '<div class="col-sm-6 col-md-3 col-lg-2">' +
                '<div class="panel panel-default">' +
                    '<div class="text-center">' +
                        img +
                        '<div>' + comic.title + '</div>' +
                        readerLink +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }
    
}
