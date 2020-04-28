import React from 'react'
import '../styles/Home.scss'

export default function Home() {
    return (
        <div className="homepage">
            <div className="home-buttons">
                <button>Breweries per country</button>
                <button>Find a beer</button>
            </div>
            <div className="results">
                <h1>Result:</h1>
            </div>
        </div>
    )
}