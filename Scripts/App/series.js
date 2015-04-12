function processSeries(results) {
    if (results == null)
        return;

    for (var i = 0; i < results.length; i++) {
        var series = results[i];

        var img = '';
        if (series.thumbnail) {
            img = '<img class="seriesThumbnail img-responsive" src="' + series.thumbnail.path + '/standard_fantastic.' + series.thumbnail.extension + '"/>';
        }

        var href = "#";
        if (series.urls.length != 0) {
            href = series.urls[0].url;
        }

        var descDiv = seriesDescDiv(series);

        var linksDiv = '<div id="links' + series.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < series.urls.length; j++) {
            //linksDiv += '<li><a href="' + series.urls[j].url + '">' + series.urls[j].type + '</a></li>';
            linksDiv += '<li>' + '<button class="btn btn-link btnLink" value="' +series.urls[j].url + '">' + series.urls[j].type + '</button></li>';
        }
        linksDiv += '</ul></div>';

        var creatorsDiv = '<div id="creators' + series.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < series.creators.returned; j++) {
            creatorsDiv += '<li>' + series.creators.items[j].name + '</li>';
        }
        creatorsDiv += '</ul></div>';

        var comicsDiv = '<div id="comics' + series.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < series.comics.returned; j++) {
            comicsDiv += '<li>' + series.comics.items[j].name + '</li>';
        }
        comicsDiv += '</ul></div>';

        var charactersDiv = '<div id="characters' + series.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < series.characters.returned; j++) {
            charactersDiv += '<li>' + series.characters.items[j].name + '</li>';
        }
        charactersDiv += '</ul></div>';

        var storiesDiv = '<div id="stories' + series.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < series.stories.returned; j++) {
            storiesDiv += '<li>' + series.stories.items[j].name + '</li>';
        }
        storiesDiv += '</ul></div>';

        var storiesDiv = '<div id="stories' + series.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < series.stories.returned; j++) {
            storiesDiv += '<li>' + series.stories.items[j].name + '</li>';
        }
        storiesDiv += '</ul></div>';

        var eventsDiv = '<div id="events' + series.id + '" class="tab-pane"><ul>';
        for (var j = 0; j < series.events.returned; j++) {
            eventsDiv += '<li>' + series.events.items[j].name + '</li>';
        }
        eventsDiv += '</ul></div>';
        var href = location.href.split("?")[0];
        if (href.indexOf('index.html') != -1) {
            href = href.substr(0, href.indexOf('index.html'));
        }
        $("#divResults").append(
            '<a href="' + href + 'detail.html?entity=series&id=' + series.id + '" class="list-group-item container-fluid">' +
            '<div class="row">' +
            '<div class="col-md-2">' +
            img +
            '</div>' +
            '<div class="col-md-10">' +
                '<h2 class="list-group-item-heading">' + series.title + '</h2>' +
                '<div class="list-group-item-text">' +
                descDiv +
                //linksDiv +
                '</div>' +
            '</div>' +
            '</div>' +
            '<a>'
        );
        //$("#divResults").append(
        //    '<div class="row">' +
        //    '<div class="col-sm-3 col-md-2">' +
        //        img +
        //    '</div>' +
        //    '<div class="col-sm-9 col-md-10">' +
        //        '<h2><a href="/detail.html?entity=series&id=' + series.id + '">' + series.title + '</a></h2>' +
        //        '<ul class="nav nav-tabs" role="tablist">' +
        //            '<li class="active"><a data-toggle="tab" href="#desc' + series.id + '">Description</a></li>' +
        //            '<li><a data-toggle="tab" href="#links' + series.id + '">Links</a></li>' +
        //            '<li><a data-toggle="tab" href="#creators' + series.id + '">Creators</a></li>' +
        //            '<li><a data-toggle="tab" href="#comics' + series.id + '">Comics</a></li>' +
        //            '<li><a data-toggle="tab" href="#characters' + series.id + '">Characters</a></li>' +
        //            '<li><a data-toggle="tab" href="#stories' + series.id + '">Stories</a></li>' +
        //            '<li><a data-toggle="tab" href="#events' + series.id + '">Events</a></li>' +
        //        '</ul>' +
        //        '<div class="tab-content">' +
        //            descDiv +
        //            linksDiv +
        //            creatorsDiv +
        //            comicsDiv +
        //            charactersDiv +
        //            storiesDiv +
        //            eventsDiv +
        //        '</div>' +
        //    '</div>' +
        //    '</div>'
        //);
    }
}

function processSeriesDetail(series) {
    var imgSm = '';
    var imgMd = '';
    var imgLg = '';
    if (series.thumbnail) {
        imgSm = '<a target="_blank" href="' + series.thumbnail.path + '.' + series.thumbnail.extension + '">' +
            '<img class="seriesThumbnail img-responsive center-block" src="' + series.thumbnail.path + '/standard_large.' + series.thumbnail.extension + '"/>' +
            '</a>';
        imgMd = '<a target="_blank" href="' + series.thumbnail.path + '.' + series.thumbnail.extension + '">' +
            '<img class="seriesThumbnail img-responsive center-block" src="' + series.thumbnail.path + '/standard_fantastic.' + series.thumbnail.extension + '"/>' +
            '</a>';
        imgLg = '<a target="_blank" href="' + series.thumbnail.path + '.' + series.thumbnail.extension + '">' +
            '<img class="seriesThumbnail img-responsive center-block" src="' + series.thumbnail.path + '/detail.' + series.thumbnail.extension + '"/>' +
            '</a>';
    }

    var descDiv = seriesDescDiv(series);

    var linksDiv = '<div id="links' + series.id + '"><ul>';
    for (var j = 0; j < series.urls.length; j++) {
        //linksDiv += '<li><a href="' + series.urls[j].url + '">' + series.urls[j].type + '</a></li>';
        linksDiv += '<li>' + '<button class="btn btn-link btnLink" value="' + series.urls[j].url + '">' + series.urls[j].type + '</button></li>';
    }
    linksDiv += '</ul></div>';

    var creatorsDiv = '<div id="creators' + series.id + '">' +
        $.map(series.creators.items, function (creator)
        {
            var creatorParts = [];
            creatorParts.push('<a href="/detail.html?entity=creators&id=' + Marvel.GetResourceId(creator.resourceURI) + '">' + creator.name + '</a>');
            if (creator.role)
                creatorParts.push(creator.role);
            return creatorParts.join(', ');
        }).join('; ') +
        '</div>';

    var comicsDiv = '<div id="comics' + series.id + '" class="tab-pane"><ul>';
    for (var j = 0; j < series.comics.returned; j++) {
        comicsDiv += '<li><a href="/detail.html?entity=comics&id=' + Marvel.GetResourceId(series.comics.items[j].resourceURI) + '">' +
            series.comics.items[j].name +
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
                '<h1>' + series.title + '</h1>' +
                '</div>' +
                '<div class="panel-body">' + 
                descDiv +
                linksDiv +
                creatorsDiv +
                //comicsDiv +
                '</div>' +
            '</div>' +
        '</div>' +
        //'</div>' +
        //'<div id="divComics">' +
            '<div id="divComicProgress" class="col-sm-8 col-md-7 col-lg-5" style="margin: 20px;">' +
            '<div class="progress">' +
                '<div class="progress-bar progress-bar-striped active" style="width: 100%;"></div>' +
            '</div>' +
            '</div>' +
        //'</div>' +
        '</div>'
    );
    Marvel.ByQuery('series/' + series.id + '/comics', ["format=comic"], processComicTiles, null, null);
}

function seriesDescDiv(series) {
    var descDiv = '<div id="desc' + series.id + '" class="tab-pane active">';
    var info = [];
    if (series.type != null)
        info.push('<span class="label label-info">' + series.type + '</span>');
    var years = series.startYear + ' - ';
    if (series.endYear == '2099')
        years += 'Present';
    else
        years += series.endYear;
    info.push('<span class="label label-default">' + years + '</span>');
    if (series.rating != null) {
        info.push('<span class="label label-danger">' + series.rating + '</span>');
    }
    if (info.length != 0) {
        descDiv += '<div>' + info.join(' ') + '</div>';
    }
    if (series.description != null)
        descDiv += series.description;
    if (series.previous != null) {
        descDiv += '<div>Preceded by: ' + series.previous.name + '</div>';
    }
    if (series.next != null) {
        descDiv += '<div>Followed by: ' + series.next.name + '</div>';
    }
    descDiv += '</div>';

    return descDiv
}