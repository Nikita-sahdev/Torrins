import { homepageService } from "../Adapters/homepage.service";
import { toast } from "react-toastify";
import { homepageConst } from '../Constants/Homepage';


export const homepageAction = {
    fetchHomepageData,
    fetchAllCourses,
    getRecentLessonsSongs,
    getRecentLessons,
}

async function fetchHomepageData(params, headers) {
    return (dispatch) => {
        dispatch(request());
        homepageService
        .fetchHomepageData('/api/home-page', params, headers)
        .then((response) => {
            dispatch(success(response.data?.data));
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: homepageConst.GET_HOMEPAGE_PENDING };
    }
  
    function success(data) {
        return { type: homepageConst.GET_HOMEPAGE_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: homepageConst.GET_HOMEPAGE_FAILURE, error: error };
    }
}

async function fetchAllCourses(params, headers) {
    return (dispatch) => {
        dispatch(request());
        homepageService
        .fetchAllCourses('/api/all-courses', params, headers)
        .then((response) => {
            dispatch(success(response.data?.data));
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: homepageConst.GET_COURSES_LINKS_PENDING };
    }
  
    function success(data) {
        return { type: homepageConst.GET_COURSES_LINKS_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: homepageConst.GET_COURSES_LINKS_FAILURE, error: error };
    }
}


async function getRecentLessonsSongs(params, headers) {
    return (dispatch) => {
        dispatch(request());
        homepageService
        .fetchHomepageData('/api/recent-lessons-songs?filter[recent]=1&type=song', params, headers)
        .then((response) => {
            dispatch(success(response.data?.data));
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: homepageConst.GET_RECENT_LESSONS_PENDING };
    }
  
    function success(data) {
        return { type: homepageConst.GET_RECENT_LESSONS_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: homepageConst.GET_RECENT_LESSONS_FAILURE, error: error };
    }
}

async function getRecentLessons(params, headers) {
    return (dispatch) => {
        dispatch(request());
        homepageService
        .fetchHomepageData('/api/recent-lessons-songs?filter[recent]=1&type=lesson', params, headers)
        .then((response) => {
            dispatch(success(response.data?.data));
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: homepageConst.GET_RECENT_COURSE_LESSONS_PENDING };
    }
  
    function success(data) {
        return { type: homepageConst.GET_RECENT_COURSE_LESSONS_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: homepageConst.GET_RECENT__COURSE_LESSONS_FAILURE, error: error };
    }
}

