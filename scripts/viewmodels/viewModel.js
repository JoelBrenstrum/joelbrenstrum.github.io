/*The view model*/
$j.intialiseVM = function () {


    var vm = ({
        title: ko.observable(""),
        header: ko.observable(""),

        menuElements: ko.observableArray([]),
        bodyElements: ko.observableArray([]),
        footer: ko.observableArray([]),
        update: function () {
            $.extend(true, $j.JSONData, $j.sharedJSONData);
            vm.title(jsonTitle())
            vm.header(jsonHeader())
            vm.menuElements(jsonMenuElements())
            vm.bodyElements(jsonBodyElements())
        }
    });
    return vm;
}

$j.viewModel = $j.intialiseVM();
