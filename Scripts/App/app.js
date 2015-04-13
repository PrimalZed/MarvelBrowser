$(document).ready(function () {
    function chooseFilters() {
        var entity = $("input[name='rdEntity']:checked").val();

        var shown = $(".form-group:has(input.hdnUsedInEntity[value='" + entity + "'])").show();
        var hidden = $(".form-group:not(:has(input.hdnUsedInEntity[value='" + entity + "']))").hide();

        $("#divResults").empty();
    }
    $("input[name='rdEntity']:radio").change(chooseFilters);

    $(".pager > .previous > a").click(function () {
        var offset = parseInt($("#hdnOffset").val());
        $("#hdnOffset").val(Math.max(0, offset - 20));
        $(".btnSearch").click();
    });
    $(".pager > .next > a").click(function () {
        var offset = parseInt($("#hdnOffset").val());
        $("#hdnOffset").val(offset + 20);
        $(".btnSearch").click();
    });

    function centerModals() {
        $('.modal').each(function (i) {
            var $clone = $(this).clone().css('display', 'block').appendTo('body');
            var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
            top = top > 0 ? top : 0;
            $clone.remove();
            $(this).find('.modal-content').css("margin-top", top);
        });
    }
    $('.modal').on('show.bs.modal', centerModals);
    $(window).on('resize', centerModals);

    $('.form-group').keypress(function (e) {
        if (e.which == 13) {
            $('.btnSearch').click();
        }
    });

    $(".btnSearch").click(MarvelBrowser.Search);

    $("body").on("click", ".btnImageDetail", function () {
        var imgUrl = $(this).find("input.hdnImgUrl").val();
        var title = $(this).find("input.hdnTitle").val();
        
        var bigImg = '';
        if (imgUrl != '') {
            bigImg = '<img class="imgFull" src="' + imgUrl + '"/>';
        }

        $("#mdlImage .modal-title").text(title);
        $("#mdlImage .modal-body").html(bigImg);
        $("#mdlImage").modal("show");
    });

    MarvelBrowser.OnLoad();
});

var MarvelBrowser = {
    OnLoad: function() {
        if (location.search == '')
            return;
            
        var params = getParams();

        // Set controls with params

        var entity = params.entity;

        $('input[name="rdEntity"][value="' + entity + '"]').attr('checked', true).change();

        for (var param in params) {
            var control = $('.form-control[name="' + param + '"]');
            if ($(control).is('[multiple]')) {
                control.val(params[param].split(','));
            }
            else {
                control.val(params[param]);
            }
        }

        // Perform query

        $("#divResults").empty();

        $("#mdlProcessing").modal('show');

        var callback = function (results) { };

        switch (entity) {
            case "events":
                callback = processEvents;
                break;
            case "series":
                callback = processSeries;
                break;
            case "comics":
                callback = processComics;
                break;
            case "characters":
                callback = processCharacters
                break;
        }

        var parameters = [];
        for (var param in params)
        {
            if (param == "entity")
                continue;

            parameters.push(param + '=' + params[param]);
        }

        Marvel.ByQuery(entity, parameters, function (results) {
            callback(results);
            $("#mdlProcessing").modal('hide');
        }, MarvelBrowser.UpdateAttribution, MarvelBrowser.UpdatePaging);
    },
    Search: function () {
        // TODO: Clear paging if search button clicked instead of paging control?
        var entity = $("input[name='rdEntity']:checked").val();

        var parameters = [];

        $(".form-group:has(input.hdnUsedInEntity[value='" + entity + "'])  .form-control").each(function () {
            var value = $(this).val();

            if ($(this).is(":checkbox") == true) {
                if ($(this).is(":checked") == true) {
                    value = "true";
                }
                else {
                    return;
                }
            }

            if ($(this).is("[multiple]")) {
                var i = 0;
                //value = $(this).find("option[selected]").map(function () { return this.value; }).get().join(',');
            }

            if (value == null || value == "" || value == "0")
                return;

            var paramName = $(this).attr('name');
            parameters.push(paramName + "=" + value);
        });

        var href = window.location.href.split('?')[0] + '?entity=' + entity;

        if (parameters.length != 0)
            href += '&' + parameters.join('&');

        window.location.href = href;
    },
    GetDetail: function () {
        var params = getParams();
        var entity = params["entity"];
        var id = params["id"];

        var callback;
        switch (entity) {
            case "events":
                callback = processEventDetail;
                break;
            case "series":
                callback = processSeriesDetail;
                break;
        }

        $("#divDetail").empty();

        $("#mdlProcessing").modal('show');

        Marvel.Retrieve(entity, id, function (detail) {
            if (callback) {
                callback(detail);
            }
            $("#mdlProcessing").modal("hide");
        }, MarvelBrowser.UpdateAttribution);
    },
    UpdateAttribution: function (attributionHtml) {
        if (attributionHtml == null)
            return;

        $("footer").html(attributionHtml);
    },
    UpdatePaging: function (offset, limit, total, count) {
        if (offset <= 0) {
            $(".pager > .previous").addClass("disabled");
        }
        else {
            $(".pager > .previous").removeClass("disabled");
        }

        if (count < limit) {
            $(".pager > .next").addClass("disabled");
        }
        else {
            $(".pager > .next").removeClass("disabled");
        }
    }
};

var _parameters = null;
/// Parse url parameters into a JSON object
function getParams(urlString) {
    if (urlString == null && _parameters != null)
        return _parameters;

    var parameters = {};
    var parametersString;

    var urlParams = location.search;

    if (urlString != null)
        urlParams = urlString;

    if (!urlParams || urlParams.length == 0) { if (urlString == null) _parameters = parameters; return parameters; }
    if (urlParams.indexOf('?') > -1) {
        parametersString = urlParams.split('?')[1];
    } else {
        parametersString = urlParams;
    }
    if (parametersString.length == 0) { if (urlString == null) _parameters = parameters; return parameters; }
    var parameterPairs = parametersString.split('&');
    for (var i in parameterPairs) {
        var parameterPair = parameterPairs[i].split('=');
        parameters[parameterPair[0]] = parameterPair[1];
    }
    if (urlString == null) _parameters = parameters;
    return parameters;
}
