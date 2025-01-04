import { personalizationConst } from '../Constants/Personalization';

const initialState = {
    loading: false,
    requestLoading: false,
    streakLoading: false,
    saveSuccess: false,
    showPersonalization: false,
    error: {},
    activeCourseTab: '',
    activeInstrument: '',
    activeInstrumentPoster: '',
    previousStep: 1,
    previousStepData: [],
    personalizationData: [],
    personalizationSteps: {}
};

export const personalizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case personalizationConst.GET_PERSONALIZATION_PENDING:
            return {
                ...state,
                loading: true,
                // personalizationData: []
            };

        case personalizationConst.GET_PERSONALIZATION_SUCCESS:
            return {
                ...state,
                loading: false,
                personalizationData: action.payload,
            };

        case personalizationConst.GET_PERSONALIZATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                personalizationData: [],
            };

        case personalizationConst.SAVE_PERSONALIZATION_PENDING:
            return {
                ...state,
                requestLoading: true,
                saveSuccess: false,
                personalizationData: []
            };

        case personalizationConst.SAVE_PERSONALIZATION_SUCCESS:
            return {
                ...state,
                // requestLoading: false,
                saveSuccess: true,
                personalizationData: action.payload ?? [],
            };

        case personalizationConst.SAVE_PERSONALIZATION_FAILURE:
            return {
                ...state,
                requestLoading: false,
                saveSuccess: false,
                error: action.error,
                personalizationData: [],
            };

        case 'ACTIVE_INSTRUMENT':
            return {
                ...state,
                activeInstrument: action.payload.label,
                activeInstrumentPoster: action.payload.poster
            };

        case 'SET_PERSONALIZATION_STEPS':
            const { userToken, data } = action.payload;
            return {
                ...state,
                personalizationSteps: {
                    ...state.personalizationSteps,
                    [userToken]: data
                }
            };

        case 'REMOVE_PERSONALIZATION_STEPS':
            const newState = { ...state };
            delete newState.personalizationSteps[action.payload];
            return newState;

        case 'CHANGE_PERSONALIZATION_SAVE_STATE':
            return {
                ...state,
                saveSuccess: false,
                requestLoading: false
            };
        
        case 'CHANGE_PREVIOUS_STEP':
            return {
                ...state,
                previousStep: action.payload.step,
                previousStepData: action.payload?.data ?? state.previousStepData
            }
        case 'CHANGE_INITIAL_STATES':
            return {
                ...state,
                requestLoading: false,
            }
            
        case 'CHANGE_PERSONALIZATION_STATE':
            return {
                ...state,
                showPersonalization: action.payload,
                saveSuccess: false,
            }

        default:
            return state;
    }
}