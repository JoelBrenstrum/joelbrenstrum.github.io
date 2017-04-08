import { $j } from "../Foundation"
import { ViewEnum } from "../viewmodels/ViewEnum"
import * as Interfaces from "./../interfaces/IJSONData"

export = ApplicationViewModel

class ApplicationViewModel {
    public applicationData: KnockoutObservable<any>;
    public sharedJSONData: Interfaces.ISharedJSONData;
    public JSONData: Interfaces.IJSONData;
    public currentView: ViewEnum;

    public title: KnockoutObservable<string>;
    public header: KnockoutObservable<string>;
    public bodyElements: KnockoutObservableArray<Interfaces.IBodyElementProcessed>;

    public menuElements: KnockoutObservableArray<Interfaces.ISelectableMenuElementProcessed>;
    public footer: KnockoutObservableArray<Interfaces.IMenuElementProcessed>;


    constructor() {

        this.sharedJSONData = $j.getJsonData<Interfaces.ISharedJSONData>("sharedJson");
        //this.sharedJSONData = $j.getJsonData<ISharedJSONData>("sharedJson");


        this.title = ko.observable("");
        this.header = ko.observable("");

        this.menuElements = ko.observableArray([])
        this.bodyElements = ko.observableArray([])
        this.footer = ko.observableArray([]);
        this.updateView(ViewEnum.index)
        this.processJSON();
        ko.applyBindings(this);
    }

    public handleUrl = (a) => {
        alert(a);
    }

    private processJSON = () => {
        this.title(this.jsonTitle())
        this.header(this.jsonHeader())
        this.menuElements(this.jsonMenuElements())
        this.bodyElements(this.jsonBodyElements())
    }
    public update = () => {
        //$.extend(true, $j.JSONData, $j.sharedJSONData);
        this.title(this.jsonTitle())
        this.header(this.jsonHeader())
        // this.menuElements(this..jsonMenuElements())
        this.bodyElements(this.jsonBodyElements())
    }

    public updateView = (viewEnum: ViewEnum) => {
        if (!ViewEnum[viewEnum]) {
            console.log("Page not found")
            return;
        }
        this.JSONData = $j.getJsonData<Interfaces.IJSONData>(ViewEnum[viewEnum]);
        // $j.viewModel.update()
        this.changeSelectedPage(ViewEnum[viewEnum]);
        this.setView(ViewEnum[viewEnum]);
        //changes observable values
        //changes the page to use the new viewmodel
        //updates observables with new values (sets enum
        //and runs through all setup methods setting correct values  
    }
    changeSelectedPage = (viewEnum: ViewEnum) => {
        this.update();
        this.menuElements().forEach(
            function (element) {
                if (element.url === viewEnum) {
                    element.selected(true);
                }
                else {
                    element.selected(false);
                }
            });
    }
    setView = function (viewEnum) {
        //Enum check first
        this.currentView = viewEnum;
    }


    jsonBodyElements = () => {
        if (this.JSONData) {
            var newElements = [];
            this.JSONData.bodyElements.forEach(
                function (element) {
                    let newElement: Interfaces.IBodyElementProcessed = {
                        id: element.id,
                        content: ko.observable<string>(element.content),
                        heading: element.heading,
                    }
                    if (element.subfile) {//read in html subfile
                        $.ajax({
                            dataType: "html",
                            url: element.subfile,
                        }).done(function (data, textStatus, jqXHR) {
                            newElement.content(data);
                        }).fail(function (jqXHR, textStatus, errorThrown) {
                            newElement.content("Server request failed " + errorThrown);
                        });
                    }
                    newElements.push(newElement)
                });
            return newElements;
        } else {
            return [];
        }
    }

    jsonMenuElements = () => {
        if (this.sharedJSONData) {
            var newElements = [];
            this.sharedJSONData.menuElements.forEach(
                function (element) {
                    var newElement: Interfaces.ISelectableMenuElementProcessed = {
                        isLink: ko.observable<boolean>(element.isLink),
                        title: element.title,
                        url: element.url,
                        selected: ko.observable(element.selected != null ? element.selected : false)
                    }
                    if (!newElement.isLink()) {
                        newElement.url = ViewEnum[element.url];
                    }
                    newElements.push(newElement);
                });
            return newElements;
        }
        else
            return [];
    }
    jsonFooterElements = () => {
        if (this.sharedJSONData) {
            var newElements = [];
            this.sharedJSONData.menuElements.forEach(
                function (element) {
                    var newElement: Interfaces.IMenuElementProcessed = {
                        isLink: ko.observable<boolean>(element.isLink),
                        title: element.title,
                        url: element.url,
                    }
                    if (!newElement.isLink()) {
                        newElement.url = element.url;
                    }
                    newElements.push(newElement);
                });
            return newElements
        }
        else
            return [];
    }
    jsonTitle = () => {
        if (this.JSONData) {
            return this.JSONData.title
        }
        else
            return "";
    }
    jsonHeader = () => {
        if (this.JSONData) {
            return this.JSONData.header
        }
        else
            return "";
    }
}

var application = new ApplicationViewModel();