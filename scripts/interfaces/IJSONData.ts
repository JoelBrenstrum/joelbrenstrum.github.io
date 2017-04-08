import { ViewEnum } from "scripts/viewmodels/ViewEnum"


export interface IJSONData {
    title: string,
    bodyElements: Array<IBodyElement>
    header: string,
    name: string,
    footer: Array<IMenuElement>
}

export interface ISharedJSONData {
    title: string,
    menuElements: Array<ISelectableMenuElement>
}

export interface IBodyElement {
    id: "",
    heading: "",
    content: ""
}


export interface IMenuElement {
    isLink: boolean,
    title: string,
    url: ViewEnum,
}

export interface ISelectableMenuElement extends IMenuElement {
    selected: KnockoutObservable<boolean>,
}