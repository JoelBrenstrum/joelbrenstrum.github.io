define("MainViewModel", ["require", "exports"], function (require, exports) {
    "use strict";
    var MainViewModel = (function () {
        function MainViewModel() {
            this.testMethod = function () {
                alert("MYVIEWMODELS");
            };
        }
        return MainViewModel;
    }());
    return MainViewModel;
});
//# sourceMappingURL=tsc.js.map