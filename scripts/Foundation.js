define(["require", "exports", "./viewmodels/ViewEnum"], function (require, exports, ViewEnum_1) {
    "use strict";
    exports.__esModule = true;
    window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
        if (errorObject && /<omitted>/.test(errorMsg)) {
            console.error('Full exception message: ' + errorObject.message);
        }
    };
    exports.$j = {
        name: "Joel Brenstrum",
        currentView: ViewEnum_1.ViewEnum.index,
        JSONData: {
            title: "Failed to load",
            bodyElements: [{ id: "", heading: "", content: "" }]
        },
        sharedJSONData: {
            title: "Joel Brenstrum",
            menuElements: [{ isLink: true, title: "Sorry", url: "index", selected: ko.observable(true) }]
        },
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
        },
        changeSelectedPage: function (viewEnum) {
            exports.$j.sharedJSONData.menuElements.forEach(function (element) {
                if (element.url === viewEnum) {
                    element.selected(true);
                }
                else {
                    element.selected(false);
                }
            });
        },
        setView: function (viewEnum) {
            exports.$j.currentView = viewEnum;
        },
        updateView: function (viewEnum) {
            if (!ViewEnum_1.ViewEnum[viewEnum]) {
                return;
            }
            exports.$j.JSONData = exports.$j.getJsonData(viewEnum);
            exports.$j.changeSelectedPage(viewEnum);
            exports.$j.setView(viewEnum);
        },
        jsonBodyElements: function () {
            if (exports.$j.JSONData) {
                return exports.$j.JSONData.bodyElements;
            }
            else
                return [];
        },
        jsonMenuElements: function () {
            if (exports.$j.sharedJSONData) {
                return exports.$j.sharedJSONData.menuElements;
            }
            else
                return [];
        },
        jsonFooterElements: function () {
            if (exports.$j.sharedJSONData) {
                return exports.$j.sharedJSONData.menuElements;
            }
            else
                return [];
        },
        jsonTitle: function () {
            if (exports.$j.JSONData) {
                return exports.$j.JSONData.title;
            }
            else
                return "";
        },
        jsonHeader: function () {
            if (exports.$j.JSONData) {
                return exports.$j.JSONData.header;
            }
            else
                return "";
        }
    };
});
