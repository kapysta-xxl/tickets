import { signin } from '../../store/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loader from '../../UI/Loader';
import { Button }from '@mui/material';

const AuthPage = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector((state: RootState ) => state.auth)

    if(loading) return <Loader />;

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" onClick={() => dispatch(signin())}>AUTH WITH GOOGLE</Button>
        </div>
    );
}

export default AuthPage;