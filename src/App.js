import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { SearchResultTable } from './components/searchResultTable';
import { Container } from 'reactstrap';
import {BankDetails} from './components/bankDetails';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('BHOPAL');
  const [category, setCategory] = useState('Branch');
  const [selectedRow, setSelectedRow] = useState({});


  useEffect(()=>{
    const fetchData = async () => {
      try {
        setLoading(true);
   console.log(loading);
        const res = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${city.toUpperCase()}`);
         if (res.status !== 200){
           throw Error ('Could not fetch data');
         }
        setData(res.data);
      
        setError(null);
        console.log(loading);
        setLoading(false);
        console.log(loading);
      }
      catch(err){
        setLoading(false);
        setError(err.message);
      }
    }
    fetchData();
  },[city]);
 
 

  return (
    <Container  style={{boxShadow:"0 3px 10px rgb(0 0 0 / 0.2)", paddingBottom:"40px", paddingTop:"20px", marginTop:"40px"}}>
      <div className="content">
        <Switch>
        <Route exact path="/"
          render={() => {
              return (
                <Redirect to="/all_banks" /> 
              )
          }
        }/>
          <Route path="/all_banks">
            <Container style={{marginTop: 35}}>
              <h2><strong>All Banks</strong></h2>
              { error && 
                    <div>{ error }</div>
                }
              { loading &&  <div id="cover-spin"></div>
                }
                
              { data && 
                <div style={{marginTop: 25}}>
                  <select class="inputElement" style={{marginRight:"30px", marginBottom:"10px"}} value={city} onChange={e=>{
                        setCity(e.target.value);
                        
                    }}>
                        {['Bhopal','Indore', 'Jaipur','Mumbai','Patna'].map(city => (
                            <option key={city} value={city}>
                                {city}
                                
                            </option>
                        ))}
                    </select>
                    <select class="inputElement" value={category} onChange={e=>{
                        setCategory(e.target.value);
                        
                        
                    }}>
                        {['Bank Name', 'Branch', 'IFSC Code'].map(category => (
                            <option key={category} value={category}>
                                {category}
                                
                            </option>
                        ))}
                       
                    </select>
                    
                    { console.log(data)}
                  <SearchResultTable data={data} setSelectedRow={setSelectedRow}  category={category}   title="All Banks"/>
                </div>
                } 
            </Container>
          </Route>
          <Route path="/bank_details/:ifsc_code">
              <BankDetails data={selectedRow}/> 
          </Route>
          
        </Switch>
      </div>


</Container>

  );
}

export default App;

