function processCharacters (results) {
    for (var i = 0; i < results.length; i++) {
        var character = results[i];

        var img = '';
        if (character.thumbnail) {
            img = '<img class="characterThumbnail" src="' + character.thumbnail.path + '/portrait_fantastic.' + character.thumbnail.extension + '"/>';
        }

        var href = "#";
        if (character.urls.length != 0) {
            href = character.urls[0].url;
        }

        var linksDiv = '<div id="links' + character.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < character.urls.length; j++) {
            linksDiv += '<li><a href="' + character.urls[j].url + '">' + character.urls[j].type + '</a></li>';
        }
        linksDiv += '</div>';

        var comicsDiv = '<div id="comics' + character.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < character.comics.returned; j++) {
            comicsDiv += '<li>' + character.comics.items[j].name + '</li>';
        }
        comicsDiv += '</div>';

        var storiesDiv = '<div id="stories' + character.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < character.stories.returned; j++) {
            storiesDiv += '<li>' + character.stories.items[j].name + '</li>';
        }
        storiesDiv += '</div>';

        var eventsDiv = '<div id="events' + character.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < character.events.returned; j++) {
            eventsDiv += '<li>' + character.events.items[j].name + '</li>';
        }
        eventsDiv += '</div>';

        var seriesDiv = '<div id="series' + character.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < character.series.returned; j++) {
            seriesDiv += '<li>' + character.series.items[j].name + '</li>';
        }
        seriesDiv += '</div>';

        $("#divResults").append(
            '<div class="row">' +
            '<div class="col-md-2">' +
                img +
            '</div>' +
            '<div class="col-md-10">' +
                '<h2>' + character.name + '</h2>' +
                '<ul class="nav nav-tabs" role="tablist">' +
                    '<li class="active"><a data-toggle="tab" href="#desc' + character.id + '">Description</a></li>' +
                    '<li><a data-toggle="tab" href="#links' + character.id + '">Links</a></li>' +
                    '<li><a data-toggle="tab" href="#comics' + character.id + '">Comics</a></li>' +
                    '<li><a data-toggle="tab" href="#stories' + character.id + '">Stories</a></li>' +
                    '<li><a data-toggle="tab" href="#events' + character.id + '">Events</a></li>' +
                    '<li><a data-toggle="tab" href="#series' + character.id + '">Series</a></li>' +
                '</ul>' +
                '<div class="tab-content">' +
                    '<div id="desc' + character.id + '" class="tab-pane active">' + character.description + '</div>' +
                    linksDiv +
                    comicsDiv +
                    storiesDiv +
                    eventsDiv +
                    seriesDiv +
                '</div>' +
            '</div>' +
            '</div>'
        );
    }
}