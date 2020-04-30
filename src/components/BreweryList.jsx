import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../styles/BreweryList.scss';
import axios from 'axios';
import _ from "lodash";


class BreweryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
             select: {
                selectedCode:[]
            },
            breweries:[],
            countryCode:[]
        }
        this.getBreweriesList=this.getBreweriesList.bind(this);
        this.removeDuplicates=this.removeDuplicates.bind(this);
        this.getCountryCodeList=this.getCountryCodeList.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }
    componentDidMount() {
        this.getBreweriesList();
        this.getCountryCodeList(); 
    }
    getBreweriesList(){
        axios({
            method: "GET",
            url: `http://localhost:3000/locations/?countryIsoCode${this.state.selectedCode}&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb`
        })
        .then(res => {
            this.setState({
                breweries: res.data.data
            })
            this.removeDuplicates()  
        })
        .catch((err)=> {
                console.log( "Error")
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
    getCountryCodeList(){
        axios({
            method: "GET",
            url: "http://localhost:3000/locations/?key=659d5c6b8f3d2447f090119e48202fdb"
        })
        .then(res => {
            let code = [...new Set(res.data.data.map(item => item.countryIsoCode))]
            this.setState({
                countryCode: code
            })
            console.log('All unique coutry codes in Array: '+ this.state.countryCode)
        })
        .catch((err)=> {
                console.log( "Error")
        })
    }
    handleInputChange(e) {
        e.preventDefault();
        let updatedCountryCode = this.state.select;
        updatedCountryCode[e.target.name] = e.target.value;
        this.setState({
            select:updatedCountryCode
        })
        console.log(this.state.select.selectedCode)
        this.props.history.push(`/breweries/`);

    }

    render() {
        return (
            <div>
            <div>
            <select
                multiple={true} type="select-multiple"
                aria-label="country-code" 
                name="selectedCode" 
                value={this.state.select.selectedCode} 
                onChange={this.handleInputChange}
            >
                <option value="">Choose a country</option>
                {this.state.countryCode.map(item => (
                  <option name="selectedCode" key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <h2>Breweries from {this.state.select.selectedCode}</h2>
                {this.state.breweries.map((item) => (
                    <div key={item.id}>
                       <Link to={`brewery/${item.breweryId}`}> <h4>{item.brewery.name}</h4></Link>
                    </div>
                ))}
            </div>    
   )
}
}

export default BreweryList;
