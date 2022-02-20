import { FC, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {Ticket} from '../../store/types/tickets';
import DeleteButton from '../DeleteButton/DeleteButton';
import './TicketComponent.scss';
import { TICKETS_ROUTE } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTicketAction } from '../../store/actions/TicketsAction';
import { RootState } from '../../store';

interface ITicket {
    ticket: Ticket;
}

const TicketComponent: FC<ITicket> = ({ ticket }) => {
    const [mode, setMode] = useState('one')
    const { user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    const updatedDate = useCallback(() => {
        const d = new Date(ticket.updatedAt.seconds * 1000)
        return <span>{d.getDate()} / {d.getMonth()} / {d.getFullYear()}</span>
    }, [ticket])

    const updatedTime = useCallback(() => {
        const d = new Date(ticket.updatedAt.seconds * 1000)
        return <span>{d.getHours()} : {('0' + d.getMinutes()).slice(-2)}: {('0' + d.getSeconds()).slice(-2)}</span>
    }, [ticket])

    const createdDate = useCallback(() => {
        const d = new Date(ticket.createdAt.seconds * 1000)
        return <span>{d.getDate()} / {d.getMonth()} / {d.getFullYear()}</span>
    }, [ticket])

    const deleteHandler = () => {
        dispatch(deleteTicketAction(ticket.ticketId, ticket.title))
    }
    
    const completed = ticket.status === 'completed'
    
    return (
        <>
        {
            mode === 'one' ?
            (
                <div className='ticket' style={{background: completed ? 'lightgreen' : '#fff'}}>
                    <Link to={TICKETS_ROUTE + '/' + ticket.ticketId} className='ticket__link'>
                        <div className='ticket__details'>{ ticket.title}</div>
                        <div className='ticket__body'>{ ticket.descr}</div>
                        <div className='ticket__details'>{ createdDate()}</div>
                        <div className='ticket__details'>{ updatedDate()}</div>
                        <div className='ticket__details'>{ updatedTime() }</div>
                        <div className='ticket__details'>{ ticket.priority}</div>
                    </Link>
                    {ticket.userId === user?.userId && <DeleteButton clickHandler={deleteHandler}/>}
                </div>
            ) :
            (
                <div className='ticket'>
                    <Link to={TICKETS_ROUTE + '/' + ticket.ticketId} className='ticket__link'>
                        <div className='ticket__details'>{  ticket.title}</div>
                        <div className='ticket__body'>{ ticket.descr}</div>
                        <div className='ticket__details'>{ createdDate()}</div>
                        <div className='ticket__details'>{ updatedDate() }</div>
                        <div className='ticket__details'>{ updatedTime() }</div>
                        <div className='ticket__details'>{ ticket.title}</div>
                    </Link>
                    {ticket.userId === user?.userId && <DeleteButton clickHandler={deleteHandler}/>}
                </div>

            )
        }
        </>
    );
}

export default TicketComponent;