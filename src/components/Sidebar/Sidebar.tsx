import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DASHBOARD_ROUTE, TICKETS_ROUTE } from '../../utils/constants';
import './Sidebar.scss';
import { Link } from 'react-router-dom';

interface ISidebar {

}

const shouldBeOpen = () => window.innerWidth > 900;

const Sidebar: FC<ISidebar> = () => {
    const activeLink = ({ isActive }: any): any => isActive ? 'Sidebar__link active-link' : 'Sidebar__link';
    const [isOpen, setIsOpen] = useState(shouldBeOpen);

    useEffect(() => {
      const resizeHandler = () => {
        setIsOpen(shouldBeOpen);
      }
      window.addEventListener("resize", resizeHandler);

      return () => window.removeEventListener("resize", resizeHandler);
    }, []);
    
    return (
    <div className='Sidebar'>
        <Link 
        className='Sidebar__title'
        to={DASHBOARD_ROUTE} 
        >
          <div className='logo'>
            <img src={require("../../assets/images/logo.png")} alt="logo" />
          </div>
          <h1 className='title'>Dashboard Kit</h1>
        </Link>
        <nav className='Sidebar__nav'>
          <NavLink
              to={DASHBOARD_ROUTE}
              className={activeLink}
              title='Dashboard'
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M15.5233 8.94116H8.54418L13.1921 13.5891C13.3698 13.7667 13.6621 13.7812 13.8448 13.6091C14.983 12.5367 15.7659 11.0912 15.9957 9.46616C16.0351 9.18793 15.8042 8.94116 15.5233 8.94116ZM15.0577 7.03528C14.8154 3.52176 12.0077 0.714119 8.49418 0.471767C8.22595 0.453237 8.00006 0.679413 8.00006 0.948236V7.5294H14.5815C14.8504 7.5294 15.0762 7.30352 15.0577 7.03528ZM6.5883 8.94116V1.96206C6.5883 1.68118 6.34153 1.45029 6.06359 1.48971C2.55859 1.985 -0.120524 5.04705 0.00418193 8.71675C0.132417 12.4856 3.37742 15.5761 7.14801 15.5288C8.63036 15.5103 10.0001 15.0326 11.1262 14.2338C11.3586 14.0691 11.3739 13.727 11.1724 13.5256L6.5883 8.94116Z" fill="#9FA2B4"/>
              </svg>
              { isOpen && <span>Dashboard</span> }
            </NavLink>
          <NavLink
              to={TICKETS_ROUTE}
              className={activeLink}
              title='Tickets'
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M3.55556 3.33329H12.4444V8.66663H3.55556V3.33329ZM14.6667 5.99996C14.6667 6.73635 15.2636 7.33329 16 7.33329V9.99996C16 10.7363 15.4031 11.3333 14.6667 11.3333H1.33333C0.596944 11.3333 0 10.7363 0 9.99996V7.33329C0.736389 7.33329 1.33333 6.73635 1.33333 5.99996C1.33333 5.26357 0.736389 4.66663 0 4.66663V1.99996C0 1.26357 0.596944 0.666626 1.33333 0.666626H14.6667C15.4031 0.666626 16 1.26357 16 1.99996V4.66663C15.2636 4.66663 14.6667 5.26357 14.6667 5.99996ZM13.3333 3.11107C13.3333 2.74288 13.0349 2.4444 12.6667 2.4444H3.33333C2.96514 2.4444 2.66667 2.74288 2.66667 3.11107V8.88885C2.66667 9.25704 2.96514 9.55551 3.33333 9.55551H12.6667C13.0349 9.55551 13.3333 9.25704 13.3333 8.88885V3.11107Z" fill="#9FA2B4"/>
              </svg>
              { isOpen && <span>Tickets</span> }
            </NavLink>
        </nav>
    </div>
    );
}

export default Sidebar;