import * as counterType from './actionType'

const ActionGenerator = (type, num) => (num) => {
    let action = { type, num : num }
    return action
}

export const getResult = ActionGenerator(counterType.EQUATOR, null);
