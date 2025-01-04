import { dashboardService } from "../../Adapters/User/dashboard.service";
import { dashboardConstant } from '../../Constants/User/Dashboard';
import { toast } from "react-toastify";
import CustomSuccessToast from "../../components/CustomToaster/CustomSuccessToaster";
import CustomErrorToast from "../../components/CustomToaster/CustomErrorToast";

export const dashboardAction = {
    fetchRecommendedSongs,
    lessonHistory,
    userActivity,
    learningPath,
    userAchivements,
    deletePersonalisation,
    recentCourse
}
 
async function fetchRecommendedSongs(params, headers) {
    let url = new URL(`${process.env.REACT_APP_API_URL}/api/recommended-songs`);
    for (let key in params) {
        url.searchParams.append(key, params[key]);
    }
    
    return (dispatch) => {
        dispatch(request());
        dashboardService
        .fetchRecommendedSongs(url.href, headers)
        .then((response) => {
            const data = { songs: response.data?.data?.songs ?? [], total: response.data?.data?.total ?? 0, pagination: response.data?.pagination }
            
            dispatch(success(data));
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: dashboardConstant.GET_RECOMMENDED_SONGS_PENDING };
    }
  
    function success(data) {
        return { type: dashboardConstant.GET_RECOMMENDED_SONGS_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: dashboardConstant.GET_RECOMMENDED_SONGS_FAILURE, error: error };
    }
}

async function lessonHistory(params, headers) {
    let url = new URL(`${process.env.REACT_APP_API_URL}/api/lesson-history`);
    for (let key in params) {
        url.searchParams.append(key, params[key]);
    }
    
    return (dispatch) => {
        dispatch(request());
        dashboardService
        .lessonHistory(url.href, headers)
        .then((response) => {
            dispatch(success(response?.data));
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: dashboardConstant.GET_LESSON_HISTORY_PENDING };
    }
  
    function success(data) {
        return { type: dashboardConstant.GET_LESSON_HISTORY_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: dashboardConstant.GET_LESSON_HISTORY_FAILURE, error: error };
    }
}

async function userActivity(params, headers) {
    let url = new URL(`${process.env.REACT_APP_API_URL}/api/user-activity`);
    for (let key in params) {
        url.searchParams.append(key, params[key]);
    }
    
    return (dispatch) => {
        dispatch(request());
        dashboardService
        .userActivity(url.href, headers)
        .then((response) => {
            dispatch(success(response?.data?.all_login_records));
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: dashboardConstant.GET_USER_ACTIVITY_PENDING };
    }
  
    function success(data) {
        return { type: dashboardConstant.GET_USER_ACTIVITY_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: dashboardConstant.GET_USER_ACTIVITY_FAILURE, error: error };
    }
}

async function learningPath(params, headers) {
    let url = new URL(`${process.env.REACT_APP_API_URL}/api/get-personalization`);
    for (let key in params) {
        url.searchParams.append(key, params[key]);
    }
    
    return (dispatch) => {
        dispatch(request());
        dashboardService
        .learningPath(url.href, headers)
        .then((response) => {
            const data = { courseData: response.data?.data ?? [], total: response.data?.pagination?.total ?? 0, pagination: response.data?.pagination }
            dispatch(success(data));
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: dashboardConstant.GET_LEARNING_PATH_PENDING };
    }
  
    function success(data) {
        return { type: dashboardConstant.GET_LEARNING_PATH_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: dashboardConstant.GET_LEARNING_PATH_FAILURE, error: error };
    }
}

async function userAchivements(params, headers) {
    let url = new URL(`${process.env.REACT_APP_API_URL}/api/get-user-achievements?seen=1`);
    for (let key in params) {
        url.searchParams.append(key, params[key]);
    }
    
    return (dispatch) => {
        dispatch(request());
        dashboardService
        .userActivity(url.href, headers)
        .then((response) => {
            dispatch(success(response?.data?.data));
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: dashboardConstant.GET_USER_ACHIEVEMENTS_PENDING };
    }
  
    function success(data) {
        return { type: dashboardConstant.GET_USER_ACHIEVEMENTS_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: dashboardConstant.GET_USER_ACHIEVEMENTS_FAILURE, error: error };
    }
}

function deletePersonalisation(id, headers) {
    return (dispatch) => {
        dispatch(request());
        dashboardService
        .userActivity(`/api/delete-personalization/${id}`, headers)
        .then((response) => {
            dispatch(success(id));
            toast(<CustomSuccessToast message={response?.data?.message} />);
        })
        .catch((error) => {
            console.log(error)
            dispatch(errorDeletePersonalisation(error));
            toast(<CustomErrorToast message={error?.data?.message} />);
        });
    };
  
    function errorDeletePersonalisation(error) {
        return { type: dashboardConstant.GET_DELETE_PERSONALISED_FAILURE, error: error };
    }
  
    function request() {
        return { type: dashboardConstant.GET_DELETE_PERSONALISED_PENDING };
    }
  
    function success(data) {
        return { type: dashboardConstant.GET_DELETE_PERSONALISED_SUCCESS, payload: data };
    }
}

async function recentCourse(params, headers) {
    let url = new URL(`${process.env.REACT_APP_API_URL}/api/get-recent-course`);
    for (let key in params) {
        url.searchParams.append(key, params[key]);
    }
    
    return (dispatch) => {
        dispatch(request());
        dashboardService
        .fetchRecommendedSongs(url.href, headers)
        .then((response) => {
            dispatch(success(response?.data?.data));
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: dashboardConstant.GET_RECENT_COURSE_PENDING };
    }
  
    function success(data) {
        return { type: dashboardConstant.GET_RECENT_COURSE_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: dashboardConstant.GET_RECENT_COURSE_FAILURE, error: error };
    }
}
