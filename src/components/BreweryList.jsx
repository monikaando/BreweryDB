import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../styles/BreweryList.scss';
import axios from 'axios';
import _ from "lodash";



class BreweryList extends Component {
    constructor(props) {
        super(props);
        this.state={
            breweries:[]
        }
        this.getBreweriesList=this.getBreweriesList.bind(this);
        this.removeDuplicates=this.removeDuplicates.bind(this);
    }
    componentDidMount() {
        this.getBreweriesList();
        console.log(this.state.breweries)
    }
    getBreweriesList(){
        axios({
            method: "GET",
            url: "http://localhost:3000/locations/?countryIsoCode=US&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb"
        })
        .then(res => {
            this.setState({
                breweries: res.data.data
            })
            this.removeDuplicates()  
        })
        .catch((err)=> {
                console.log( "Not sent")
        })
    }
    removeDuplicates() {
        if(this.state.breweries){
        var unique = _.uniqBy(this.state.breweries,'breweryId')
        }
        this.setState({
            breweries:unique
        })
    }
    render() {
        return (
            <div>
                {this.state.breweries.map((item) => (
                    <div key={item.id}>
                       <Link to={`brewery/${item.breweryId}`}> <h4>{item.brewery.name}</h4>
                       <h4>{item.brewery.name}</h4></Link>
                    </div>
                ))}
            </div>    
   )
}
}

export default BreweryList;
