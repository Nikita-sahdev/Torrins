import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lessonSongs } from '../../Action/lessonSongs.actions';
import RecentSearch from './RecentSearch';
import OtherResult from './OtherResult';
import { Link } from 'react-router-dom';
import throttle from 'lodash/throttle';
import Select from 'react-select';
import { components } from 'react-select';
import debounce from 'lodash/debounce';
import { Modal } from 'react-bootstrap';
import useWindowDimensions from '../../Helpers/useWindowDimensions';

const Search = (props) => {
    const { windowWidth } = useWindowDimensions();
    const dispatch = useDispatch();
    const popupRef = useRef(null);
    const inputRef = useRef(null);


    const instruments = useSelector((state) => state.member.instruments);
    const authState = useSelector((state) => state.auth);
    const token = authState?.userDetails?.hash;
    const SocialToken = authState?.userDetails?.token;
    const [activeTab, setActiveTab] = useState('Courses');
    const relatedLoading = useSelector((state) => state.lesson.relatedLoading);
    const otherSearchLoading = useSelector((state) => state.lesson.otherSearchLoading);
    const recentLoading = useSelector((state) => state.lesson.recentLoading);
    const activeInstruments = authState?.userProfile?.user_data?.active_instruments;
    const [selectedInstrument, setSelectedInstrument] = useState('guitar');
    const loadMoreSearchData = useSelector((state) => state.lesson.loadMoreSearchData);
    const [loading, setLoading] = useState(false);

    const handleTabClick = (tabName) => {

        dispatch({ type: 'SET_RECENT_SEARCH_VALUE' });
        props?.setPage(0);
        setActiveTab(tabName);
        const requestData = {
            instrument: selectedInstrument,
            type: tabName === 'Courses' ? 'lesson' : 'song',
            string: props?.recentValue
        };
        dispatch(lessonSongs.getSearch(requestData, { Token: token || SocialToken }));
        dispatch(lessonSongs.getOtherData({
            instrument: selectedInstrument,
            type: tabName === 'Courses' ? 'song' : 'lesson',
            string: props?.recentValue
        }, { Token: token || SocialToken }));
    };

    useEffect(() => {

        if (props?.showModal && inputRef.current) {
            inputRef.current.focus();
        }

    }, [props?.showModal, inputRef.current]);

    const handleInstrumentChange = (event) => {
        dispatch({ type: 'SET_RECENT_SEARCH_VALUE' });
        props?.setPage(0);
        setSelectedInstrument(event?.value);
        const requestData = {
            instrument: event?.value,
            type: activeTab === 'Courses' ? 'lesson' : 'song',
            string: props?.recentValue
        };
        dispatch(lessonSongs.getSearch(requestData, { Token: token || SocialToken }));
        dispatch(lessonSongs.getOtherData({
            instrument: event?.value,
            type: activeTab === 'Courses' ? 'song' : 'lesson',
            string: props?.recentValue
        }, { Token: token || SocialToken }));
    };

   
    
    // Create a debounced function for the API call
    const prevInputLengthRef = useRef(0);

    const debouncedSearch = useCallback(
        
        debounce((searchText) => {        
            setLoading(true)    
            if (searchText?.length > 2) {
                const requestData = {
                    instrument: selectedInstrument,
                    type: activeTab === 'Courses' ? 'lesson' : 'song',
                    string: searchText,
                };
                
                dispatch(lessonSongs.getSearch(requestData, { Token: token || SocialToken }));
                setTimeout(() => {
                    dispatch(lessonSongs.getOtherData({
                        instrument: selectedInstrument,
                        type: activeTab === 'Courses' ? 'song' : 'lesson',
                        string: searchText,
                    }, { Token: token || SocialToken }));
                }, 100);
               
            }
        }, 400),
        [selectedInstrument, activeTab, token, SocialToken, dispatch]
    );

    const handleInputChange = useCallback(
        (e) => {
            const searchText = e.target.value;
    
            // Trigger the debounced search whenever the input value changes
            debouncedSearch(searchText);
    
            // Reset loading state after triggering search
            setLoading(false);
    
            // Update the previous input length with the current length
            prevInputLengthRef.current = searchText.length;
    
            // Update the recent value prop
            props?.setRecentValue(searchText);
            
            // Dispatch action to update recent search value
            dispatch({ type: 'SET_RECENT_SEARCH_VALUE' });
        },
        [debouncedSearch, props, dispatch]
    );
    

    const handleIconClick = useCallback(() => {
        if (props?.recentValue?.length > 2) {
            const requestData = {
                instrument: selectedInstrument,
                type: activeTab === 'Courses' ? 'lesson' : 'song',
                string: props?.recentValue,
            };
            dispatch(lessonSongs.getSearch(requestData, { Token: token || SocialToken }));
            setTimeout(() => {
                dispatch(lessonSongs.getOtherData({
                    instrument: selectedInstrument,
                    type: activeTab === 'Courses' ? 'song' : 'lesson',
                    string: props?.recentValue,
                }, { Token: token || SocialToken }));
            }, 100);
        }
    }, [props?.recentValue, selectedInstrument, activeTab, token, SocialToken]);

    const handleRecentClick = (clickedValue) => {
        props?.setRecentValue(clickedValue?.lesson?.title);
    };

    const handleSearchResult = (matchingData) => {
        const requestData = {
            string: props?.recentValue,
            lesson: matchingData?.id
        };
        props?.closePersonalisation()
        dispatch(lessonSongs.savedSearches(requestData, { Token: token || SocialToken }));
    };

    const matchedInstrument = instruments?.instrument_details?.find((instrument) => {
        const instrumentId = instrument.lesson_id;
        const allMatch = activeInstruments?.every((activeId) => activeId === instrumentId);
        const anyMatch = activeInstruments?.some((activeId) => activeId === instrumentId);
        return allMatch || anyMatch;
    });

    useEffect(() => {

        if (matchedInstrument?.label) {
            setSelectedInstrument(matchedInstrument?.label);
        }else{
            setSelectedInstrument('guitar');
        }
    }, [matchedInstrument , windowWidth]);

    const getInstrumentImage = (selectedInstrument) => {
        switch (selectedInstrument?.toLowerCase()) {
            case "guitar":
                return "/assets/img/Navigations/guitar.svg";
            case "piano":
                return "/assets/img/Navigations/piano.svg";
            case "bass":
                return "/assets/img/Navigations/bass.svg";
            default:
                return "";
        }
    };

    const options = instruments?.instrument_details?.filter((instrument) => instrument?.has_lessons === 1)
        .map((instrument) => ({
            value: instrument.label,
            label: (
                <div className='inst-contents' style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={getInstrumentImage(instrument.label)}
                        alt={instrument.label}
                        style={{ width: '20px', height: '20px', marginRight: '8px', transform: 'none' }}
                    />
                    <span>{instrument?.label}</span>
                </div>
            ),
        }));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                props?.handleClose();
            }
        };


        if (props?.showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }


        return () => {
            document.removeEventListener('mousedown', handleClickOutside);

        };
    }, [props?.showModal]);

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <img src='/assets/img/Navigations/yellow-drop.svg' alt="dropdown icon" style={{ width: '12px', height: '12px' }} />
            </components.DropdownIndicator>
        );
    };

    useEffect(() => {
        if (props?.showModal) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }

    }, [props?.showModal])



    return (
        <>
            {windowWidth >= 880 ?
                <div className="dropdown-content4" style={{ display: props?.showModal ? "block" : 'none' }} ref={popupRef}>
                    <div className="content">
                        <p className="mb-2">What are you looking for?</p>
                        <div className="search-box">
                            <Select
                                className="custom-selects"
                                value={options?.find(option => option?.value.toLowerCase() == (selectedInstrument?.toLocaleLowerCase() || 'guitar'))}
                                onChange={handleInstrumentChange}
                                options={options}
                                components={{ DropdownIndicator }}
                                isSearchable={false}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        marginLeft: '0px',
                                        boxShadow: 'none',
                                        border: 'none',
                                        background: 'none'
                                    }),
                                    container: (provided) => ({
                                        ...provided,
                                        width: '160px',
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isSelected ? '#ffc444' : base.backgroundColor,
                                    }),
                                    indicatorSeparator: (base) => ({
                                        display: 'none',
                                        padding: '0px'
                                    }),
                                    valueContainer: (base) => ({
                                        ...base,
                                        padding: ' 3px 0px 3px 8px',
                                    }),
                                    singleValue: (base) => ({
                                        ...base,
                                    }),
                                    indicatorsContainer: (base) => ({
                                        ...base,
                                        padding: '0px',
                                    }),
                                    dropdownIndicator: (base) => ({
                                        ...base,
                                        padding: '0px 8px 0px 0px',
                                        margin: '0px',
                                    }),
                                }}
                            />
                            <input type="text" ref={inputRef} placeholder="Search here" value={props?.recentValue} onChange={handleInputChange} />
                            <img
                                onClick={handleIconClick}
                                className="search-icon-input"
                                src="/assets/img/Navigations/Vector.svg"
                                alt=""
                            />
                        </div>

                        <ul className="tab-list">
                            <li
                                className={activeTab === 'Courses' ? 'active' : ''}
                                onClick={(!relatedLoading && !otherSearchLoading) ? () => handleTabClick('Courses') : undefined}
                                style={{ cursor: (relatedLoading || otherSearchLoading) ? 'not-allowed' : 'pointer' }}
                            >
                                Courses
                            </li>
                            <li
                                className={activeTab === 'Song Lessons & Chord Sheets' ? 'active' : ''}
                                onClick={(!relatedLoading && !otherSearchLoading) ? () => handleTabClick('Song Lessons & Chord Sheets') : undefined}
                                style={{ cursor: (relatedLoading || otherSearchLoading) ? 'not-allowed' : 'pointer' }}
                            >
                                Songs and Chord Sheet
                            </li>
                        </ul>

                        {(recentLoading) || (relatedLoading && !loadMoreSearchData.length) ?
                            <div>
                                <div
                                    className="loader spinner-border m-5 d-table m-auto"
                                    role="status"
                                >
                                    <span className="visually-hidden"></span>
                                </div>
                                <span className=" m-5 d-table m-auto">Loading...</span>
                            </div>
                            :
                            <RecentSearch loading={loading} handleClose={props?.handleClose} relatedLoading={relatedLoading} setPage={props?.setPage} page={props?.page} selectedInstrument={selectedInstrument} activeTab={activeTab} handleRecentClick={handleRecentClick} recentValue={props?.recentValue} handleSearchResult={handleSearchResult} />
                        }
                        {props?.recentValue.length >= 2 && activeTab === 'Courses' ?
                            <OtherResult handleClose={props?.handleClose} closePersonalisation={props?.closePersonalisation} />
                            : ''}
                    </div>
                </div>
                :
                <Modal
                    show={props?.showModal}
                    onHide={props?.handleClose}
                    start
                    size="md"
                    className="homepageMainDiv HeaderFooterHomepageDiv search-mob"
                    style={{ boxShadow: 'none', padding: '0px !important' }}

                >
                    <Modal.Body className='messg drop4' style={{ padding: '0px' }}>
                        <div className="dropdown-content4" style={{ display: props?.showModal ? "block" : 'none' }} ref={popupRef}>
                            <div className="content">
                                <p className="mb-2">What are you looking for?</p>
                                <div className="search-box">
                                    <Select
                                        className="custom-selects"
                                        id="select-mobile"
                                        value={options?.find(option => option?.value.toLowerCase() === (selectedInstrument?.toLowerCase() || 'guitar'))}
                                        onChange={handleInstrumentChange}
                                        options={options}
                                        components={{ DropdownIndicator }}
                                        isSearchable={false}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                marginLeft: '0px',
                                                boxShadow: 'none',
                                                border: 'none',
                                                background: 'none'
                                            }),
                                            container: (provided) => ({
                                                ...provided,
                                                width: '160px',
                                            }),

                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isSelected ? '#ffc444' : base.backgroundColor,
                                                overflow: 'visible'
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                overflow: 'visible',
                                            }),
                                            indicatorSeparator: (base) => ({
                                                display: 'none',
                                                padding: '0px'
                                            }),
                                            valueContainer: (base) => ({
                                                ...base,
                                                padding: ' 3px 0px 3px 8px',
                                            }),
                                            singleValue: (base) => ({
                                                ...base,
                                            }),
                                            indicatorsContainer: (base) => ({
                                                ...base,
                                                padding: '0px',
                                            }),
                                            dropdownIndicator: (base) => ({
                                                ...base,
                                                padding: '0px 8px 0px 0px',
                                                margin: '0px',
                                            }),
                                        }}
                                    />
                                    <input type="text" ref={inputRef} placeholder="Search here" value={props?.recentValue} onChange={handleInputChange} />
                                    <img
                                        onClick={handleIconClick}
                                        className="search-icon-input"
                                        src="/assets/img/Navigations/Vector.svg"
                                        alt=""
                                    />
                                </div>

                                <ul className="tab-list">
                                    <li
                                        className={activeTab === 'Courses' ? 'active' : ''}
                                        onClick={(!relatedLoading && !otherSearchLoading) ? () => handleTabClick('Courses') : undefined}
                                        style={{ cursor: (relatedLoading || otherSearchLoading) ? 'not-allowed' : 'pointer' }}
                                    >
                                        Courses
                                    </li>
                                    <li
                                        className={activeTab === 'Song Lessons & Chord Sheets' ? 'active' : ''}
                                        onClick={(!relatedLoading && !otherSearchLoading) ? () => handleTabClick('Song Lessons & Chord Sheets') : undefined}
                                        style={{ cursor: (relatedLoading || otherSearchLoading) ? 'not-allowed' : 'pointer' }}
                                    >
                                        Songs and Chord Sheet
                                    </li>
                                </ul>

                                {(recentLoading) || (relatedLoading && !loadMoreSearchData.length) ?
                                    <div>
                                        <div
                                            className="loader spinner-border m-5 d-table m-auto"
                                            role="status"
                                        >
                                            <span className="visually-hidden"></span>
                                        </div>
                                        <span className=" m-5 d-table m-auto">Loading...</span>
                                    </div>
                                    :
                                    <RecentSearch loading={loading} handleClose={props?.handleClose} relatedLoading={relatedLoading} setPage={props?.setPage} page={props?.page} selectedInstrument={selectedInstrument} activeTab={activeTab} handleRecentClick={handleRecentClick} recentValue={props?.recentValue} handleSearchResult={handleSearchResult} />
                                }
                                {props?.recentValue.length >= 2 && activeTab === 'Courses' ?
                                    <OtherResult />
                                    : ''}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }</>

    );
}

export default Search;