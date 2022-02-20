import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { signout } from '../../store/actions/AuthAction';
import './Header.scss';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';

import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useTheme } from '../../contexts/ThemeContext';

interface IHeader {
    title: string;
    onSearch?: (value: any) => any;
}

const Header: FC<IHeader> = ({ title, onSearch }) => {
    const { user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const { setCurrentTheme, themeStyles} = useTheme()

    
    return (
    <header className='Header' style={themeStyles}>
        <div className='container Header__container'>
            <h2 className='Header__title'>{title}</h2>
            { pathname.slice(1) === 'tickets' && 
            <TextField 
            style={{ width: '45%' }} 
            label="Search tickets from title" 
            type="search" 
            onKeyDown={onSearch}
            /> }
            <div className='Header__theme-controls'>
                <LightModeIcon onClick={() => setCurrentTheme('light')} />
                <ModeNightIcon onClick={() => setCurrentTheme('dark')} />
            </div>
            <div className="user">
                <span className='user__name'>{ user?.firstName }</span>
                <button onClick={() => dispatch(signout())}><img src={user?.photoURL} alt="user img" /></button>
            </div>
        </div>
    </header>
    )
}

export default Header;