import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../styles/SearchBeers.scss';
import axios from 'axios';

export default class SearchBeers extends Component {
    constructor (props){
    super(props)
    this.state = {
        name:"", 
        type:"",
        country:"",
        beersByName:[]
}
    this.beerNameInputHandler = this.beerNameInputHandler.bind(this);
    this.getBeersByName = this.getBeersByName.bind(this);

}
beerNameInputHandler(e) {
    let inputValue = e.target.value;
    this.setState({
        name: inputValue
    }) 
}
getBeersByName(){
        axios({
            method: "GET",
            url: `http://localhost:3000/search?key=659d5c6b8f3d2447f090119e48202fdb&type=beer&q=${this.state.name}`
        })
        .then(res => {
            this.setState({
                beersByName: res.data.data
            })
            console.log(this.state.beersByName)
        })
        .catch((err)=> {
                console.log( "Error")
        })
    }


    render() {
        return (
            <div className="search-page">
                <h2>Search beers by name, type or country</h2>
                <div className="search-by-name">
                    <input type="text" name="search" placeholder="search by name" value={this.state.name} onChange={this.beerNameInputHandler}/>
                    <button onClick={this.getBeersByName}>Search Name</button>
                </div>
                <div className="beers-box">
                    {this.state.beersByName.map((item) => (
                        <div key={item.id}>
                            <Link to={`/beer/${item.id}`}> <h5>{item.name}</h5></Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}