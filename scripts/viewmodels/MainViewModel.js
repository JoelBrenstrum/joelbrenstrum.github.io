define(["require", "exports", "../Foundation"], function (require, exports, Foundation_1) {
    "use strict";
    var ApplicationViewModel = (function () {
        function ApplicationViewModel() {
            var _this = this;
            this.update = function () {
                $.extend(true, Foundation_1.$j.JSONData, Foundation_1.$j.sharedJSONData);
                _this.title(Foundation_1.$j.jsonTitle());
                _this.header(Foundation_1.$j.jsonHeader());
                _this.menuElements(Foundation_1.$j.jsonMenuElements());
                _this.bodyElements(Foundation_1.$j.jsonBodyElements());
            };
            this.applicationData = ko.observable(Foundation_1.$j.getJsonData("sharedJson"));
            this.title = ko.observable("");
            this.header = ko.observable("");
            this.menuElements = ko.observableArray([]);
            this.bodyElements = ko.observableArray([]);
            this.footer = ko.observableArray([]);
        }
        return ApplicationViewModel;
    }());
    var application = new ApplicationViewModel();
    return ApplicationViewModel;
});
