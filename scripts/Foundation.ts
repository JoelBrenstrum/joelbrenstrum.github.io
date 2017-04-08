import { ViewEnum } from "./viewmodels/ViewEnum"
import { IJSONData, ISharedJSONData, IBodyElement, IMenuElement, ISelectableMenuElement } from "interfaces/IJSONData"



window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
    if (errorObject && /<omitted>/.test(errorMsg)) {
        console.error('Full exception message: ' + errorObject.message);
    }
}



export var $j = {
    name: "Joel Brenstrum",

    // JSONData: {
    //     title: "Failed to load",
    //     bodyElements: [{ id: "", heading: "", content: "", subfile: null }],
    // },
    // sharedJSONData: {
    //     title: "Joel Brenstrum",
    //     menuElements: [{ isLink: true, title: "Sorry", url: "index", selected: true }],
    // },

    getJsonData: <T>(viewEnum: ViewEnum) => {

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
        return <T>JSONData;
    },

}

// let newElement: IJSONData = {
//                         bodyElements: ko.observableArray<IBodyElement>(),
//                         title: ko.observable<string>(),
//                         footer: ko.observableArray<IMenuElement>(),
//                         header: ko.observable<string>(),
//                         name: ko.observable<string>()
//                     }