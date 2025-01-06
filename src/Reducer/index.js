import { combineReducers } from "redux";
import { personalizationReducer } from "./personalization.reducer";
import { homepageReducer } from "./homepage.reducer";


export const menuReducer = ( state = { activeMenu: {} }, action ) => {
   switch(action.type) {
      case 'SET_ACTIVE_MENU': 
         return {
            activeMenu: action.payload
      }
     break;
     
     default:
            return state;
            break;
   }

}

const rootReducer=combineReducers({
   personalization:personalizationReducer,
   homepage:homepageReducer,
  
})

export default rootReducer;