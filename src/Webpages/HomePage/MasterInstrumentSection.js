import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MasterInstrumentSection = memo(() => {

    const navigate =useNavigate()

    const handlePrevious = () => {
        document.getElementById('previous')?.click()
    }

    const handleNext = () => {
        document.getElementById('next')?.click()
    }

    const handleNavigate=(link)=>{
        if(link?.length > 0){
            navigate(link)
        }
    }

    const instruments = [
        {
            name: "Guitar",
            img: "/assets/img/HomeNew/Guitar.svg",
            link:"/guitar-lessons",
        },
        {
            name: "Piano",
            img: "/assets/img/HomeNew/Piano.svg",
            link:"/piano-lessons",


        },
        {
            name: "Bass",
            img: "/assets/img/HomeNew/Bass.svg",
            link:"/bass-lessons",

        },
        {
            name: "Drums",
            img: "/assets/img/HomeNew/Drums.svg",
            link:"",

        }
    ];


    return (
        <div className="instructor-slider-head">
            <h6 className="text">Master your favorite instrument with us</h6>
            <div className='instruments-containers'>
                {instruments?.map((item , index)=>(
                    <div key={index} className='d-flex flex-column gap-3'  >
                        <img loading="lazy"className='instru-img' src={item?.img} alt='' loading='lazy' style={{cursor:'pointer'}} onClick={()=>(handleNavigate(item?.link))} />
                        <span style={{cursor:'pointer'}} onClick={()=>(handleNavigate(item?.link))}>{item?.name}</span>
                    </div>
                ))

                }

            </div>

        </div>
    );
})

export default MasterInstrumentSection;




