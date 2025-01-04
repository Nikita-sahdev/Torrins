import React, { useState } from 'react';

const SongGenre = ({ songGeners, step, onSelectGenre, setSongGenreValue,songGenreValue  }) => {
    const [selectedGenres, setSelectedGenres] = useState(songGenreValue);

    // Function to handle genre selection
    const handleGenreSelection = (genre) => {
        setSelectedGenres(genre)
        setSongGenreValue(genre)

        setTimeout(() => {
            onSelectGenre(genre, step + 1)
        }, 300);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center middle-section">
            {songGeners?.length ? 
                <>
                    <h1>What genre of music are you most interested in playing?</h1>            
                    <div className="options-container container d-flex justify-content-center">
                        <div className="row">
                            {songGeners.map((gener) => (
                                <div className="col-lg-3 col-md-6 col-sm-6 my-3 sub-container text-center">
                                    <div className={`options d-flex justify-content-start align-items-center ${selectedGenres === gener.id ? 'options-active' : ''}`} onClick={() => handleGenreSelection(gener.id)}>
                                        <img src="/assets/img/Personalization/Vector.svg" alt="Icon" />
                                        <p>{gener.song_genre}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div> 
                </>
            : '' }
        </div>
    );
};

export default SongGenre;
