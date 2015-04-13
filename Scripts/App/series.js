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
        switch (series.urls[j].type) {
            case 'detail':
                linksDiv += '<li><a href="' + series.urls[j].url + '">Marvel.com</a></li>';
                break;
            default:
                linksDiv += '<li><a href="' + series.urls[j].url + '">' + series.urls[j].type + '</a></li>';
                break;
        }
    }
    linksDiv += '</ul></div>';

    var href = location.href.split("?")[0];
    if (href.indexOf('detail.html') != -1) {
        href = href.substr(0, href.indexOf('detail.html'));
    }

    var creatorsDiv = '<div id="creators' + series.id + '">' +
        $.map(series.creators.items, function (creator) {
            var creatorParts = [];
            creatorParts.push('<a href="' + href + 'detail.html?entity=creators&id=' + Marvel.GetResourceId(creator.resourceURI) + '">' + creator.name + '</a>');
            if (creator.role)
                creatorParts.push(creator.role);
            return creatorParts.join(', ');
        }).join('; ') +
        '</div>';

    var charactersDiv = '<div id="characters' + series.id + '">' +
        $.map(series.characters.items, function (character) {
            return '<a href="' + href + 'detail.html?entity=creators&id=' + Marvel.GetResourceId(character.resourceURI) + '">' + character.name + '</a>';
        }).join('; ') +
        '</div>';

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
                charactersDiv +
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