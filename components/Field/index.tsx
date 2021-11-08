import React, {useContext} from "react";
import {ContextGame} from "store/contextGame";
import {updateState} from "services/updateState";
import {Bomb} from "components/Bomb";

export interface FieldI {
    id: number,
    bomb: boolean,
    isDisplayed: boolean,
    explosion:boolean,
    numberOfNeighborBomb: number,
}

export const Field: React.FC<FieldI> = ({id, bomb, isDisplayed,explosion, numberOfNeighborBomb}) => {
    const {state, dispatch} = useContext(ContextGame)
    const handleClickField = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement
        const id = Number(target.getAttribute("data-id"))
        const { action,fields,numberOfNotDisplayedFields }= updateState(state, id)
        dispatch({type:action, payload:{fields,numberOfNotDisplayedFields}})
    }
    return (
        <button data-id={id}
                className={`w-30 h-30 text-sm sm:text-xl  border-2 hover:bg-blue-400 cursor-pointer flex items-center justify-center sm:w-50 sm:h-50 ${explosion ? "bg-red-600" : "bg-blue-300"}`}
                onClick={handleClickField} disabled={isDisplayed} >
            {(isDisplayed && bomb) ? <Bomb/> : null}
            {(isDisplayed && !bomb) ? numberOfNeighborBomb : null}
        </button>
    )
}