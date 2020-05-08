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
        page:1
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
}
componentDidMount() {
        this.getCountryCodeList();
}
beerNameInputHandler(e) {
    let inputValue = e.target.value;
    this.setState({
        name: inputValue.toLowerCase(),
    }) 
    this.clearSearch()
}
beerTypeInputHandler(e){
    let input = e.target.value;
    this.setState({
        type: input.toLowerCase()
    }) 
    this.clearSearch()
}
handleBeerCountryChange(e){
        e.preventDefault();
        let updatedCountryCode = this.state.select;
        updatedCountryCode[e.target.name] = e.target.value;
        this.setState({
            select:updatedCountryCode
        })
        this.getBeersByCountry();
        this.clearSearch()
}
getNextPage(){
    this.setState({
        page: this.state.page + 1
        })
    this.getBeersByName()
}
getAllBeersName(){
    this.getBeersByName()
    this.setState({
        page: this.state.page + 1
    })
}
getBeersByName(){
        axios({
            method: "GET",
            url: `http://localhost:3000/search?key=659d5c6b8f3d2447f090119e48202fdb&p=${this.state.page}&type=beer&q=${this.state.name}`
        })
        .then(res => {
            this.setState({
                beersByName: res.data.data,
           })
            console.log(this.state.beersByName[0])
            console.log(res.data.data.length)
            console.log(this.state.page)
        })
        .catch((err)=> {
                console.log( "Error")
        })
    }
getBeersByType(){
        axios({
            method: "GET",
            url: `http://localhost:3000/search?key=659d5c6b8f3d2447f090119e48202fdb&p=${this.state.page}&type=beer&q=${this.state.type}`
        })
        .then(res => {
            this.setState({
                beersByType: res.data.data,
                page: this.state.page + 1
            })
            console.log(this.state.beersByType)
            console.log(this.state.beersByType[0].style.name)
            console.log(this.state.type)

        })
        .catch((err)=> {
                console.log( "Error")
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
            console.log( "Error")
    })
}
getBeersByCountry(){
        axios({
            method: "GET",
            url: `http://localhost:3000/beers/?withBreweries=Y&p=${this.state.page}&key=659d5c6b8f3d2447f090119e48202fdb`
        })
        .then(res => {
            this.setState({
                beersByCountry: res.data.data
            })
            this.removeDuplicates()
            console.log(this.state.select.selectedCode)
            console.log(this.state.beersByCountry)
        })
        .catch((err)=> {
                console.log( "Error")
        })
    }   
clearSearch(){
    this.setState({
        beersByName:[],
        beersByType:[],
        beersByCountry:[]
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
                <div className="search-boxes">
                    <div>
                        <input type="text" name="beername" placeholder="search by name" value={this.state.name} onChange={this.beerNameInputHandler}/>
                        <button onClick={this.getAllBeersName}>Search</button>
                    </div>
                    <div>
                        <input type="text" name="beertype" placeholder="search by type" value={this.state.type} onChange={this.beerTypeInputHandler}/>
                        <button onClick={this.getBeersByType}>Search</button>
                    </div>                  
                  <div className="select">
                    <select
                        aria-label="country-code" 
                        name="selectedCode" 
                        value={this.state.select.selectedCode.toString()} 
                        onChange={this.handleBeerCountryChange}
                        >
                        <option value="" defaultValue>All countries</option>
                        {this.state.countryCode.map(item => (
                        <option name="selectedCode" key={item} value={item}>
                            {item}
                        </option>
                        ))}
                    </select>
                  </div>
                  <button onClick={this.getNextPage}>Next page</button>
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
                                <p>not exist</p>
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
                            {((item.style.name).toLowerCase()).includes(this.state.type) ? (
                                <Link to={`/beer/${item.id}`}> 
                                <h5>{item.name}</h5>
                                </Link>
                            ):(
                                <p>not exist</p>
                            )}
                        </div>
                        ):(
                            <p>Loading...</p>
                        )}
                        </div>
                    ))}
                    </div>
                ):(
                    <div>
                        <h4>Nothing here, try another type</h4>

                    </div>
                )}    
                     {this.state.beersByCountry.map((item) => (
                        <div key={item.id}>
                        {((item.breweries[0].locations[0].countryIsoCode).includes(this.state.select.selectedCode)) ? (
                                <Link to={`/beer/${item.id}`}> 
                                <h5>{item.name}</h5>
                                </Link>
                            ):(
                                <p>not exist</p>
                            )}
                        </div>                 
                    ))}
                </div>
            </div>
        )
    }
}