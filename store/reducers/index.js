import { ACCESS_TOKEN, LOGIN_USER } from "../constants"


const initialState = {
    user: {
        id: '',
        first_name: '',
        last_name: '',
        username: '',
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

        default:
            return state;
    }
}

export default rootReducer