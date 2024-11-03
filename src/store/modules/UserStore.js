import {createSlice} from '@reduxjs/toolkit';

// 定义一个store用来存储一个状态，并且提供增删改的方法
const coladminStore = createSlice({
    // 模块名称
    name: 'coladmin',
    // 初始值
    initialState: {
        id: null,
        username: null,
        token: null,
    },
    // 对状态的操作
    reducers: {
        setColadmin(state, action) {
            state.token = action.payload;
        },
        removeColadmin(state) {
            state.id = null;
            state.username = null;
        },
    },
});

// 解构出actionCreator函数
const {setColadmin, removeColadmin} = coladminStore.actions;

// 获取reducer
const reducer = coladminStore.reducer;

// 导出解构出actionCreator函数和reducer
export {setColadmin, removeColadmin};
export default reducer;
