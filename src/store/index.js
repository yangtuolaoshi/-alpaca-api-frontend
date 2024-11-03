import {configureStore} from '@reduxjs/toolkit';

// 导入子模块Reducer
import coladminReducer from './modules/ColadminStore';

const store = configureStore({
    reducer: {
        coladmin: coladminReducer,
    },
});

export default store;
