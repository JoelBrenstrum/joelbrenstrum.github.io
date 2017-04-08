import { ViewEnum } from "./viewmodels/ViewEnum"
import { IJSONData, ISharedJSONData } from "interfaces/IJSONData"



window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
    if (errorObject && /<omitted>/.test(errorMsg)) {
        console.error('Full exception message: ' + errorObject.message);
    }
}



export var $j = {
    name: "Joel Brenstrum",
    currentView: ViewEnum.index,
    JSONData: <IJSONData>{
        title: "Failed to load",
        bodyElements: [{ id: "", heading: "", content: "" }],
    },
    sharedJSONData: <ISharedJSONData>{
        title: "Joel Brenstrum",
        menuElements: [{ isLink: true, title: "Sorry", url: "index", selected: ko.observable(true) }],
    },

    getJsonData: (viewEnum) => {

        var url = "json/" + viewEnum + ".json";
        var JSONData;
        $.ajax({
            async: false,
            dataType: "json",
            url: url,
        }).done(function (data, textStatus, jqXHR) {
            JSONData = data;
            //success = true;
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(`Failed to load page: ${errorThrown}`);
        });
        return JSONData;
    },
    changeSelectedPage: function (viewEnum) {
        $j.sharedJSONData.menuElements.forEach(
            function (element) {
                if (element.url === viewEnum) {
                    element.selected(true);
                }
                else {
                    element.selected(false);
                }
            });
    },
    setView: function (viewEnum) {
        //Enum check first
        $j.currentView = viewEnum;
    },
    updateView: function (viewEnum) {
        if (!ViewEnum[viewEnum]) {
            return;
        }
        $j.JSONData = $j.getJsonData(viewEnum);
        // $j.viewModel.update()
        $j.changeSelectedPage(viewEnum);
        $j.setView(viewEnum);
        //changes observable values
        //changes the page to use the new viewmodel
        //updates observables with new values (sets enum
        //and runs through all setup methods setting correct values  
    },
    jsonBodyElements: function () {
        if ($j.JSONData) {
            // $j.JSONData.bodyElements.forEach(
            //     function (element) {
            //         element.content = ko.observable(element.content);
            //         if (element.subfile) {//read in html subfile
            //             $.ajax({
            //                 dataType: "html",
            //                 url: element.subfile,
            //             }).done(function (data, textStatus, jqXHR) {
            //                 element.content(data);
            //             }).error(function (jqXHR, textStatus, errorThrown) {
            //                 element.content("Server request failed " + errorThrown);
            //             });
            //         }
            //     }
            //);
            return $j.JSONData.bodyElements
        }
        else
            return [];
    },

    jsonMenuElements: function () {
        if ($j.sharedJSONData) {
            // $j.sharedJSONData.menuElements.forEach(
            //     function (element) {
            //         element.isLink = ko.observable(element.isLink)
            //         if (element.selected) {
            //             element.selected = ko.observable(element.selected)
            //         }
            //         else {
            //             element.selected = ko.observable(false)
            //         }
            //         if (!element.isLink()) {
            //             element.url = eval(element.url);
            //         }
            //     });
            return $j.sharedJSONData.menuElements
        }
        else
            return [];
    },
    jsonFooterElements: function () {
        if ($j.sharedJSONData) {
            // $j.sharedJSONData.menuElements.forEach(
            //     function (element) {
            //         element.isLink = ko.observable(element.isLink)
            //         if (!element.isLink()) {
            //             element.url = eval(element.url);
            //         }
            //     });

            return $j.sharedJSONData.menuElements
        }
        else
            return [];
    },
    jsonTitle: function () {
        if ($j.JSONData) {
            return $j.JSONData.title
        }
        else
            return "";
    },
    jsonHeader: function () {
        if ($j.JSONData) {
            return $j.JSONData.header
        }
        else
            return "";
    }

}