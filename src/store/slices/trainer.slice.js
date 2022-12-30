import { createSlice } from "@reduxjs/toolkit";

const trainerSlice = createSlice({
    name: 'trainer',
    initialState: '',
    reducers: {

        //action.payload : captura lo que me manda el usuario por el input
        setTrainerGlobal: (state, action) => action.payload

    }
})

export const { setTrainerGlobal } = trainerSlice.actions

export default trainerSlice.reducer