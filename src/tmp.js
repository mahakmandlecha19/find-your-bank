import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState('MUMBAI');
  const [selectedRow, setSelectedRow ] = useState({});
  const [loding , setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${city.toUpperCase}`);

        if(res.status !=200) {
          throw Error ('Unable to fetch the data!!!');
        }
        setData(res.data);
        setError(null);
        setLoading(false);
      }
      catch(err){
        setLoading(false);
        setError(err.message);
      }
    }
    fetchData();
  },[city]);



  return (
    <Container>
    <div className = "content">
      <Route exact path = "/"
        render= {() => {
          return (
            <Redirect to = "/all_banks"/>
          )
        }
      }/>
      <Route path= "/all_banks">
        <Container style = {{marginTop: 40}}>
          <h2>All Banks</h2>
          
        </Container>
      </Route>
      
    </div>
    </Container>
  )
}


export default App;
