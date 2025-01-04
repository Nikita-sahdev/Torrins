import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

const Calendar = ({ date, setDate, activeDates, loading, handleExploreClick }) => {

    const today = moment();
    const currentDayOfMonth = today.date();
    const calendarRef = useRef(null); // Ref to the calendar section (mobile)
    const [isMobile, setIsMobile] = useState(false); // State to track if the screen is mobile

    useEffect(() => {
        renderCalendar();
        checkMobileView(); // Check mobile view on component mount

        // Resize listener to detect screen size change
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, [date]);

    const checkMobileView = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust the width to your mobile breakpoint
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const renderCalendar = () => {
        const start = date.clone().startOf('month').startOf('week');
        const end = date.clone().endOf('month').endOf('week');

        const days = [];
        let day = start.clone();

        while (day.isSameOrBefore(end, 'day')) {
            days.push(day.clone());
            day.add(1, 'day');
        }

        const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

        return (
            <>
                <div className="col-md-12 mb-4 d-none d-md-block">
                    <h5 className="d-flex align-items-center streak-head me-2 my-2 m-0 mt-4">
                        <img className="mx-2" src="./assets/img/streakIcon.svg" alt="streak" />
                        Streak calendar
                    </h5>
                    <div className="calendar">
                        <div className="header-calender">
                            <button id="prev" onClick={prevMonth}></button>
                            <h3>{months[date.month()]} {date.year()}</h3>
                            {date.month() !== moment().month() && <button id="next" onClick={nextMonth}></button>}
                        </div>

                        {loading ? (
                            <div style={{ padding: '25%' }}>
                                <div className="loader spinner-border m-5 d-table m-auto" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
                                <span className="m-5 d-table m-auto">Loading...</span>
                            </div>
                        ) : (
                            <section className="calendar-section">
                                <ul className="days">
                                    {daysOfWeek.map((dayOfWeek, idx) => <li key={idx}>{dayOfWeek}</li>)}
                                </ul>
                                <ul className="dates">
                                    {days.map((day, idx) => {
                                        const isActiveDate = activeDates.some(activeDate =>
                                            moment(activeDate.lastlogin).isSame(day, 'day')
                                        );

                                        const isCurrentMonth = day.isSame(date, 'month');
                                        const isToday = day.isSame(today, 'day');
                                        const isCurrentDay = day.date() === currentDayOfMonth;

                                        return (
                                            <li
                                            key={day.format('YYYY-MM-DD')}
                                            className={`${day.month() !== date.month() ? 'inactive' : ''} ${isActiveDate ? 'today' : ''} ${day.isSame(today, 'day') ? 'today' : ''}`}
                                        >
                                                {isCurrentMonth ? day.format('D') : ''}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>

                {/* Mobile version */}
                <div className="col-md-12 mb-4 d-md-none">
                    <div className="calendar">
                        {loading ? (
                            <div style={{ padding: '25%' }}>
                                <div className="loader spinner-border m-5 d-table m-auto" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
                                <span className="m-5 d-table m-auto">Loading...</span>
                            </div>
                        ) : (
                            <section className="calendar-section">
                                <div style={{ overflowX: 'auto' }}>
                                    <div className="days-container">
                                        <ul className="days" style={{ display: 'flex', gap: '5px', flexWrap: 'nowrap' }}>
                                            {days.map((day, index) => (
                                                <li
                                                    key={`day-${index}`}
                                                    style={{ minWidth: '50px', textAlign: 'center', fontSize: '14px' }}
                                                >
                                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][day.day()]}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="dates-container">
                                        <ul className="dates">
                                            {days.map((day) => {
                                                const isActiveDate = activeDates.some(activeDate =>
                                                    moment(activeDate.lastlogin).isSame(day, 'day')
                                                );
                                                const isCurrentMonth = day.isSame(date, 'month');
                                                const isAfter15th = day.date() > 10; // Check if the day is after the 15th
                                                return (
                                                    <li
                                                        key={day.format('YYYY-MM-DD')}
                                                        className={`date-item ${isCurrentMonth ? '' : 'inactive'} ${isActiveDate ? 'active' : ''} ${isAfter15th ? 'after-15' : ''}`}
                                                        ref={isToday(day) && isMobile ? scrollToCurrentDate : null} // Conditionally assign ref based on mobile
                                                    >
                                                        {isCurrentMonth ? day.format('D') : ''}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>

                                <div className="latest-releases">
                                    <div className='d-flex' style={{ height: '79px' }}>
                                        <p>Take a look at our latest releases</p>
                                        <div className="releases">
                                            <img src="/assets/img/DashboardBanner/Mask group.png" alt="Release 1" />
                                        </div>
                                    </div>
                                    <button className="explore-button" onClick={handleExploreClick}>Explore All</button>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </>
        );
    };

    // Function to check if the day is today's date
    const isToday = (day) => {
        return day.isSame(today, 'day');
    };
    
    // Ref function to scroll the current date into view (horizontally only)
    const scrollToCurrentDate = (el) => {
        if (el) {
            el.scrollIntoView({ 
                behavior: 'smooth', 
                inline: 'center', 
                block: 'nearest'  
            });
        }
    };


    const prevMonth = () => {
        setDate(prevDate => prevDate.clone().subtract(1, 'month'));
    };

    const nextMonth = () => {
        setDate(prevDate => prevDate.clone().add(1, 'month'));
    };

    return renderCalendar();
};

export default Calendar;
