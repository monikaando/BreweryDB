import React, { Component } from 'react';
import '../styles/BreweryList.scss';
import axios from 'axios';


class BreweryList extends Component {
    constructor(props) {
        super(props);
        this.state={
            breweries:[]
        }
        this.getBreweriesList=this.getBreweriesList.bind(this)
    }
    componentDidMount() {
        this.getBreweriesList();
        console.log(this.state.breweries)
    }
    getBreweriesList(){
        axios({
            method: "GET",
            url: "http://localhost:3001/locations/?countryIsoCode=US&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb"
        })
        .then(res => {
            this.setState({
                breweries: res.data.data
            })
            
        })
        .catch((err)=> {
                console.log( "Not sent")
    })
        
    }
    render() {
        return (
            <div>
                <div>
                    <button onClick={this.getBreweriesList}>get brewery list</button>
                </div>
                {this.state.breweries.map((item) => (
                    <div key={item.id}>
                        <h2>{item.brewery.name}</h2>
                    </div>
                ))}
            </div>    
   )
}
}

export default BreweryList;
