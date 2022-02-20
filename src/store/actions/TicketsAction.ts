import { ThunkAction } from "redux-thunk";

import { 
    TicketsAction, 
    Ticket, 
    LOADING_TICKETS, 
    DELETE_TICKET, 
    CREATE_TICKET, 
    UPDATE_TICKET, 
    REQUEST_TICKETS,
    CLEAR_STORE_TICKETS
} from '../types/tickets';
import { RootState} from '..';

import firebase from  "../../firebase/config";
import 'firebase/compat/firestore';

import toast from 'react-hot-toast';

export const createTicketAction = (dataTicket: Ticket, onSuccess: () => void ): ThunkAction<void, RootState, null, TicketsAction> => {
    return dispatch => {
        dispatch({
            type: LOADING_TICKETS,
            payload: true
        })
        firebase.firestore().collection('tickets').add(dataTicket)
        .then((doc) => {
            let ticket = {
                ...dataTicket,
                ticketId: doc.id
            }
            firebase.firestore().collection("tickets").doc(doc.id).update(ticket);
            return ticket;
        })
        .then(ticket => {
            dispatch({
                type: CREATE_TICKET,
                payload: ticket
            })
            toast.success('Created successfully')
            onSuccess()
        })
        .catch(e => {
            console.log(e)
            toast.error('Created error')
        })
    }
};

export const requestTicketsAction = (): ThunkAction<void, RootState, null, TicketsAction> => {
    return dispatch => {
        dispatch({
            type: LOADING_TICKETS,
            payload: true
        })
        firebase.firestore().collection('tickets').get()
        .then((data) => {
            const tickets: any[] = []
            data.forEach(doc => tickets.push(doc.data()))
            dispatch({
                type: REQUEST_TICKETS,
                payload: tickets
            })
        })
        .catch(e => toast.error('Request tickets error'))
    }
}

export const updateTicketAction = (ticket: any, onSuccess: () => void): ThunkAction<void, RootState, null, TicketsAction> => {
    return dispatch => {
        dispatch({
            type: LOADING_TICKETS,
            payload: true
        })
        firebase.firestore().collection("tickets").doc(ticket.ticketId).update({...ticket})
        .then(() => {
            dispatch({
                type: UPDATE_TICKET,
                payload: ticket
            })
            toast.success('Update successfully')
            onSuccess()
        })
        .catch(e => {
            toast.error('Update error')
        })
    }
}

export const deleteTicketAction = (id: string, title: string): ThunkAction<void, RootState, null, TicketsAction> => {
    return async dispatch => {
        await firebase.firestore().collection("tickets").doc(id).delete()
        .then(() => {
            dispatch({
                type: DELETE_TICKET,
                payload: id
            })
            toast.success(`${title} ticket deleted`)
        })
    }
}

export const clearStoreTickets = (): ThunkAction<void, RootState, null, TicketsAction> => {
    return async dispatch => {
        dispatch({
            type: CLEAR_STORE_TICKETS
        })
    }
}