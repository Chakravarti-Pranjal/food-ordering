import {createSlice} from "@reduxjs/toolkit"


const mapSlice = createSlice({
    name: "map",
    initialState: {
        location : {
            lat : null,
            lon : null
        },
        currentAddress: null
    },
    reducers: {
        setLocation: (state, action) => {
            const {lat, lon} = action.payload;
            state.location.lat = lat;
            state.location.lon = lon
        },
        setCurrentAddress: (state, action) => {
            state.currentAddress = action.payload;
        }
    }
})

export const { setLocation, setCurrentAddress } = mapSlice.actions;
export default mapSlice.reducer;