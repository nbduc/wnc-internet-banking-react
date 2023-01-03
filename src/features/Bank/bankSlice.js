import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    bankList: []
}

const bankSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
        setBankList: (state, action) => {
            state.bankList = action.payload;
        }
    }
});

export const { setInternalBankId } = bankSlice.actions;
export default bankSlice.reducer;