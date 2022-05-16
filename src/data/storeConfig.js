import { createStore, combineReducers } from 'redux';

import projectListReducer from './reducers/ProjectReducer';
import todoListReducer from './reducers/TodoReducer';


const reducers = combineReducers({
    todos: todoListReducer,
    projects: projectListReducer
});

function storeConfig() {
    return createStore(reducers);
}

export default storeConfig;