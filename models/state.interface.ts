import {Field} from "services/Storage";

export interface StateI {
    fields:Array<Field>,
    numberOfNotDisplayedFields:number,
    isLost:boolean,
    isWin:boolean,
}
