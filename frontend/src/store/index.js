//Redux is like central data store which is available to whole application
//All data will be store in this file

import {configureStore, createSlice} from '@reduxjs/toolkit'    //toolkit allow us to create slices of redux state

const authSlice = createSlice({                
    name:'auth',
    initialState:{isLoggedIn:false},
    reducers:{                                //reducers functions will be there login and logout   
        login(state){                         //both this function will have access to state of redux 
            state.isLoggedIn = true
        },
        logout(state){
            localStorage.removeItem("userId")
            state.isLoggedIn = false
        }
    }
})



//we have to also call action creators
//login(state), logout(state) this all are action creators

export const authActions = authSlice.actions;


//export the store ....so we have to export all the reducers function of the store
export const store = configureStore({      //configure the store it will have property of reducer
    reducer:authSlice.reducer
})