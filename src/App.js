/* eslint-disable */
import React, { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';

export let stockContext = React.createContext();

function App() {

  let [shoes, setShoes] = useState(Data);
  let [stock, setStock] = useState([10,11,12]);
  
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/Detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% Season OFF</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <div className="container">

            <stockContext.Provider value={stock}>
              <div className="row">
                {
                  shoes.map(function(name,index){
                    return <Card shoes={name} index={index} key={index}></Card>
                  })
                }
              </div>
            </stockContext.Provider>

            <button className="btn btn-primary" onClick={()=>{

              // 보내는 법
              //axios.post('서버url',{ id : 'coingapple', pw : 1234 })

              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                // let addShoes = [...shoes];
                // {
                //   result.data.map(function(name,index){
                //     return addShoes.push(name)
                //   })
                // }
                // setShoes(addShoes);
                // console.log(shoes);

                setShoes( [...shoes, ...result.data] );

              })
              .catch(()=>{
                console.log('실패');
              })

            }}>더보기</button>
          </div>
        </Route>

        <stockContext.Provider value={stock}>
          <Route path="/detail/:id">
            <Detail shoes={shoes} stock={stock} setStock={setStock}></Detail>
          </Route>
        </stockContext.Provider>

        <Route path="/:id">
          <div>d아무거나 적었을대</div>
        </Route>
      </Switch>
    </div>
  );
}

function Card(props) {

  let stock = useContext(stockContext);

  return(
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes"+(props.index+1)+".jpg"} alt={"shoes"+(props.index+1)} width="100%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content }</p>
      <p>{ props.shoes.price }</p>
      <Test index={props.index}></Test>
    </div>
  );
}

function Test(props) {

  let stock = useContext(stockContext);

  return(
  <p>재고 : {stock[props.index]}</p>
  );
}

export default App;