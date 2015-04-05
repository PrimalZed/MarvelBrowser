function processEvents(results) {
    for (var i = 0; i < results.length; i++) {
        var event = results[i];

        var img = '';
        if (event.thumbnail) {
            img = '<img class="seriesThumbnail" src="' + event.thumbnail.path + '/standard_amazing.' + event.thumbnail.extension + '"/>';
        }

        var href = "#";
        if (event.urls.length != 0) {
            href = event.urls[0].url;
        }

        var descDiv = eventDescDiv(event);

        var linksDiv = '<div id="links' + event.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < event.urls.length; j++) {
            //linksDiv += '<li><a href="' + event.urls[j].url + '">' + event.urls[j].type + '</a></li>';
            linksDiv += '<li>' + '<button class="btn btn-link btnLink" value="' + event.urls[j].url + '">' + event.urls[j].type + '</button></li>';
        }
        linksDiv += '</ul></div>';

        var creatorsDiv = '<div id="creators' + event.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < event.creators.returned; j++) {
            creatorsDiv += '<li>' + event.creators.items[j].name;
            if (event.creators.items[j].role)
                creatorsDiv += ': ' + event.creators.items[j].role;
            creatorsDiv += '</li>';
        }
        creatorsDiv += '</ul></div>';

        var seriesDiv = '<div id="series' + event.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < event.series.returned; j++) {
            seriesDiv += '<li>' + event.series.items[j].name + '</li>';
        }
        seriesDiv += '</ul></div>';

        var comicsDiv = '<div id="comics' + event.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < event.comics.returned; j++) {
            comicsDiv += '<li>' + event.comics.items[j].name + '</li>';
        }
        comicsDiv += '</ul></div>';

        var charactersDiv = '<div id="characters' + event.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < event.characters.returned; j++) {
            charactersDiv += '<li>' + event.characters.items[j].name;
            if (event.characters.items[j].role)
                charactersDiv += ': ' + event.characters.items[j].role;
            charactersDiv += '</li>';
        }
        charactersDiv += '</ul></div>';

        var storiesDiv = '<div id="stories' + event.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < event.stories.returned; j++) {
            storiesDiv += '<li>' + event.stories.items[j].name + '</li>';
        }
        storiesDiv += '</ul></div>';

        var storiesDiv = '<div id="stories' + event.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < event.stories.returned; j++) {
            storiesDiv += '<li>' + event.stories.items[j].name + '</li>';
        }
        storiesDiv += '</ul></div>';

        //eventsDiv += '</ul></div>';
        //$("#divResults").append(
        //    '<a href="/detail.html?entity=events&id=' + event.id + '" class="list-group-item container-fluid">' +
        //    '<div class="row">' +
        //    '<div class="col-md-2">' +
        //    img +
        //    '</div>' +
        //    '<div class="col-md-10">' +
        //        '<h2 class="list-group-item-heading">' + event.title + '</h2>' +
        //        '<div class="list-group-item-text">' +
        //        descDiv +
        //        //linksDiv +
        //        '</div>' +
        //    '</div>' +
        //    '</div>' +
        //    '<a>'
        //);
        $("#divResults").append(
            '<div class="row">' +
            '<div class="col-sm-3 col-md-2">' +
                img +
            '</div>' +
            '<div class="col-sm-9 col-md-10">' +
                '<h2><a href="/detail.html?entity=events&id=' + event.id + '">' + event.title + '</a></h2>' +
                '<ul class="nav nav-tabs" role="tablist">' +
                    '<li class="active"><a data-toggle="tab" href="#desc' + event.id + '">Description</a></li>' +
                    '<li><a data-toggle="tab" href="#links' + event.id + '">Links</a></li>' +
                    '<li><a data-toggle="tab" href="#creators' + event.id + '">Creators</a></li>' +
                    '<li><a data-toggle="tab" href="#series' + event.id + '">Series</a></li>' +
                    '<li><a data-toggle="tab" href="#comics' + event.id + '">Comics</a></li>' +
                    '<li><a data-toggle="tab" href="#characters' + event.id + '">Characters</a></li>' +
                    '<li><a data-toggle="tab" href="#stories' + event.id + '">Stories</a></li>' +
                '</ul>' +
                '<div class="tab-content">' +
                    descDiv +
                    linksDiv +
                    creatorsDiv +
                    seriesDiv +
                    comicsDiv +
                    charactersDiv +
                    storiesDiv +
                '</div>' +
            '</div>' +
            '</div>'
        );
    }
}

function processEventDetail(event) {
    var imgSm = '';
    var imgMd = '';
    var imgLg = '';
    if (event.thumbnail) {
        imgSm = '<a target="_blank" href="' + event.thumbnail.path + '.' + event.thumbnail.extension + '">' +
            '<img class="seriesThumbnail" src="' + event.thumbnail.path + '/standard_large.' + event.thumbnail.extension + '"/>' +
            '</a>';
        imgMd = '<a target="_blank" href="' + event.thumbnail.path + '.' + event.thumbnail.extension + '">' +
            '<img class="seriesThumbnail" src="' + event.thumbnail.path + '/standard_fantastic.' + event.thumbnail.extension + '"/>' +
            '</a>';
        imgLg = '<a target="_blank" href="' + event.thumbnail.path + '.' + event.thumbnail.extension + '">' +
            '<img class="seriesThumbnail" src="' + event.thumbnail.path + '/detail.' + event.thumbnail.extension + '"/>' +
            '</a>';
    }

    var descDiv = eventDescDiv(event);

    var linksDiv = '<div id="links' + event.id + '"><ul>';
    for (var j = 0; j < event.urls.length; j++) {
        linksDiv += '<li><a href="' + event.urls[j].url + '" target="_blank">' + event.urls[j].type + '</a></li>';
    }
    linksDiv += '</ul></div>';

    var creatorsDiv = '<div id="creators' + event.id + '">' +
        $.map(event.creators.items, function (creator) {
            var creatorParts = [];
            creatorParts.push('<a href="/detail.html?entity=creators&id=' + Marvel.GetResourceId(creator.resourceURI) + '">' + creator.name + '</a>');
            if (creator.role)
                creatorParts.push(creator.role);
            return creatorParts.join(', ');
        }).join('; ') +
        '</div>';

    var comicsDiv = '<div id="comics' + event.id + '" class="tab-pane"><ul>';
    for (var j = 0; j < event.comics.returned; j++) {
        comicsDiv += '<li><a href="/detail.html?entity=comics&id=' + Marvel.GetResourceId(event.comics.items[j].resourceURI) + '">' +
            event.comics.items[j].name +
            '</a></li>';
    }
    comicsDiv += '</ul></div>';

    $("#divDetail").html(
        '<div class="row">' +
        '<div class="visible-xs-block col-sm-12">' +
            imgSm +
        '</div>' +
        '<div class="visible-sm-block col-sm-3">' +
            imgSm +
        '</div>' +
        '<div class="visible-md-block col-md-4">' +
            imgMd +
        '</div>' +
        '<div class="visible-lg-block col-lg-6">' +
            imgLg +
        '</div>' +
        '<div class="col-sm-9 col-md-8 col-lg-6">' +
            '<div class="panel panel-default">' +
                '<div class="panel-heading">' +
                '<h1>' + event.title + '</h1>' +
                '</div>' +
                '<div class="panel-body">' +
                descDiv +
                linksDiv +
                creatorsDiv +
                comicsDiv +
                '</div>' +
            '</div>' +
        '</div>' +
        '</div>' + 
        '<div id="divComics" class="row">' +
        '</div>'
    );

    Marvel.ByQuery('events/' + event.id + '/comics', ["format=comic"], processComicTiles, null, null);
}

function eventDescDiv(series) {
    var descDiv = '<div id="desc' + event.id + '" class="tab-pane active">';
    var info = [];
    
    var dates = []
    if (event.start) {
        dates.push(event.start);
    }
    if (event.end) {
        dates.push(event.end);
    }
    if (dates.length != 0) {
        info.push('<span class="label label-default">' + dates.join(' - ') + '</span>');
    }

    if (info.length != 0) {
        descDiv += '<div>' + info.join(' ') + '</div>';
    }
    if (event.description != null)
        descDiv += event.description;
    if (event.previous != null) {
        descDiv += '<div>Preceded by: ' + event.previous.name + '</div>';
    }
    if (event.next != null) {
        descDiv += '<div>Followed by: ' + event.next.name + '</div>';
    }
    descDiv += '</div>';

    return descDiv
}