import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';;


class SingleBrewery extends Component {
    	constructor(props) {
		super(props);
		this.state = {
			brewery: [],
            beers:[]
		}
        this.getSingleBrewery=this.getSingleBrewery.bind(this);
        this.getAllBeers=this.getAllBeers.bind(this);

	}
    componentDidMount() {
        this.getSingleBrewery();
    }
    getSingleBrewery(){
        axios({
            method: "GET",
            url: `http://localhost:3000/brewery/${this.props.match.params.id}/?key=659d5c6b8f3d2447f090119e48202fdb`
        })
        .then(res => {
            this.setState({
                brewery: res.data.data
            })
            this.getAllBeers();
            console.log(this.state.brewery);
        })
        .catch((err)=> {
                console.log( "Error")
        })
    }
    getAllBeers(){
        axios({
            method: "GET",
            url: `http://localhost:3000/brewery/${this.props.match.params.id}/beers/?key=659d5c6b8f3d2447f090119e48202fdb`
        })
        .then(res => {
            this.setState({
                beers: res.data.data
            })
            console.log(this.state.beers)
        })
        .catch((err)=> {
                console.log( "Error")
        })
    }

    render () {
        let Beers;
        if(this.state.beers.length === 0) {
            Beers=<h4>Loading...</h4>
        } 
        else if(this.state.beers.length === 1){
            Beers=<h4>The brewery produces {this.state.beers.length} beer: </h4>
        } 
        else{
            Beers=<h4>The brewery produces {this.state.beers.length} beers: </h4>
        }
                           
        let brew = this.state.brewery         
        if(brew && this.state.beers) {
        return (
            <div>
                <div>
                    <h1>{brew.name}</h1>
                    {brew.images ? (
                        <div>
                            <img src={brew.images.squareMedium} alt="brewery-logo" />
                        </div>
                    ) : (
                        <p></p>   
                    )}
                    {brew.established ? (
                        <p>Established: {brew.established}</p>
                    ) : (
                        <p></p>
                    )}
                    
                    <a href={brew.website} rel="noopener noreferrer" target="_blank">
                        <p>{brew.website}</p>
                    </a>
                    <p>{brew.description}</p>
                </div>
                <div>
                    {Beers}
                    {this.state.beers.map((item)=>(
                        <div key={item.id}>
                       <Link to={`/beer/${item.id}`}> <h4>{item.name}</h4></Link>
                    </div>
                    ))}
                </div>

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

export default SingleBrewery