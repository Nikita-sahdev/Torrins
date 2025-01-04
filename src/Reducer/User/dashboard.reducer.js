import { dashboardConstant } from '../../Constants/User/Dashboard';

const initialState = { 
    loading: false,
    historyLoading: false,
    courseLoading: false,
    streakLoading: false,
    totalSongs : 0,
    error: {},
    songPagination : {},
    activeCourseTab: '',
    userAchievements:{},
    recommendedSongs:[],
    lessonHistory:[],
    loadMoreData: [],
    viewMoreHistory: [],
    userActivity: [],
    learningPath: [],
    viewMoreCourses: [],
    totalCourse: 0,
    coursePagination: {}, 
    historyLoadMoreData:[],
    personalisedData:[],
    recentCourse:{}
};

export const dashboardReducer = (state = initialState, action) => {
    switch(action.type) {
        case dashboardConstant.GET_RECOMMENDED_SONGS_PENDING:
            return {
                ...state,
                loading: true,
                recommendedSongs:[]
            };
            
        case dashboardConstant.GET_RECOMMENDED_SONGS_SUCCESS:
            let updatedLoadMoreData = [...state.loadMoreData];
            // Filerting data to avoid duplicacy entry...
            const newSongs = action.payload.songs.filter(song => {
                return !updatedLoadMoreData.some(existingSong => existingSong.id === song.id);
            });
            
            // Append new songs to loadMoreData
            updatedLoadMoreData = updatedLoadMoreData.concat(newSongs);

            return {
                ...state,
                loading: false,
                recommendedSongs: action.payload.songs ?? [],
                totalSongs: action.payload.total ?? 0,
                songPagination: action.payload.pagination ?? {},
                loadMoreData: updatedLoadMoreData
            };

        case dashboardConstant.GET_RECOMMENDED_SONGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                recommendedSongs:{},
                loadMoreData:[],
            };

        case 'UPDATE_LOADMORE_STATE':
            return { 
                ...state,
                loadMoreData: [],
                viewMoreHistory: [],
                viewMoreCourses: []
            };

        case 'UPDATE_COURSE_TAB_STATE':
            return { 
                ...state,
                activeCourseTab: action.payload,
                viewMoreHistory: []
            };
        
        case dashboardConstant.GET_LESSON_HISTORY_PENDING:
            return {
                ...state,
                historyLoading: true,
                lessonHistory:[]
            };
            
        case dashboardConstant.GET_LESSON_HISTORY_SUCCESS:
            let updatedHistoryLoadMoreData = [...state.viewMoreHistory];
            
            // Filerting data to avoid duplicacy entry...
            const newLessons = action.payload.lessons.filter(lesson => {
                return !updatedHistoryLoadMoreData.some(existingSong => existingSong.id === lesson.id);
            });
            updatedHistoryLoadMoreData = updatedHistoryLoadMoreData.concat(newLessons);
          
            return {
                ...state,
                historyLoading: false,
                lessonHistory: action.payload ?? [],
                viewMoreHistory:updatedHistoryLoadMoreData
            };

        case dashboardConstant.GET_LESSON_HISTORY_FAILURE:
            return {
                ...state,
                historyLoading: false,
                error: action.error,
                viewMoreHistory:[],
            };
        
            case dashboardConstant.GET_USER_ACTIVITY_PENDING:
                return {
                    ...state,
                    streakLoading: true,
                };
                
            case dashboardConstant.GET_USER_ACTIVITY_SUCCESS:
                return {
                    ...state,
                    streakLoading: false,
                    userActivity: action.payload,
                };
    
            case dashboardConstant.GET_USER_ACTIVITY_FAILURE:
                return {
                    ...state,
                    streakLoading: false,
                    error: action.error
                };
        
            case dashboardConstant.GET_LEARNING_PATH_PENDING:
                return {
                    ...state,
                    courseLoading: true
                };
                
            case dashboardConstant.GET_LEARNING_PATH_SUCCESS:
                let courses = [...state.viewMoreCourses];
                // Filerting data to avoid duplicacy entry...
                const courseData = action.payload.courseData.filter(course => {
                    return !courses.some(existingCourse => existingCourse.id === course.id);
                });
                
                // Append new songs to loadMoreData
                courses = courses.concat(courseData);
                return {
                    ...state,
                    courseLoading: false,
                    learningPath: action.payload.courseData,
                    viewMoreCourses: courses,
                    totalCourse: action.payload.total,
                    coursePagination: action.payload.pagination
                };
    
            case dashboardConstant.GET_LEARNING_PATH_FAILURE:
                return {
                    ...state,
                    courseLoading: false,
                    error: action.error
                };

            case dashboardConstant.GET_USER_ACHIEVEMENTS_PENDING:
                return {
                    ...state,
                    userLoading: true,
                };
                
            case dashboardConstant.GET_USER_ACHIEVEMENTS_SUCCESS:
                return {
                    ...state,
                    userLoading: false,
                    userAchievements: action.payload,
                };
    
            case dashboardConstant.GET_USER_ACHIEVEMENTS_FAILURE:
                return {
                    ...state,
                    userLoading: false,
                    error: action.error
                };

            case dashboardConstant.GET_DELETE_PERSONALISED_PENDING: {
                return {
                    ...state,
                    loading: true
                }
            }
    
            case dashboardConstant.GET_DELETE_PERSONALISED_SUCCESS:
                const updatedPersonalised = state.viewMoreCourses.filter(
                    (note) => note.user_personalisation !== action.payload
                );
    
                return {
                    ...state,
                    loading: false,
                    viewMoreCourses: updatedPersonalised,
                    learningPath: action.payload.courseData,
                };
                
            case dashboardConstant.GET_DELETE_PERSONALISED_FAILURE: {
                return {
                    ...state,
                    loading: false
                }
            }

            case dashboardConstant.GET_RECENT_COURSE_PENDING:
                return {
                    ...state,
                    historyLoading: true,
                    recentCourse:{}
                };
                
            case dashboardConstant.GET_RECENT_COURSE_SUCCESS:
                return {
                    ...state,
                    historyLoading: false,
                    recentCourse: action.payload ?? {},
                };
    
            case dashboardConstant.GET_RECENT_COURSE_FAILURE:
                return {
                    ...state,
                    historyLoading: false,
                    error: action.error,
                };
            

        default:
            return state;
    }
}