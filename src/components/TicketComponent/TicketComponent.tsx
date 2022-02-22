import { FC, useState, useCallback, useMemo } from 'react';

import {Ticket} from '../../store/types/tickets';
import DeleteButton from '../DeleteButton/DeleteButton';
import {MyLink, MyTicket, UserImg, Span, Priority} from './styled';
import { FlexBoxGrid } from '../../UI/FlexBoxGrid';
import { TICKETS_ROUTE } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTicketAction } from '../../store/actions/TicketsAction';
import { RootState } from '../../store';

interface ITicket {
    ticket: Ticket;
    mode: string;
}

const TicketComponent: FC<ITicket> = ({ ticket, mode }) => {
    const { user } = useSelector((state: RootState) => state.auth) 
    const dispatch = useDispatch()

    // const updatedDate = useCallback(() => {
    //     const d = new Date(ticket.updatedAt.seconds * 1000)
    //     return <span>{d.getDate()} / {d.getMonth()} / {d.getFullYear()}</span>
    // }, [ticket])

    const updatedTime = useCallback(() => {
        const d = new Date(ticket.updatedAt.seconds * 1000)
        return <span>{d.getHours()} : {('0' + d.getMinutes()).slice(-2)}: {('0' + d.getSeconds()).slice(-2)}</span>
    }, [ticket])

    const createdDate = useCallback(() => {
        const d = new Date(ticket.createdAt.seconds * 1000)
        return <span>{d.getDate()} / {d.getMonth()} / {d.getFullYear()}</span>
    }, [ticket])

    const deleteHandler = useCallback(() => {
        dispatch(deleteTicketAction(ticket.ticketId, ticket.title))
    } , [])
    
    const completed = ticket.status === 'completed'
    
    const bgPriority = useMemo(() => {
        let bg = '';
        if(ticket.priority === 'hight') bg = 'orange';
        if(ticket.priority === 'normal') bg = 'limegreen';
        if(ticket.priority === 'low') bg = 'yellow';
        return bg;
    }, [ticket])
    return (
        <>
        {
            mode === 'one' ?
            (
                <MyTicket style={{background: completed ? 'lightgreen' : '#fff'}}>
                    <MyLink to={TICKETS_ROUTE + '/' + ticket.ticketId} justify='stretch'>
                        <FlexBoxGrid
                         direction='column' 
                         justify='center' 
                         align='center' 
                         background='transparent' 
                         flex='flex'
                         gap='6px 0'
                         >
                            <UserImg src={ticket.photoURL}/>
                            <Span>{ updatedTime() }</Span>
                        </FlexBoxGrid>
                        <FlexBoxGrid 
                        direction='column' 
                        justify='center' 
                        align='center' 
                        background='transparent' 
                        flex='flex'
                        >
                        <FlexBoxGrid 
                        justify='center' 
                        align='center' 
                        background='transparent' 
                        flex='flex'>{ ticket.title}</FlexBoxGrid>
                        </FlexBoxGrid>
                        <FlexBoxGrid
                        justify='center' 
                        align='center' 
                        background='transparent' 
                        flex='flex'
                        >
                        Created: { createdDate()}
                        </FlexBoxGrid>
                        <FlexBoxGrid
                        justify='center' 
                        align='center' 
                        background='transparent' 
                        flex='flex'
                        >
                            <Priority background={bgPriority}>{ ticket.priority}</Priority>
                        </FlexBoxGrid>
                    </MyLink>
                    {ticket.userId === user?.userId && <div><DeleteButton clickHandler={deleteHandler}/></div>}
                </MyTicket>
            ) :
            (
                <MyTicket className='ticket'>
                    <MyLink to={TICKETS_ROUTE + '/' + ticket.ticketId}>
                        <div>
                            <UserImg src={ticket.photoURL}/>
                            <Span className='ticket__details'>{ updatedTime() }</Span>
                        </div>
                        <div className='ticket__details'>{  ticket.title}</div>
                        <div className='ticket__body'>{ ticket.descr}</div>
                        <Span className='ticket__details'>{ createdDate()}</Span>
                        <div className='ticket__details'>{ ticket.title}</div>
                    </MyLink>
                    {ticket.userId === user?.userId && <div><DeleteButton clickHandler={deleteHandler}/></div>}
                </MyTicket>

            )
        }
        </>
    );
}

export default TicketComponent;