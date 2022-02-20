import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { HOME_ROUTE } from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { clearStoreTickets, requestTicketsAction } from '../store/actions/TicketsAction';

import Sidebar from '../components/Sidebar/Sidebar';


interface IPrivateHoc {
    Children: React.ComponentType;
}

const PrivateHoc: FC<IPrivateHoc> = ({ Children }) => {
    const { authenticated } = useSelector((state: RootState ) => state.auth)
    const dispatch = useDispatch()

    //check auth and set tickets
    useEffect((): any => {
        if(authenticated) {
            dispatch(requestTicketsAction())
        }
        return dispatch(clearStoreTickets());
    }, [dispatch, authenticated])

    if(authenticated) {
        return (
            <>
            <Sidebar />
            <section>
                <Children />
            </section>
            </>
        )
    }

    return <Navigate to={HOME_ROUTE} replace={true}/>;
}

export default PrivateHoc;