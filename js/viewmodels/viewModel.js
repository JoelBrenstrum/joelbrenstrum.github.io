/*The view model*/
$j.intialiseVM = function() {
    jsonBodyElements = function() {
        if ($j.JSONData){
            $j.JSONData.bodyElements.forEach(
                    function(element) {
                        element.content = ko.observable(element.content);
                        if(element.subfile){//read in html subfile
                        $.ajax({
                            dataType: "html",
                            url: element.subfile,
                        }).done(function(data, textStatus, jqXHR) {
                            element.content(data);
                        }).error(function(jqXHR, textStatus, errorThrown) {
                            element.content("Server request failed "+ errorThrown);
                        });
                        }
                    }  
                );
            return $j.JSONData.bodyElements  
    }
        else
            return [];
    };
    
    jsonMenuElements = function() {
        if ($j.JSONData) {
            $j.JSONData.menuElements.forEach(
                    function(element) {
                        element.isLink = ko.observable(element.isLink)
                        if(element.selected){
                            element.selected = ko.observable(element.selected)
                        }
                        else{
                            element.selected = ko.observable(false)
                        }
                        if (!element.isLink()) {
                            element.url = eval(element.url);
                        }
                    });
            return $j.JSONData.menuElements
        }
        else
            return [];
    }
    jsonFooterElements = function() {
        if ($j.JSONData) {
            $j.JSONData.menuElements.forEach(
                    function(element) {
                        element.isLink = ko.observable(element.isLink)
                        if (!element.isLink()) {
                            element.url = eval(element.url);
                        }
                    });
            
            return $j.JSONData.menuElements
        }
        else
            return [];
    }
    jsonTitle = function() {
        if ($j.JSONData) {
            return $j.JSONData.title
        }
        else
            return "";
    }
    jsonHeader = function() {
        if ($j.JSONData) {
            return $j.JSONData.header
        }
        else
            return "";
    }

    var vm = ({
        title: ko.observable(""),
        header: ko.observable(""),
        
        menuElements: ko.observableArray([]),
        bodyElements: ko.observableArray([]),
        footer: ko.observableArray([]),
        update: function() {
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
