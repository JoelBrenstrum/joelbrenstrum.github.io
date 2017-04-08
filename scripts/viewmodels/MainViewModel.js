define(["require", "exports", "../Foundation", "../viewmodels/ViewEnum"], function (require, exports, Foundation_1, ViewEnum_1) {
    "use strict";
    var ApplicationViewModel = (function () {
        function ApplicationViewModel() {
            var _this = this;
            this.handleUrl = function (a) {
                alert(a);
            };
            this.processJSON = function () {
                _this.title(_this.jsonTitle());
                _this.header(_this.jsonHeader());
                _this.menuElements(_this.jsonMenuElements());
                _this.bodyElements(_this.jsonBodyElements());
            };
            this.update = function () {
                _this.title(_this.jsonTitle());
                _this.header(_this.jsonHeader());
                _this.bodyElements(_this.jsonBodyElements());
            };
            this.updateView = function (viewEnum) {
                if (!ViewEnum_1.ViewEnum[viewEnum]) {
                    console.log("Page not found");
                    return;
                }
                _this.JSONData = Foundation_1.$j.getJsonData(ViewEnum_1.ViewEnum[viewEnum]);
                _this.changeSelectedPage(ViewEnum_1.ViewEnum[viewEnum]);
                _this.setView(ViewEnum_1.ViewEnum[viewEnum]);
            };
            this.changeSelectedPage = function (viewEnum) {
                _this.update();
                _this.menuElements().forEach(function (element) {
                    if (element.url === viewEnum) {
                        element.selected(true);
                    }
                    else {
                        element.selected(false);
                    }
                });
            };
            this.setView = function (viewEnum) {
                this.currentView = viewEnum;
            };
            this.jsonBodyElements = function () {
                if (_this.JSONData) {
                    var newElements = [];
                    _this.JSONData.bodyElements.forEach(function (element) {
                        var newElement = {
                            id: element.id,
                            content: ko.observable(element.content),
                            heading: element.heading
                        };
                        if (element.subfile) {
                            $.ajax({
                                dataType: "html",
                                url: element.subfile
                            }).done(function (data, textStatus, jqXHR) {
                                newElement.content(data);
                            }).fail(function (jqXHR, textStatus, errorThrown) {
                                newElement.content("Server request failed " + errorThrown);
                            });
                        }
                        newElements.push(newElement);
                    });
                    return newElements;
                }
                else {
                    return [];
                }
            };
            this.jsonMenuElements = function () {
                if (_this.sharedJSONData) {
                    var newElements = [];
                    _this.sharedJSONData.menuElements.forEach(function (element) {
                        var newElement = {
                            isLink: ko.observable(element.isLink),
                            title: element.title,
                            url: element.url,
                            selected: ko.observable(element.selected != null ? element.selected : false)
                        };
                        if (!newElement.isLink()) {
                            newElement.url = ViewEnum_1.ViewEnum[element.url];
                        }
                        newElements.push(newElement);
                    });
                    return newElements;
                }
                else
                    return [];
            };
            this.jsonFooterElements = function () {
                if (_this.sharedJSONData) {
                    var newElements = [];
                    _this.sharedJSONData.menuElements.forEach(function (element) {
                        var newElement = {
                            isLink: ko.observable(element.isLink),
                            title: element.title,
                            url: element.url
                        };
                        if (!newElement.isLink()) {
                            newElement.url = element.url;
                        }
                        newElements.push(newElement);
                    });
                    return newElements;
                }
                else
                    return [];
            };
            this.jsonTitle = function () {
                if (_this.JSONData) {
                    return _this.JSONData.title;
                }
                else
                    return "";
            };
            this.jsonHeader = function () {
                if (_this.JSONData) {
                    return _this.JSONData.header;
                }
                else
                    return "";
            };
            this.sharedJSONData = Foundation_1.$j.getJsonData("sharedJson");
            this.title = ko.observable("");
            this.header = ko.observable("");
            this.menuElements = ko.observableArray([]);
            this.bodyElements = ko.observableArray([]);
            this.footer = ko.observableArray([]);
            this.updateView(ViewEnum_1.ViewEnum.index);
            this.processJSON();
            ko.applyBindings(this);
        }
        return ApplicationViewModel;
    }());
    var application = new ApplicationViewModel();
    return ApplicationViewModel;
});
