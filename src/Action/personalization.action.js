import { personalizationService } from "../Adapters/personalization.service";
import { toast } from "react-toastify";
import { personalizationConst } from '../Constants/Personalization';
import CustomErrorToast from "../components/CustomToaster/CustomErrorToast";
import CustomSuccessToast from "../components/CustomToaster/CustomSuccessToaster";


export const personalizationAction = {
    fetchPersonalization,
    savePersonalization
}
 
async function fetchPersonalization(params, headers) {
    let url = new URL(`${process.env.REACT_APP_API_URL}/api/personalization`);
    for (let key in params) {
        url.searchParams.append(key, params[key]);
    }
    
    return await personalizationService
    .fetchPersonalization(url.href, headers)
}

async function savePersonalization(params, headers) {
    return (dispatch) => {
        dispatch(request());
        personalizationService
        .savePersonalization('/api/user-personalization', params, headers)
        .then((response) => {
            setTimeout(() => {
                dispatch(success(response.data));
            }, 4000);

            setTimeout(() => {
                if (response?.status === 200) {
                    toast(<CustomSuccessToast message={response?.data?.message} />)
                } else {
                    toast(<CustomErrorToast message={response?.data?.message} />)
                }
            }, 6000);
        })
        .catch((error) => {
            dispatch(failure(error));
        });
    };
  
    function request() {
        return { type: personalizationConst.SAVE_PERSONALIZATION_PENDING };
    }
  
    function success(data) {
        return { type: personalizationConst.SAVE_PERSONALIZATION_SUCCESS, payload: data };
    }
  
    function failure(error) {
        return { type: personalizationConst.SAVE_PERSONALIZATION_FAILURE, error: error };
    }
}

