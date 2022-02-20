import { DASHBOARD_ROUTE, TICKET_ROUTE, TICKETS_ROUTE, NEW_TICKET_ROUTE } from "./constants";

import TicketPage from "../pages/TicketPage/TicketPage";
import TicketsPage from "../pages/TicketsPage/TicketsPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import NewTicketPage from "../pages/NewTicketPage/NewTicketPage";

export const authRoutes = [
    {
        path: DASHBOARD_ROUTE,
        Component: DashboardPage
    },
    {
        path: TICKET_ROUTE,
        Component: TicketPage
    },
    {
        path: TICKETS_ROUTE,
        Component: TicketsPage
    },
    {
        path: NEW_TICKET_ROUTE,
        Component: NewTicketPage
    }
];