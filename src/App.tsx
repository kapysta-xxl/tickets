import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import { HOME_ROUTE, DASHBOARD_ROUTE } from './utils/constants';
import './App.scss'

import { authRoutes } from './utils/routes';
import PrivateHoc from './hoc/PrivateHoc';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/index';
import { setUser } from './store/actions/AuthAction';
import { User } from './store/types/auth';
import { getAuth } from "firebase/auth";

function App() {
  const { authenticated } = useSelector((state: RootState ) => state.auth)
  const dispatch = useDispatch()

  //check auth and setuser
  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged(user => {
      if(user) {
        const dataUser: User = {
          userId: user.uid,
          firstName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
      }
      dispatch(setUser(dataUser))
      }
    })
  }, [dispatch])

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path={HOME_ROUTE} element={!authenticated ? <AuthPage/> : <Navigate to={DASHBOARD_ROUTE} replace={true}/>}/>
          { authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<PrivateHoc Children={Component}/>} />) }
          <Route path="*" element={<Navigate to={authenticated ? DASHBOARD_ROUTE : HOME_ROUTE} replace={true}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
