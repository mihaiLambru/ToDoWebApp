import * as actionTypes from './actionTypes';

export const setTasks = (tasksArray) => {
    return {
        type: actionTypes.SETTASKS,
        tasks: tasksArray
    }
}