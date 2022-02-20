import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";

const TicketPage = () => {
    const params = useParams()
    const { tickets } = useSelector((state: RootState) => state.tickets)
    const ticket = useMemo(() => tickets.find(n => n.ticketId === params.ticketId), [tickets, params])

    return (
        <div className="ticket-page" style={{ width: '100%' }}>
            <Header title={ticket.title}/>
            <div className="container">
                <Form />
            </div>
        </div>
    )
}

export default TicketPage;