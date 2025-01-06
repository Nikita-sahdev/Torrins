import { homepageConst } from '../Constants/Homepage';

const initialState = {
    homepageLoading: false,
    error: {},
    activeUsersCount: 0,
    lessonsCount: 0,
    songsCount: 0,
    courses: [],
    recentLessonSongsData: [],
    recentCourseData: [],
    allCounts:[],
};

export const homepageReducer = (state = initialState, action) => {
    switch (action.type) {
        case homepageConst.GET_HOMEPAGE_PENDING:
            return {
                ...state,
                homepageLoading: true,
            };

        case homepageConst.GET_HOMEPAGE_SUCCESS:
            return {
                ...state,
                homepageLoading: false,
                activeUsersCount: action.payload?.activeUsersCount,
                lessonsCount: action.payload?.lessonsCount,
                songsCount: action.payload?.songsCount,
                allCounts:action?.payload
            };

        case homepageConst.GET_HOMEPAGE_FAILURE:
            return {
                ...state,
                homepageLoading: false,
                error: action.error,
                activeUsersCount: 0,
                allCounts:[]

            };

        case homepageConst.GET_COURSES_LINKS_PENDING:
            return {
                ...state,
                homepageLoading: true,
            };

        case homepageConst.GET_COURSES_LINKS_SUCCESS:
            return {
                ...state,
                homepageLoading: false,
                courses: action.payload,
            };

        case homepageConst.GET_COURSES_LINKS_FAILURE:
            return {
                ...state,
                homepageLoading: false,
                error: action.error,
                courses: 0,
            };

        case 'CHANGE_PERSONALIZATION_STATE':
            return {
                ...state,
            }


        case homepageConst.GET_RECENT_LESSONS_PENDING:
            return {
                ...state,
                homepageLoading: true,
            };

        case homepageConst.GET_RECENT_LESSONS_SUCCESS:
            return {
                ...state,
                homepageLoading: false,
                recentLessonSongsData: action.payload
            };

        case homepageConst.GET_RECENT_LESSONS_FAILURE:
            return {
                ...state,
                homepageLoading: false,
                error: action.error,
            };

        case homepageConst.GET_RECENT_COURSE_LESSONS_PENDING:
            return {
                ...state,
                recentCourseData:[]
            };

        case homepageConst.GET_RECENT_COURSE_LESSONS_SUCCESS:
            return {
                ...state,
                recentCourseData: action.payload
            };

        case homepageConst.GET_RECENT__COURSE_LESSONS_FAILURE:
            return {
                ...state,
                recentCourseData:[],
                error: action.error,
            };
        
        default:
            return state;
    }
}