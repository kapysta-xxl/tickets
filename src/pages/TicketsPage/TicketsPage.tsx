import TicketComponent from '../../components/TicketComponent/TicketComponent';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import { Link} from 'react-router-dom';
import { NEW_TICKET_ROUTE } from '../../utils/constants';
import {FlexBoxGrid} from '../../UI/FlexBoxGrid';

import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Header from '../../components/Header/Header';

import { useTheme } from '../../contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { Ticket } from '../../store/types/tickets';
import _ from 'lodash';

const paginate = (array: Ticket[], countShow: number, page: number): Ticket[] => {
    return array.slice((page - 1) * countShow, page * countShow);
}

const Tickets = () => {
    const { tickets } = useSelector((state: RootState) => state.tickets)
    const { theme, themeStyles} = useTheme()
    const [activePage, setActivePage] = useState<number>(1)
    const [countShowTickets, setCountShowTickets] = useState<number>(2)
    const [myTickets, setMyTickets] = useState<Ticket[] | []>([])
    const [countPages, setCountPages] = useState<number>(tickets.length)

    const setCountPagesFn = (current: Ticket[], count: number) => {
        const n = current.length / count;
        const result =  n >= 1 ? Math.ceil(n) : 1;
        setCountPages(result)
    }

    useEffect((): void => {
        setCountPagesFn(tickets, countShowTickets)
    }, [countShowTickets, tickets])

    useEffect((): void => {
        const paginationTickets = paginate(tickets, countShowTickets, activePage)
        setMyTickets(paginationTickets)
    }, [tickets, countShowTickets, activePage])

    useEffect((): void => {
        let localPagination = localStorage.getItem('tickets-pagination')
        if(localPagination){
            let obj = JSON.parse(localPagination)
            setActivePage(obj.page)
            setCountShowTickets(obj.countShow)
        }
    }, [])

    const handleChange = (_: any, value: number): void => {
        setActivePage(value);
        let localPagination = JSON.stringify({ page: value, countShow: countShowTickets})
        localStorage.setItem('tickets-pagination', localPagination)
      };
    
    const selectHandler = (event: any): void => {
        setCountShowTickets(event.target.value)
        let localPagination = JSON.stringify({ page: activePage, countShow: event.target.value})
        localStorage.setItem('tickets-pagination', localPagination)
    }

    const sortStatus = (): void => {
        const hight = tickets.filter(n => n.priority === 'hight')
        const normal = tickets.filter(n => n.priority === 'normal')
        const low = tickets.filter(n => n.priority === 'low')
        const arr = [...hight, ...normal, ...low]
        const paginationTickets = paginate(arr, countShowTickets, activePage)
        setMyTickets(paginationTickets)
    }

    const sortDate = (): void => {
        const sortedDate = tickets.sort((a,b) => b.createdAt.seconds - a.createdAt.seconds)
        const paginationTickets = paginate(sortedDate, countShowTickets, activePage)
        setMyTickets(paginationTickets)
    }

    const search = _.debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
        if(event.target.value.trim() !== ''){
            const filteredTicket = tickets.filter(n => n.title.includes(event.target.value))
            setMyTickets(filteredTicket)
            setCountPagesFn(filteredTicket, countShowTickets)
        }
        else{
            const paginationTickets = paginate(tickets, countShowTickets, activePage)
            setCountPagesFn(tickets, countShowTickets)
            setMyTickets(paginationTickets)
        }
    }, 500)

    return (
        <>
        <Header title={'Tickets'} onSearch={search}/>
            <div className='tickets'>
            <div className='container'>
                <div className='tickets__header' style={themeStyles}>
                    <FlexBoxGrid align='center' gap='0 20px' padding='0 10px'>
                        <h3 className='tickets__title'>All Tickets</h3>
                        <Link 
                        style={{ display: 'block'}} 
                        to={NEW_TICKET_ROUTE}
                        >
                            <Button variant="contained">New Ticket</Button>
                        </Link>
                    </FlexBoxGrid>
                </div>
                <FlexBoxGrid
                align='stretch'
                direction='column'
                justify='stretch'
                >
                <FlexBoxGrid 
                align='center'
                width='90%'
                justify='space-between'
                padding='0 10px'
                >
                <FlexBoxGrid justify='center' align='center'>Image/Updated</FlexBoxGrid>
                <FlexBoxGrid justify='center' align='center'>Title</FlexBoxGrid>
                <FlexBoxGrid justify='center' align='center'>Created</FlexBoxGrid>
                <FlexBoxGrid justify='center' align='center' gap='0 10px' margin='0 0 20px 0'>
                <div 
                style={{ cursor: 'pointer' }}
                onClick={sortDate}
                >
                Date
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.128568 2.26839L2.31563 0.125478C2.48647 -0.0418526 2.7636 -0.0417991 2.93434 0.125478L5.12132 2.26839C5.39667 2.53812 5.20059 3.00001 4.81195 3.00001H3.5V11.5714C3.5 11.8081 3.30414 12 3.0625 12H2.1875C1.94586 12 1.75 11.8081 1.75 11.5714V3.00001H0.437935C0.0485329 3.00001 -0.146209 2.53758 0.128568 2.26839ZM6.5625 1.7143H13.5625C13.8041 1.7143 14 1.52243 14 1.28573V0.428584C14 0.191879 13.8041 1.34454e-05 13.5625 1.34454e-05H6.5625C6.32086 1.34454e-05 6.125 0.191879 6.125 0.428584V1.28573C6.125 1.52243 6.32086 1.7143 6.5625 1.7143ZM6.125 4.71429V3.85715C6.125 3.62045 6.32086 3.42858 6.5625 3.42858H11.8125C12.0541 3.42858 12.25 3.62045 12.25 3.85715V4.71429C12.25 4.951 12.0541 5.14287 11.8125 5.14287H6.5625C6.32086 5.14287 6.125 4.951 6.125 4.71429ZM6.125 11.5714V10.7143C6.125 10.4776 6.32086 10.2857 6.5625 10.2857H8.3125C8.55414 10.2857 8.75 10.4776 8.75 10.7143V11.5714C8.75 11.8081 8.55414 12 8.3125 12H6.5625C6.32086 12 6.125 11.8081 6.125 11.5714ZM6.125 8.14286V7.28572C6.125 7.04901 6.32086 6.85715 6.5625 6.85715H10.0625C10.3041 6.85715 10.5 7.04901 10.5 7.28572V8.14286C10.5 8.37957 10.3041 8.57143 10.0625 8.57143H6.5625C6.32086 8.57143 6.125 8.37957 6.125 8.14286Z" fill={theme?.styles?.color}/>
                </svg>
                </div>
                <div
                style={{ cursor: 'pointer' }}
                onClick={sortStatus}
                >
                Status
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.128568 2.26839L2.31563 0.125478C2.48647 -0.0418526 2.7636 -0.0417991 2.93434 0.125478L5.12132 2.26839C5.39667 2.53812 5.20059 3.00001 4.81195 3.00001H3.5V11.5714C3.5 11.8081 3.30414 12 3.0625 12H2.1875C1.94586 12 1.75 11.8081 1.75 11.5714V3.00001H0.437935C0.0485329 3.00001 -0.146209 2.53758 0.128568 2.26839ZM6.5625 1.7143H13.5625C13.8041 1.7143 14 1.52243 14 1.28573V0.428584C14 0.191879 13.8041 1.34454e-05 13.5625 1.34454e-05H6.5625C6.32086 1.34454e-05 6.125 0.191879 6.125 0.428584V1.28573C6.125 1.52243 6.32086 1.7143 6.5625 1.7143ZM6.125 4.71429V3.85715C6.125 3.62045 6.32086 3.42858 6.5625 3.42858H11.8125C12.0541 3.42858 12.25 3.62045 12.25 3.85715V4.71429C12.25 4.951 12.0541 5.14287 11.8125 5.14287H6.5625C6.32086 5.14287 6.125 4.951 6.125 4.71429ZM6.125 11.5714V10.7143C6.125 10.4776 6.32086 10.2857 6.5625 10.2857H8.3125C8.55414 10.2857 8.75 10.4776 8.75 10.7143V11.5714C8.75 11.8081 8.55414 12 8.3125 12H6.5625C6.32086 12 6.125 11.8081 6.125 11.5714ZM6.125 8.14286V7.28572C6.125 7.04901 6.32086 6.85715 6.5625 6.85715H10.0625C10.3041 6.85715 10.5 7.04901 10.5 7.28572V8.14286C10.5 8.37957 10.3041 8.57143 10.0625 8.57143H6.5625C6.32086 8.57143 6.125 8.37957 6.125 8.14286Z" fill={theme?.styles?.color}/>
                </svg>
                </div>
                </FlexBoxGrid>
                </FlexBoxGrid>
                { myTickets.length !== 0 && myTickets.map(ticket => {
                    return (
                        <div className='tickets-grid__item' key={ticket.ticketId}>
                            <TicketComponent mode='one' ticket={ticket}/>
                        </div>
                    )
                }) }
                </FlexBoxGrid>
                <FlexBoxGrid 
                justify='flex-end'
                align='center'
                gap='0 10px'
                >
                    <Pagination
                    size='small' 
                    count={countPages} 
                    page={activePage} 
                    onChange={handleChange}
                    />
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={countShowTickets}
                    onChange={selectHandler}
                    autoWidth
                    label="Age"
                    >
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                    </Select>
                </FlexBoxGrid>
            </div>
        </div>
        </>
    );
}

export default Tickets;