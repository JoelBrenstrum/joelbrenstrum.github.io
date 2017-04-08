import { ViewEnum } from "scripts/viewmodels/ViewEnum"


export interface IJSONDataProcessed {
    title: string,
    bodyElements: Array<IBodyElementProcessed>
    header: string,
    name: string,
    footer: Array<IMenuElementProcessed>
}

export interface IJSONData {
    title: string,
    bodyElements: Array<IBodyElement>
    header: string,
    name: string,
    footer: Array<IMenuElement>
}

export interface ISharedJSONDataProcessed {
    title: string,
    menuElements: Array<ISelectableMenuElementProcessed>
}

export interface ISharedJSONData {
    title: string,
    menuElements: Array<ISelectableMenuElement>
}

export interface IBodyElement {
    id: string
    heading: string
    content: string,
    subfile?: string
}


export interface IBodyElementProcessed {
    id: string
    heading: string
    content: KnockoutObservable<string>,
    subfile?: string
}


export interface IMenuElement {
    isLink: boolean,
    title: string,
    url: ViewEnum,
}

export interface IMenuElementProcessed {
    isLink: KnockoutObservable<boolean>,
    title: string,
    url: ViewEnum,
}

export interface ISelectableMenuElement extends IMenuElement {
    selected: boolean,
}
export interface ISelectableMenuElementProcessed extends IMenuElementProcessed {
    selected: KnockoutObservable<boolean>,
}