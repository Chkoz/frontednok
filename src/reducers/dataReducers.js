import { types } from '../types/types'

export const dataReducer = (state = {}, action) => {
    switch (action.type) {
        case types.getData:

            return {
                host: action.payload.host,
            }

        default:
            return state;
    }
}