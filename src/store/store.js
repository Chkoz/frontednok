import { applyMiddleware, combineReducers, createStore,compose } from "redux";
import { authReducer } from "../reducers/authReducer";
import thunk from 'redux-thunk';
import { uiReducer } from "../reducers/uiReducer";
import { dataReducer } from "../reducers/dataReducers";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    auth: authReducer,
    ui:uiReducer,
    data:dataReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);