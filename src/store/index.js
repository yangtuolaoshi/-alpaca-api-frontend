import {configureStore} from '@reduxjs/toolkit';

// 导入子模块Reducer
import userReducer from './modules/UserStore';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
