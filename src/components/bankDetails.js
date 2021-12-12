import { useParams } from "react-router-dom";
import { Card,Container,ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText , CardHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const BankDetails = ({ data }) => {
    const { ifsc_code } = useParams();
    return(
        <Container  style={{
           width: 1000, padding: 30, marginTop:60, fontSize:20, textAlign:"left", boxShadow:"0 3px 10px rgb(0 0 0 / 0.2)"
        }}>
            <CardHeader className="text-center" style={{backgroundColor:"#00d09c", height:50,fontFamily:"sans-serif", fontSize:'25px', fontWeight:"bold"}}>{data.bank_name }</CardHeader>
             <Card>
                <ListGroup className="list-group-flush">
                <ListGroupItem>
                    <ListGroupItemHeading>Bank ID</ListGroupItemHeading> 
                    <ListGroupItemText>{data.bank_id}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>Branch</ListGroupItemHeading>
                    <ListGroupItemText>{data.branch} </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>IFSC</ListGroupItemHeading>
                    <ListGroupItemText>{data.ifsc} </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>Address</ListGroupItemHeading> 
                    <ListGroupItemText>{data.address}</ListGroupItemText>
                </ListGroupItem>
                </ListGroup>
            </Card>
        </Container>
    )
};
