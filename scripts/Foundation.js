define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
        if (errorObject && /<omitted>/.test(errorMsg)) {
            console.error('Full exception message: ' + errorObject.message);
        }
    };
    exports.$j = {
        name: "Joel Brenstrum",
        getJsonData: function (viewEnum) {
            var url = "json/" + viewEnum + ".json";
            var JSONData;
            $.ajax({
                async: false,
                dataType: "json",
                url: url
            }).done(function (data, textStatus, jqXHR) {
                JSONData = data;
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Failed to load page: " + errorThrown);
            });
            return JSONData;
        }
    };
});
