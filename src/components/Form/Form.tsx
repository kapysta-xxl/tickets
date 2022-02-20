import React, { useMemo } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useParams } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Form.scss';
import Loader from '../../UI/Loader';

import firebase from '../../firebase/config'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createTicketAction, updateTicketAction } from '../../store/actions/TicketsAction';
import { Ticket } from '../../store/types/tickets';
import { RootState } from '../../store';

import { useNavigate } from 'react-router-dom';
import { TICKETS_ROUTE } from '../../utils/constants';

interface FormValues {
    title: string;
    priority: string;
    descr: string;
}

const Form = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { user} = useSelector((state: RootState) => state.auth)
    const { tickets, loading} = useSelector((state: RootState) => state.tickets)

    const editTicket = useMemo(() => tickets.find(n => n.ticketId === params.ticketId), [params, tickets])

    const { control , reset, register, setValue, getValues, handleSubmit, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            title: editTicket?.title || '',
            priority: editTicket?.priority || '',
            descr: editTicket?.descr || ''
        }
    });
    
    // const isMyTicket: boolean = useMemo(() => {
    //     let isMy: boolean = false
    //     if(params.ticketId){
    //         const current = tickets.find(n => n.ticketId === params.ticketId) 
    //         if(current?.userId === user?.userId) isMy = true;
    //     }
    //     return isMy;
    // }, [params, tickets, user])


    const onSuccess = () => {
        reset()
        navigate(TICKETS_ROUTE, { replace: true })
    }

    const edit = (data: FormValues ) => {
        const currentTicket: any = {
            ...editTicket,
            ...data,
            updatedAt: firebase.firestore.Timestamp.now()
        }
        dispatch(updateTicketAction(currentTicket, onSuccess))
    }

    const create = (data: FormValues): any => {
        const ticket: Ticket = {
            ...user,
            ticketId: '',
            status: 'progress',
            priority: data.priority,
            descr: data.descr,
            title: data.title,
            createdAt: firebase.firestore.Timestamp.now(),
            updatedAt: firebase.firestore.Timestamp.now()
        }
        dispatch(createTicketAction(ticket, onSuccess))
    }

    const onErrors = () => {
        toast.error('Validation Error')
    }

    const selectHandler = (event: any) => {
        if(event.target.value !== '') clearErrors('priority');
        setValue('priority', event.target.value);
    };

    const completedHandler = () => {
        const currentEdited = {
            ...editTicket, 
            status: 'completed',
            updatedAt: firebase.firestore.Timestamp.now()
        }
        dispatch(updateTicketAction(currentEdited, () => void 0))
    };

    if(loading) return <Loader />;

    return (
        <form 
        className='form'
        onSubmit={handleSubmit(params.ticketId ? edit : create, onErrors)}
        >
        <div className='form__body'>
        <div className='form__body-box'>
        <TextField
            fullWidth
            {...register("title", {
            required: true,
            maxLength: 50,
            minLength: 1
            })}
            className='form__field-title'
            label="Ticket Title"
            />
        <span className='error'>{errors.title && 'Title is required.'}</span>
        </div>
        <div className='form__body-box'>
        <Controller
            name="priority"
            control={control}
            rules={{ required: true }}
            render={() => (
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getValues("priority")}
                onChange={selectHandler}
                >
                <MenuItem value={'hight'}>Hight</MenuItem>
                <MenuItem value={'normal'}>Normal</MenuItem>
                <MenuItem value={'low'}>Low</MenuItem>
                </Select>
            </FormControl>
            )}
        />
        <span className='error'>{errors.priority && 'select is required.'}</span>
        </div>
        <TextField
        {...register("descr", {
            maxLength: 100,
            minLength: 1
        })}
        className='form__descr'
        fullWidth
        label="Description"
        />
        </div>
        <span className='error'>{errors.descr?.type === 'maxLength' && 'Max 100 symbols'}</span>
        {
                <div className='form__footer'>
                <Button 
                
                variant="contained" 
                disabled={editTicket?.status !== 'progress'}
                onClick={completedHandler}
                >
                COMPLETED
                </Button>
                <Button type='submit' variant="contained">{editTicket ? 'UPDATE' : 'CREATE'}</Button>
            </div>}

        </form>
    );
}

export default Form;