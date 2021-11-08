import {Storage} from "services/Storage"
import {StateI} from 'models/state.interface'
export const setState =():StateI=>{
    const storage = new Storage()
    return {
        fields : storage.getFields(),
        numberOfNotDisplayedFields: storage.getNumberOfNotDisplayedFields(),
        isWin:storage.getIsWin(),
        isLost:storage.getIsLost(),
    }
}
