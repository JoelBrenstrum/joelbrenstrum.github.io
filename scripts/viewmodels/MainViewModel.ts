import { $j } from "../Foundation"
import { IBodyElement, IMenuElement, ISelectableMenuElement } from "./../interfaces/IJSONData"

export = ApplicationViewModel

class ApplicationViewModel {
    public applicationData: KnockoutObservable<any>;
    public title: KnockoutObservable<string>;
    public header: KnockoutObservable<string>;
    public bodyElements: KnockoutObservableArray<IBodyElement>;

    public menuElements: KnockoutObservableArray<ISelectableMenuElement>;
    public footer: KnockoutObservableArray<IMenuElement>;


    constructor() {

        this.applicationData = ko.observable($j.getJsonData("sharedJson"));

        this.title = ko.observable("");
        this.header = ko.observable("");

        this.menuElements = ko.observableArray([])
        this.bodyElements = ko.observableArray([])
        this.footer = ko.observableArray([]);

    }


    public update = () => {
        $.extend(true, $j.JSONData, $j.sharedJSONData);
        this.title($j.jsonTitle())
        this.header($j.jsonHeader())
        this.menuElements($j.jsonMenuElements())
        this.bodyElements($j.jsonBodyElements())
    }
}

var application = new ApplicationViewModel();