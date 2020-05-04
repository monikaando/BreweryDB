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
            url: `http://localhost:3000/beer/${this.props.match.params.id}/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb`
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
                <h1>{beer.name}</h1>
                {beer.labels ? (
                    <div>
                        <img src={beer.labels.medium} alt="beer-label"/>
                    </div>
                ) : (
                    <p></p>
                )}      
                    {beer.style ? (
                        <div>
                            <p>Style: {beer.style.shortName}</p>
                            <p>Brewed by: </p>
                            <Link to={`/breweries/brewery/${beer.breweries[0].id}`}>{beer.breweries[0].name}</Link>
                            <div>
                                <Link to="" title="Alcohol By Volume" className="tooltip">ABV: {beer.abv}%</Link>
                            </div>
                            <div>
                                <Link to="" title="International Bittering Unit" className="tooltip">IBU: {beer.style.ibuMin} - {beer.style.ibuMax}</Link>
                            </div>
                            <p>Description: {beer.style.description}</p>
                        </div>
                    ):(
                        <p></p>
                    )}
            </div>
        )
        } else{
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    }
}

export default SingleBeer