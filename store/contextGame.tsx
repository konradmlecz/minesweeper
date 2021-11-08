import React, {useReducer, createContext } from 'react';
import {reducerGame} from "store/reducerGame"
import {setState} from "services/setState";
import { StateI } from 'models/state.interface';

export const initialState:StateI = {
    ...setState()
}

const ContextGame = createContext<{
    state:StateI
    dispatch:React.Dispatch<any>
}>({
    state:initialState,
    dispatch:()=>null
});

const GameProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducerGame, initialState);

    return (
        <ContextGame.Provider value={{state, dispatch}}>
            {children}
        </ContextGame.Provider>
    )
}

export {GameProvider,ContextGame}

