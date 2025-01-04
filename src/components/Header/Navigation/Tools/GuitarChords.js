import React from 'react'
import { Link } from 'react-router-dom'

const GuitarChords = () => {
    return (
        <div style={{marginTop:'69px'}}>
            <guitar-chords></guitar-chords>
            <Link to ='/chords'>guitar chords2</Link>
        </div>
    )
}

export default GuitarChords
