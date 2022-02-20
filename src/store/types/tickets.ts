import { User } from "./auth";

export const LOADING_TICKETS = 'LOADING_TICKETS';
export const REQUEST_TICKETS = 'REQUEST_TICKETS';
export const CREATE_TICKET = 'CREATE_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKET';
export const DELETE_TICKET = 'DELETE_TICKET';
export const CLEAR_STORE_TICKETS = 'CLEAR_STORE_TICKETS';

export interface Ticket extends User{
    ticketId: string;
    title: string;
    status: string;
    priority: string;
    descr: string;
    createdAt: any;
    updatedAt: any;
}

export interface TicketsState {
    tickets: Ticket[];
    loading: boolean;
}

//Actions

export interface LoadingTickets {
    type: typeof LOADING_TICKETS;
    payload: boolean;
}
export interface RequestTickets {
    type: typeof REQUEST_TICKETS;
    payload: Ticket[];
}
export interface CreateTicket {
    type: typeof CREATE_TICKET;
    payload: Ticket;
}
export interface UpdateTicket {
    type: typeof UPDATE_TICKET;
    payload: Ticket;
}
export interface DeleteTicket {
    type: typeof DELETE_TICKET;
    payload: string; //id билета
}
export interface ClearStoreTickets {
    type: typeof CLEAR_STORE_TICKETS;
}
export type TicketsAction = LoadingTickets | RequestTickets | CreateTicket | UpdateTicket | DeleteTicket | ClearStoreTickets;