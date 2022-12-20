import { CREATE_EVENT, FETCH_EVENTS } from "./events";

const initialState = {
    events: []
}

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVENTS: return {
            events: action.events
            }
        default: return state
    }
}

export default eventReducer