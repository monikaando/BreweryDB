import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';;


class SingleBeer extends Component {
    	constructor(props) {
		super(props);
		this.state = {
            beer:[],
            brewery:[]
		}
        this.getSingleBeer=this.getSingleBeer.bind(this);
        this.getAllBeers=this.getAllBeers.bind(this);

	}
    componentDidMount() {
        this.getSingleBeer();
    }
      getSingleBeer(){
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
            Beers=<h4>The brewery does not produce beers yet.</h4>
        } 
        else if(this.state.beers.length === 1){
            Beers=<h4>The brewery produces {this.state.beers.length} beer: </h4>
        } 
        else{
            Beers=<h4>The brewery produces {this.state.beers.length} beers: </h4>
        }
                           
                 
        if(this.state.brewery && this.state.beers) {
        return (
            <div>
                <div>
                    <h1>{this.state.brewery.name}</h1>
                    {this.state.brewery.images ? (
                        <div>
                            <img src={this.state.brewery.images.squareMedium} alt="brewery-logo" />
                        </div>
                    ) : (
                        <p></p>   
                    )}
                    <p>Established: {this.state.brewery.established}</p>
                    <a href={this.state.brewery.website} rel="noopener noreferrer" target="_blank">
                        <p>{this.state.brewery.website}</p>
                    </a>
                    <p>{this.state.brewery.description}</p>
                </div>
                <div>
                    {Beers}
                    {this.state.beers.map((item)=>(
                        <div key={item.id}>
                       <Link to={`beer/${item.id}`}> <h4>{item.name}</h4></Link>
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

export default SingleBeer