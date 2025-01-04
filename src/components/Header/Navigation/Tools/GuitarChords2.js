import React from 'react'
import GuitarChord from 'react-guitar-chord'

const GuitarChords2 = () => {
  return (
    <div style={{marginTop: '83px' }}>
        <GuitarChord chord={'C'} />
        <GuitarChord chord={'C'} quality={'MIN'} />
    </div>
  )
}

export default GuitarChords2
