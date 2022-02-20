import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";

const NewTicketPage = () => {

    return (
        <div className="newTicketPage" style={{ width: '100%'}}>
            <Header title={'Create Ticket'}/>
            <div className="container">
            <Form />
            </div>
        </div>
    )
}

export default NewTicketPage;