import {createSlice} from '@reduxjs/toolkit';

// 定义一个store用来存储一个状态，并且提供增删改的方法
const userStore = createSlice({
    // 模块名称
    name: 'user',
    // 初始值
    initialState: {
        id: null,
        role: null,
    },
    // 对状态的操作
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.role = action.payload.role;
        },
        removeUser(state) {
            state.id = null;
            state.username = null;
        },
    },
});

// 解构出actionCreator函数
const {setUser, removeUser} = userStore.actions;

// 获取reducer
const reducer = userStore.reducer;

// 导出解构出actionCreator函数和reducer
export {setUser, removeUser};
export default reducer;
