import { createSlice, current } from "@reduxjs/toolkit";

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
  isEdit: false,
  isUpdate: true,
};

const quanLySinhVienReducer = createSlice({
  name: "quanLySinhVienReducer",
  initialState,
  reducers: {
    changeInfo: (state, action) => {
      state.svEdit[action.payload.id] = action.payload.value;
    },
    changeInfoErrors: (state, action) => {
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
      state.isEdit = true;
      state.svEdit = action.payload;
    },
    updateSV: (state, action) => {
      state.isUpdate = false;
      const { id, value } = action.payload;
      const index = state.arrSV.findIndex((sv) => sv.maSV === id);
      if (index !== -1) {
        state.arrSV[index] = { ...state.arrSV[index], ...value };
      }
      // Reset giá trị của svEdit về rỗng
      state.svEdit = {
        maSV: "",
        tenSV: "",
        sDT: "",
        email: "",
      };
    },
    searchSV: (state, action) => {
      const searchValue = action.payload;
      if (searchValue.trim() !== "") {
        state.arrSV = state.arrSV.filter((sv) => sv.maSV.includes(searchValue));
      } else {
        state.arrSV = initialState.arrSV;
      }
    },
  },
});

export const {
  changeInfo,
  changeInfoErrors,
  themSinhVien,
  delSinhVien,
  editSV,
  updateSV,
  searchSV,
} = quanLySinhVienReducer.actions;

export default quanLySinhVienReducer.reducer;
