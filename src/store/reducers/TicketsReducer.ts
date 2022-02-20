import { 
    TicketsAction, 
    TicketsState,
    REQUEST_TICKETS, 
    CREATE_TICKET, 
    UPDATE_TICKET, 
    DELETE_TICKET, 
    LOADING_TICKETS,
    CLEAR_STORE_TICKETS
} from '../types/tickets';

const initialState: TicketsState = {
    tickets: [],
    loading: false
};

export default (state = initialState, action: TicketsAction) => {
    switch(action.type) {
        case LOADING_TICKETS:
            return {
                ...state,
                loading: true
            }
        case REQUEST_TICKETS:
            return {
                ...state,
                tickets: action.payload,
                loading: false
            }
        case DELETE_TICKET:
            return {
                ...state,
                tickets: state.tickets.filter(ticket => ticket.ticketId !== action.payload),
                loading: false
            }
        case CREATE_TICKET:
            return {
                ...state,
                tickets: [...state.tickets, action.payload],
                loading: false
            }
        case UPDATE_TICKET:
            return {
                ...state,
                tickets: state.tickets.map(ticket => {
                    if(ticket.ticketId === action.payload.ticketId) return action.payload;
                    return ticket;
                }),
                loading: false
            }
        case CLEAR_STORE_TICKETS:
            return {
                ...state,
                tickets: new Array(0),
                loading: false
            }
        default:
            return state;
    }
};