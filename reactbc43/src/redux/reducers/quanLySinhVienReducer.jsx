import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrSV: [
    {
      maSV: "10",
      tenSV: "Nguyen Anh Huy",
      sDT: "0346674072",
      email: "nguyenanhhuy2004@gmail.com",
    },
    {
      maSV: "20",
      tenSV: "Tran Khanh Huyen",
      sDT: "0345870266",
      email: "trankhanhhuyen2003@gmail.com",
    },
    {
      maSV: "30",
      tenSV: "Bui Mai Huong",
      sDT: "0347825098",
      email: "buimaihuong@gmail.com",
    },
    {
      maSV: "40",
      tenSV: "Nguyen Thuy Trang",
      sDT: "0349078094",
      email: "nguyenthuytrang@gmail.com",
    },
  ],
  errors: {
    maSV: "(*)",
    tenSV: "(*)",
    sDT: "(*)",
    email: "(*)",
  },
  svEdit: {
    maSV: "",
    tenSV: "",
    sDT: "",
    email: "",
  },
};

const quanLySinhVienReducer = createSlice({
  name: "quanLySinhVienReducer",
  initialState,
  reducers: {
    changeInfo: (state, action) => {
      state.svEdit[action.payload.id] = action.payload.value;
    },
    changeInfoErrors: (state,action) => {
      state.errors[action.payload.id] = action.payload.value;
    },
    themSinhVien: (state, action) => {
      state.arrSV.push(action.payload);
    },
    delSinhVien: (state, action) => {
      let maSV = action.payload;
      let indexDel = state.arrSV.findIndex((sv) => sv.maSV === maSV);
      if (indexDel !== -1) {
        state.arrSV.splice(indexDel, 1);
      }
    },
    editSV: (state, action) => {
      state.svEdit = action.payload;
    },
    updateSV: (state, action) => {},
    searchSV: (state,action) => {
      state.arrSV.filter((sv) => sv.maSV === action.payload.maSV);
    },
  },

});

export const { changeInfo,changeInfoErrors, themSinhVien, delSinhVien, editSV , searchSV} =
  quanLySinhVienReducer.actions;

export default quanLySinhVienReducer.reducer;
