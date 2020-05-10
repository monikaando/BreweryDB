import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../styles/SearchBeers.scss';
import axios from 'axios';
import _ from "lodash";

export default class SearchBeers extends Component {
    constructor (props){
    super(props)
    this.state = {
        select: {
            selectedCode:"" 
        },
        name:"", 
        type:"",
        beersByName:[],
        beersByType:[],
        beersByCountry:[],
        countryCode:[], 
        page:1,
        numberOfPages:0
}
    this.beerNameInputHandler = this.beerNameInputHandler.bind(this);
    this.getBeersByName = this.getBeersByName.bind(this);
    this.beerTypeInputHandler = this.beerTypeInputHandler.bind(this);
    this.handleBeerCountryChange = this.handleBeerCountryChange.bind(this);
    this.getBeersByType = this.getBeersByType.bind(this);
    this.getBeersByCountry = this.getBeersByCountry.bind(this);
    this.getCountryCodeList = this.getCountryCodeList.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.getAllBeersName = this.getAllBeersName.bind(this);
    this.getAllBeersType = this.getAllBeersType.bind(this);
    this.getAllBeersCountry = this.getAllBeersCountry.bind(this);
    this.clearInputFields = this.clearInputFields.bind(this);
}
componentDidMount() {
    this.getCountryCodeList();
}
beerNameInputHandler(e) {
    let inputValue = e.target.value;
    this.setState({
        name: inputValue.toLowerCase(),
    }) 
    this.clearSearch();
}
beerTypeInputHandler(e){
    let input = e.target.value;
    this.setState({
        type: input.toLowerCase()
    }) 
    this.clearSearch();
}
handleBeerCountryChange(e){
    e.preventDefault();
    let updatedCountryCode = this.state.select;
    updatedCountryCode[e.target.name] = e.target.value;
    this.getAllBeersCountry();
    this.setState({
        select:updatedCountryCode
    })
    this.getAllBeersCountry();
}
getNextPage(){
    this.setState({
        page: this.state.page + 1
        })
    if (this.state.name.length>0){
        this.getBeersByName()
    }
    else if(this.state.type.length>0) (
        this.getBeersByType()
    )
    else if(this.state.select.selectedCode){
        this.getBeersByCountry()
    }
}
getAllBeersName(){
    this.getBeersByName()
    this.setState({
        page: this.state.page + 1
    })
}
getAllBeersType(){
    this.getBeersByType()
    this.setState({
        page: this.state.page + 1
    })
}
getAllBeersCountry(){
    this.getBeersByCountry()
    this.setState({
        page: this.state.page + 1
    })
}
getBeersByName(){
    axios({
        method: "GET",
        url: `http://localhost:3000/search/?key=659d5c6b8f3d2447f090119e48202fdb&p=${this.state.page}&type=beer&q=${this.state.name}`
    })
    .then(res => {
        this.setState({
            beersByName: res.data.data,
            numberOfPages:res.data.numberOfPages
        })
    })
    .catch((err)=> {
            console.log("No more beers here")
    })
}
getBeersByType(){
    axios({
        method: "GET",
        url: `http://localhost:3000/search/?key=659d5c6b8f3d2447f090119e48202fdb&p=${this.state.page}&type=beer&q=${this.state.type}`
    })
    .then(res => {
        this.setState({
            beersByType: res.data.data,
            numberOfPages: res.data.numberOfPages
        })
    })
    .catch((err)=> {
        console.log("No more beers here")
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
        console.log(this.state.countryCode.toString())
    })
    .catch((err)=> {
            console.log("No more beers here")
    })
}
getBeersByCountry(){
    axios({
        method: "GET",
        url: `http://localhost:3000/beers/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb&p=${this.state.page}`
    })
    .then(res => {
        this.setState({
            beersByCountry: res.data.data,
            numberOfPages: res.data.numberOfPages
        })
        console.log(this.state.page)
        this.removeDuplicates()
    })
    .catch((err)=> {
            console.log("No more beers here")
    })
}   
clearSearch(){
    this.setState({
        beersByName:[],
        beersByType:[],
        beersByCountry:[],
        countryCode:[], 
        page:1,
        numberOfPages:0
})
}
clearInputFields(){
    this.setState({
        select: {
            selectedCode:"" 
        },
        name:"", 
        type:"",
        beersByName:[],
        beersByType:[],
        beersByCountry:[],
        countryCode:[], 
        page:1,
        numberOfPages:0
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
            <div className="search-page">
                <h2>Search beers by name, type or country</h2>
                <div>
                    <div className="buttons-next-clear">
                        <button onClick={this.clearInputFields}>Reset searching</button>
                        <button onClick={this.getNextPage}>Next page </button>
                    </div>
                    <div className="search-boxes">
                        <div>
                            <input type="text" name="beername" placeholder="search by name" value={this.state.name} onChange={this.beerNameInputHandler}/>
                            <button onClick={this.getAllBeersName}>Search</button>
                        </div>
                        <div>
                            <input type="text" name="beertype" placeholder="search by type" value={this.state.type} onChange={this.beerTypeInputHandler}/>
                            <button onClick={this.getAllBeersType}>Search</button>
                        </div>                  
                        <div className="select">
                            <select
                                aria-label="country-code" 
                                name="selectedCode" 
                                value={this.state.select.selectedCode.toString()} 
                                onChange={this.handleBeerCountryChange}
                                onClick={this.getCountryCodeList}
                                >
                                <option value="" defaultValue>Choose a country</option>
                                {this.state.countryCode.map(item => (
                                <option name="selectedCode" key={item} value={item}>
                                    {item}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="numberOfPages">
                {this.state.numberOfPages>=1 && this.state.page<=(this.state.numberOfPages)+1 ? (
                    <h5>page {this.state.page-1}/{this.state.numberOfPages}</h5>
                ):(
                    <h5> </h5>
                )}    
                </div>
                <div className="beers-box">
                {this.state.beersByName ? (
                        <div>
                        {this.state.beersByName.map((item) => (
                                <div key={item.id}>
                                {((item.name).toLowerCase()).includes((this.state.name).toLowerCase()) ? (
                                    <div>
                                    <Link to={`/beer/${item.id}`}> 
                                    <h5>{item.name}</h5></Link>
                                    </div>
                                    ):(
                                    <p>not exists</p>
                                    )}
                                </div>
                            ))}
                        </div>
                ):(
                    <h4>Nothing here, try another name</h4>
                )}
                
                {this.state.beersByType ? (
                    <div>
                    {this.state.beersByType.map((item) => (
                        <div key={item.id}>
                        {item.style ? (
                        <div>
                            {((item.style.name).toLowerCase()).includes((this.state.type).toLowerCase()) ? (
                                <Link to={`/beer/${item.id}`}> 
                                <h5>{item.name}</h5>
                                </Link>
                            ):(
                                <p>not exists</p>
                            )}
                        </div>
                        ):(
                            <p>Loading...</p>
                        )}
                        </div>
                    ))}
                    </div>
                ):(
                    <h4>Nothing here, try another type</h4>
                )}    
                {this.state.beersByCountry ? (
                    <div>
                     {this.state.beersByCountry.map((item) => (
                        <div key={item.id}>
                        {((item.breweries[0].locations[0].countryIsoCode).includes(this.state.select.selectedCode)) ? (
                                <Link to={`/beer/${item.id}`}> 
                                <h5>{item.name}</h5>
                                </Link>
                            ):(
                                <p>not exists</p>
                            )}
                        </div>                 
                    ))}
                    </div>
                ) : (
                    <h4>Nothing here, try another country</h4>
                )}
                </div>
            </div>
        )
    }
}