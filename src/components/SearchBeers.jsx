import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../styles/SearchBeers.scss';
import axios from 'axios';

export default class SearchBeers extends Component {
    constructor (props){
    super(props)
    this.state = {
            select: {
                selectedCode:"" 
            },
        name:"", 
        type:"",
        // country:"",
        beersByName:[],
        beersByType:[],
        beersByCountry:[],//tu powinno wrzucic kraje ktore wyszukalo po "ISO"
        countryCode:[], //kod pobrany z ogolnego do listy
        page:1
}
    this.beerNameInputHandler = this.beerNameInputHandler.bind(this);
    this.getBeersByName = this.getBeersByName.bind(this);
    this.getAllBeersByName = this.getAllBeersByName.bind(this);
    this.beerTypeInputHandler = this.beerTypeInputHandler.bind(this);
    this.handleBeerCountryChange = this.handleBeerCountryChange.bind(this);
    this.getBeersByType = this.getBeersByType.bind(this);
    this.getBeersByCountry = this.getBeersByCountry.bind(this);
    this.getCountryCodeList=this.getCountryCodeList.bind(this);

    // this.increment = this.increment.bind(this);
}
componentDidMount() {
        this.getCountryCodeList();
}
beerNameInputHandler(e) {
    let inputValue = e.target.value;
    this.setState({
        name: inputValue.toLowerCase()
    }) 
}
beerTypeInputHandler(e){
    let input = e.target.value;
    this.setState({
        type: input.toLowerCase()
    }) 
}
handleBeerCountryChange(e){
        e.preventDefault();
        let updatedCountryCode = this.state.select;
        updatedCountryCode[e.target.name] = e.target.value;
        this.setState({
            select:updatedCountryCode
        })
        this.getBeersByCountry();
}

getBeersByName(){
        axios({
            method: "GET",
            url: `http://localhost:3000/search?key=659d5c6b8f3d2447f090119e48202fdb&p=${this.state.page}&type=beer&q=${this.state.name}`
        })
        .then(res => {
            this.setState({
                beersByName: res.data.data,
                // newpage: this.state.page + 1
           })
            console.log(this.state.beersByName[0])
            console.log(res.data.data.length)
            console.log(this.state.page)
            console.log(res.data.numberOfPages)
        })
        .catch((err)=> {
                console.log( "Error")
        })
    }
// increment(){
//     this.setState((prevState) => {
//     return {page: prevState.page + 1}
//   });
//   }
getAllBeersByName(){
    this.getBeersByName();

}
getBeersByType(){
        axios({
            method: "GET",
            url: `http://localhost:3000/search?key=659d5c6b8f3d2447f090119e48202fdb&&p=${this.state.page}&type=beer&q=${this.state.type}`
        })
        .then(res => {
            this.setState({
                beersByType: res.data.data
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
            console.log(this.state.select.selectedCode)
            console.log(this.state.beersByCountry)
        })
        .catch((err)=> {
                console.log( "Error")
        })
    }    
    render() {
        return (
            <div className="search-page">
                <h2>Search beers by name, type or country</h2>
                <div className="search-boxes">
                    <div>
                        <input type="text" name="beername" placeholder="search by name" value={this.state.name} onChange={this.beerNameInputHandler}/>
                        <button onClick={this.getAllBeersByName}>Search</button>
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

                </div>

                <div className="beers-box">
                    {this.state.beersByName.map((item) => (
                        <div key={item.id}>
                        {((item.name).toLowerCase()).includes(this.state.name) ?(
                            <Link to={`/beer/${item.id}`}> 
                            <h5>{item.name}</h5></Link>
                            ):(
                            <p>test</p>
                            )}
                        </div>
                    ))}
                    {this.state.beersByType.map((item) => (
                        <div key={item.id}>
                        {item.style ? (
                        <div>
                            {((item.style.name).toLowerCase()).includes(this.state.type) ? (
                                <Link to={`/beer/${item.id}`}> 
                                <h5>{item.name}</h5>
                                <h6 className="red">{item.style.name}</h6>
                                </Link>
                            ):(
                                <p>test</p>
                            )}
                        </div>
                        ):(
                            <h2>Loading...</h2>
                        )}
                        </div>
                    ))}
                     {this.state.beersByCountry.map((item) => (
                        <div key={item.id}>
                        {((item.breweries[0].locations[0].countryIsoCode).includes(this.state.select.selectedCode)) ? (
                                <Link to={`/beer/${item.id}`}> 
                                <h5>{item.name}</h5>
                                </Link>
                            ):(
                                <p>test</p>
                            )}
                        </div>                 
                    ))}
                </div>
            </div>
        )
    }
}