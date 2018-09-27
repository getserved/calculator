import {EQUATOR} from '../Action/actionType'
import Calc from '../../Components/Calc'

export const getRev = (state = {revdata:0}, action) =>{

    switch (action.type) {
      case EQUATOR:
        let rev = new Calc().calculateBrackets(action.num)
        return {
            ...state,
            revdata:rev
        }
      default:
        return {...state}
    }
}
