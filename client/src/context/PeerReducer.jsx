import { ADD_PEER, REMOVE_PEER } from "./PeerActions.jsx";

// let PeerState = {};

export const PeerReducer = (state, action) => {

    console.log(JSON.stringify(action));

    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: { stream: action.payload.stream }
            }

        case REMOVE_PEER:
            const { [action.payload.peerId]: deleted, ...updatedState } = state;
            return updatedState;

        default:
            return { ...state };
    }
}
