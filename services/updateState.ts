import {StateI} from "../models/state.interface";
import {NUMBER_OF_NOT_DISPLAYED_FIELDS_WHEN_YOU_WIN} from 'data/constant'
import {Field} from "./Storage";
import {ACTIONS} from "data/constant";

interface UpdateStateI {
    fields:Array<Field>
    numberOfNotDisplayedFields:number
    action:string
}

const setExplosion = (fields:Array<Field>,clickedField:Field):Array<Field> =>{
    return fields.map(field=> {
        if(field.getId()=== clickedField.getId()) {
            field.setExplosion(true)
        }
        return field
    })
}

const setDisplayFields = (state:StateI,id:number|null):Array<Field> => {
   return state.fields.map(field => {
       if ((field.getId() === id) || (id === null)) {
           field.setIsDisplayed(true)
       }
        return field
    })
}


export const updateState = (state: StateI, id: number):UpdateStateI => {
    let fields;
    let numberOfNotDisplayedFields;
    let action;
    const clickedField = state.fields.find(field => field.getId() === id)
    if (clickedField && clickedField.getBomb()) {
        fields = setDisplayFields(state,null)
        fields = setExplosion(fields,clickedField)
        numberOfNotDisplayedFields = state.numberOfNotDisplayedFields
        action = ACTIONS.LOST
    } else {
        fields = setDisplayFields(state,id)
        numberOfNotDisplayedFields = state.numberOfNotDisplayedFields - 1
        action = ACTIONS.UPDATE
    }
    if(numberOfNotDisplayedFields === NUMBER_OF_NOT_DISPLAYED_FIELDS_WHEN_YOU_WIN){
        fields = setDisplayFields(state,null)
        action = ACTIONS.WIN
    }
    return {
        fields,
        numberOfNotDisplayedFields,
        action,
    }
}