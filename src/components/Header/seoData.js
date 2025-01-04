// urlParser.js
export function getH1Content(pathname) {

    switch (pathname) {
        case '/':
            return "Learn Guitar, Piano, and Bass Online at Your Own Pace";
        case '/about-us':
            return "Know about Us";
        case '/guitar-lessons':
            return "Online Guitar Lessons";
        case '/bass-lessons':
            return "Online Bass Guitar Lessons";
        case '/piano-lessons':
            return "Online Piano Lessons";
        case '/guitar-lessons/song-lessons-656':
            return "Guitar Song Lessons";
        case '/bass-lessons/song-lessons-5118':
            return "Bass Guitar Song Lessons";
        case '/piano-lessons/song-lessons-11043':
            return "Piano Song Lessons";
        case '/instructors':
            return "Learn from Our Instructors";
        case '/membership':
            return "Torrins Membership Plans";
        case '/free-bass-lessons':
            return "Best Free Online Bass Lessons";
        case '/free-guitar-lessons':
            return "Best Free Online Guitar Lessons";
        case '/free-piano-lessons':
            return "Best Free Online Piano Lessons";
        case '/battle-of-bands':
            return "Battle of the Bands 2024 | India’s Largest Music Fest for School Students | Torrins";
        case '/battle-of-bands/fanpage':
            return "Explore School Bands Competing in Battle of the Bands Contest | Torrins";
        case '/giftCards':
            return "Gift the Joy of Music with Torrins Gift Cards";
        case '/404':
            return "404";
        default:
            return null;
    }
}

