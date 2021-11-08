import {Reducer} from 'react'
import {StateI} from "models/state.interface";
import {ACTIONS} from "data/constant";

export enum ActionKind {
    START="START",
    UPDATE = "UPDATE",
    LOST = "LOST",
    WIN = "WIN",
}


export interface Action {
    type:ActionKind;
    payload:StateI,
}


export const reducerGame: Reducer<StateI, Action> = (state, action) => {
    switch (action.type) {
        case ACTIONS.START:
            return {
                ...action.payload,
            };
        case ACTIONS.UPDATE:
            return {
                ...state,
                fields:action.payload.fields,
                numberOfNotDisplayedFields:action.payload.numberOfNotDisplayedFields
            };
        case ACTIONS.LOST:
            return {
                ...state,
                fields:action.payload.fields,
                isLost:true,
            };
        case ACTIONS.WIN:
            return {
                ...state,
                fields:action.payload.fields,
                isWin:true,
            };
        default:
            return {
                ...state,
            }

    }
}
