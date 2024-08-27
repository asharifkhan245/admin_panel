import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
            const user = response.data.data;
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);




export const registerEmployee = createAsyncThunk(
    'user/registerEmployee',

    async (data, {rejectWithValue}) =>{

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/add-employee', data);
            const user =  response.data.data;
            return user;
            
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
)


export const deleteEmployee = createAsyncThunk(
    'user/deleteEmployee',

    async (id , {rejectWithValue}) =>{
        try {
            const  response =  await axios.post(`http://127.0.0.1:8000/api/delete-employe/${id}`);
            if(response){
                return response;
            }
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }

    }
)


export const getEmployees = createAsyncThunk(
    'user/getEmployees', 
    async ({rejectWithValue}) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get-employees`);
            if(response){
                return response;
            }
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
            
        }
    }
)

export const editEmployee = createAsyncThunk(
    'user/editEmployee',
    async (id, {rejectWithValue}) => {
        try {
            
            const response  = axios.post(`http://127.0.0.1:8000/api/edit-product/${id}`);
            if(response){
                return response
            }
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
            
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: null,
        user: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action.error.message);
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = "Access denied! Invalid credentials.";
                } else {
                    state.error = action.payload || action.error.message;
                }
            }).addCase(registerEmployee.pending,(state)=>{
                state.loading = true;
                state.user = null;
                state.error = null;
            }).addCase(registerEmployee.fulfilled, (state, action)=>{
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            }).addCase(registerEmployee.rejected, (state,action)=>{

                state.loading = null;
                state.user = null;
                console.log(action.error.message);
                if(action.error.message === 'Request failed with status code 401'){
                    state.error = "Something went wrong";
                }else{
                    state.error = action.payload || action.error.message;
                }
            }).addCase(deleteEmployee.pending, (state)=>{
                state.loading = true;
                state.user = false;
                state.error =  false;
            }).addCase(deleteEmployee.fulfilled, (state, action) =>{

                state.loading = false;
                state.user = action.payload;
                state.error = null;
            }).addCase(deleteEmployee.rejected, (state, action)=>{
                state.loading = false;
                state.user = null;
                console.log(action.error.message);
                if(action.error.message === 'Request failed with status code 401'){
                    state.error = "Something went wrong";
                }else{
                    state.error = action.payload || action.error.message;
                }
            }).addCase(getEmployees.pending, (state)=>{
                state.loading = true;
                state.data = null;
                state.error = false;
            }).addCase(getEmployees.fulfilled, (state,action)=>{
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            }).addCase(getEmployees.rejected, (state,action)=>{
                state.loading = false;
                state.data = null;

                console.log(action.error.message)
                if(action.error.message === "No employee found"){
                    state.error = "No employes found";
                }else{
                    state.error = action.payload || action.error.message;

                }
            }).addCase(editEmployee.pending, (state, action) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            }).addCase(editEmployee.fulfilled, (state,action) => {
                state.loading = false ;
                state.user = action.payload;
                state.error = null;
            }).addCase(editEmployee.rejected, (state,action) => {
                state.loading = false;
                state.user = null;
                console.log(action.error.message)
                if(action.error.message === 'Id not found'){
                    state.error = "id not found";
                }else{
                    state.error = action.payload || action.error.message;

                }
            })
    },
});

export default userSlice.reducer;
