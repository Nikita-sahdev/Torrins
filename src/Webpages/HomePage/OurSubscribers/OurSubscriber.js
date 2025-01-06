import React from 'react'
import './OurSubscriber.scss'

const OurSubscriber = () => {

  const data = [
    {
      img: '/assets/img/HomeNew/img1.svg',
      text: 'Get feedback by expert instructors on your playing'
    },
    {
      img: '/assets/img/HomeNew/img2.svg',
      text: 'Video lessons shot from multiple angles '
    },
    {
      img: '/assets/img/HomeNew/img3.svg',
      text: 'Learn from the best instructors in the industry'
    },
    {
      img: '/assets/img/HomeNew/img4.svg',
      text: 'Get a personalised course as per your learning goals'
    },
  ]

  return (
    <div className='our-subscriber'>
      <h3>Why our subscribers choose us</h3>
      <div className='contents-container'>
        {data?.map((item, index) => (
          <div key={index} className='sub-container'>
            <img loading="lazy"src={item.img} alt='' />
            <p>{item?.text}</p>
          </div>
        ))

        }

      </div>
    </div>
  )
}

export default OurSubscriber