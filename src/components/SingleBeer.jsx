import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../styles/SingleBeer.scss';

import axios from 'axios';;


class SingleBeer extends Component {
    constructor(props) {
    super(props);
    this.state = {
        beer:[]
    }
    this.getSingleBeer=this.getSingleBeer.bind(this);
	}
    componentDidMount() {
        this.getSingleBeer();
    }
    getSingleBeer(){
        axios({
            method: "GET",
            url: `http://localhost:3000/beer/${this.props.match.params.id}/?withBreweries=Y&key=4a67a4e833fd9ccbd77588fbaa724c33`
        })
        .then(res => {
            this.setState({
                beer: res.data.data
            })
            console.log(this.state.beer);
        })
        .catch((err)=> {
            console.log( "Error")
        })
    }
    render () { 
        let beer=this.state.beer    
        if(beer) {
        return (
            <div>
                <div className="beer-img-details">
                    <h1>{beer.name}</h1>  
                    {beer.style ? (
                        <div>
                            <p><b>Style: </b>{beer.style.name}</p>
                            <p><b>Brewed by:</b>&nbsp;
                            <Link to={`/breweries/brewery/${beer.breweries[0].id}`}>{beer.breweries[0].name}</Link> in {beer.breweries[0].locations[0].country.displayName}</p>
                            <div className="abv-ibu">
                                <p><b>ABV:</b> {beer.abv}%</p>
                                <p><b>IBU:</b> {beer.style.ibuMin} - {beer.style.ibuMax}</p>  
                            </div>         
                        </div>
                    ):(
                        <h2>Loading...</h2>
                    )}
                    <div className="beer-img">
                        {beer.labels ? (      
                            <img src={beer.labels.medium} alt="beer-label"/>
                        ) : (
                            <p></p>
                        )}  
                    </div> 
                </div>
                <div className="beer-description">
                    {beer.style ? (
                            <p>{beer.style.description}</p>
                    ):(
                        <p></p>
                    )}
                </div>
            </div>
        )
        } else {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        )
        }
    }
}
export default SingleBeer