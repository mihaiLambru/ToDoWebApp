import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    tasks: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SETTASKS: {
            return updateObject(state,
                {
                    tasks: [...action.tasks]
                });
        }
    }
    return state;
}
export default reducer;