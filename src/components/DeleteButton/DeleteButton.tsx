import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface IDeleteButton {
    clickHandler: () => void;
}   

const DeleteButton: FC<IDeleteButton>= ({ clickHandler }) =>  {
    const [open, setOpen] = useState(false)

    const done = () => {
        clickHandler()
        setOpen(false)
    }

    const close = () => {
        setOpen(false)
    }

    return !open ? 
    <DeleteIcon onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}/> : 
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <DoneIcon onClick={done} style={{ cursor: 'pointer' }}/>
        <CloseIcon onClick={close} style={{ cursor: 'pointer' }}/>
    </div>
}

export default DeleteButton;