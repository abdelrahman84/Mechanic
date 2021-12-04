import { ACCESS_TOKEN, LOGIN_USER, UPDATE_USER_NAME } from "../constants"


const initialState = {
    user: {
        id: '',
        name: '',
        email: '',
        phone: ''
    },
    token: '',
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:

            return {
                ...state,
                user: action.payload
            };

        case ACCESS_TOKEN:

            return {
                ...state,
                token: action.payload
            }

        case UPDATE_USER_NAME:

            return {
                ...state,
                user: {
                    ...state.user, name: action.payload
                }
            }

        default:
            return state;
    }
}

export default rootReducer