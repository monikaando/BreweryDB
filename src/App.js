import React from 'react';
import './App.scss';
import Footer from './components/Footer';
import Home from "./components/Home";
import {Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
       <Route exact path="/" component={Home}></Route>
      </div>
      <Footer/>
    </div>
  );
}
export default App;