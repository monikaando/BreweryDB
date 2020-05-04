import React from 'react';
import './App.scss';
import Footer from './components/Footer';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BreweryList from "./components/BreweryList";
import SingleBrewery from "./components/SingleBrewery";
import {Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar/> 
      <div className="scrollbar" id="style-2">
        <div className="force-overflow">         
        <Route exact path="/" component={Home}></Route> 
        <Route exact path="/brewery" component={BreweryList}></Route>
        <Route exact path="/breweries/brewery/:id" component={SingleBrewery}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default App;