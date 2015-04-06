var Marvel = function () {
    var baseUrl = "http://gateway.marvel.com/v1/public";
    var publicKey = "0e1892553af4184949ca792ff9a8580f";

    var serverAuth = function () {
        if (this.marvelPrivateKey) {
            var d = new Date();
            var ts = d.getTime();
            var privateKey = marvelPrivateKey;
            var hash = hex_md5(ts + privateKey + publicKey);
            return "&ts=" + ts + "&hash=" + hash;
        }
        return "";
    };

    var buildUrl = function (path, parameters) {
        var url = baseUrl + "/" + path;
        url += "?apikey=" + publicKey + serverAuth();

        if (parameters) {
            url += "&" + parameters.join("&");
        }
        return url;
    };

    var getCharacters = function (parameters, callback) {
        var url = buildUrl("characters", parameters);
        
        $.ajax({
            url: url
        })
        .done(function (d, status, xhr) {
            callback(d.data.results);
        })
        .fail(function (xhr, status, error) {

        });
    };
    var getSeries = function (parameters, callback) {
        var url = buildUrl("series", parameters);

        $.ajax({
            url: url
        })
        .done(function (d, status, xhr) {
            callback(d.data.results);
        })
        .fail(function (xhr, status, error) {

        });
    };
    var getComics = function (parameters, callback) {
        var url = buildUrl("comics", parameters);

        $.ajax({
            url: url
        })
        .done(function (d, status, xhr) {
            callback(d.data.results);
        })
        .fail(function (xhr, status, error) {

        });
    };
    var byQuery = function (entity, parameters, callback, attributionCallback, pagingCallback) {
        var url = buildUrl(entity, parameters);

        $.ajax({
            url: url
        })
        .done(function (d, status, xhr) {
            if (attributionCallback)
                attributionCallback(d.attributionHTML);

            if (pagingCallback)
                pagingCallback(d.data.offset, d.data.limit, d.data.total, d.data.count);

            callback(d.data.results);
        })
        .fail(function (xhr, status, error) {
            alert("Call failed");
            callback(null);
        });
    };
    var retrieve = function (entity, id, callback, attributionCallback) {
        var url = buildUrl(entity + '/' + id);

        $.ajax({
            url: url
        })
        .done(function (d, status, xhr) {
            if (attributionCallback)
                attributionCallback(d.attributionHTML);

            if (d.data.results.length != 0)
            {
                callback(d.data.results[0]);
            }
        })
        .fail(function (xhr, status, error) {
            alert("Call failed");
            callback(null);
        });
    };
    var getResourceId = function (resourceUri) {
        return resourceUri.substring(resourceUri.lastIndexOf('/') + 1);
    };
    var replaceReaderUrl = function (readerUrl) {
        var params = getParams(readerUrl);
        var id = params["iid"];
        return 'http://read.marvel.com/#/book/' + id;
    };
    return {
        GetCharacters: getCharacters,
        GetSeries: getSeries,
        GetComics: getComics,
        ByQuery: byQuery,
        Retrieve: retrieve,
        GetResourceId: getResourceId,
        ReplaceReaderUrl: replaceReaderUrl
    };
}();