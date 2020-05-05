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
                <div className="beer-img-details">
                    <div className="beer-img">
                        {beer.labels ? (      
                            <img src={beer.labels.medium} alt="beer-label"/>
                        ) : (
                            <p></p>
                        )}  
                    </div> 
                    <div className="beer-details">
                        <h1>{beer.name}</h1>  
                            {beer.style ? (
                                <div>
                                    <p><b>Style: </b>{beer.style.shortName}</p>
                                    <p><b>Brewed by:</b>&nbsp;
                                    <Link to={`/breweries/brewery/${beer.breweries[0].id}`}>{beer.breweries[0].name}</Link> </p>
                                    <p><b>ABV:</b> {beer.abv}%</p>
                                    <p><b>IBU:</b> {beer.style.ibuMin} - {beer.style.ibuMax}</p>           
                            </div>
                            ):(
                                <h2>Loading...</h2>
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
        } else{
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }
    }
}

export default SingleBeer