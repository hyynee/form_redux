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
  arrSVUpdate: [
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
  userSV: {
    maSV: "",
    tenSV: "",
    sDT: "",
    email: "",
  },
  errors: {
    maSV: "(*)",
    tenSV: "(*)",
    sDT: "(*)",
    email: "(*)",
  },
  isEdit: false,
};

const qlsvReducer = createSlice({
  name: "qlsvReducer",
  initialState,
  reducers: {
    changeInfoErrors: (state, action) => {
      state.errors[action.payload.id] = action.payload.value;
    },
    addSVAction: (state, action) => {
      const sV = { ...action.payload };
      state.arrSV.push(sV);
      state.arrSVUpdate.push(action.payload);
    },
    delSinhVien: (state, action) => {
      const maSV = action.payload;
      state.arrSV = state.arrSV.filter((sv) => sv.maSV !== maSV);
      state.arrSVUpdate = state.arrSVUpdate.filter((sv) => sv.maSV !== maSV);
    },
    editSV: (state, action) => {
      state.isEdit = true;
      state.userSV = { ...action.payload };
    },
    updateSV: (state, action) => {
      const { id, value } = action.payload;
      state.userSV[id] = value;
      const index = state.arrSV.findIndex((sv) => sv.maSV === id);
      if (index !== -1) {
        for (let key in value) {
          if (value[key].trim() === "") {
            return;
          }
        }
        state.arrSVUpdate[index] = { ...state.arrSVUpdate[index], ...value };
      }
      state.arrSV = JSON.parse(JSON.stringify(state.arrSVUpdate));
      // Đặt lại giá trị của svEdit về rỗng
      state.svEdit = {
        maSV: "",
        tenSV: "",
        sDT: "",
        email: "",
      };
    },
    searchSV: (state, action) => {
      const searchValue = action.payload;
      if (searchValue === "") {
        state.arrSV = state.arrSVUpdate.slice();
      } else {
        state.arrSV = state.arrSVUpdate.filter((sv) =>
          sv.maSV.includes(searchValue)
        );
      }
    },
  },
});

export const {
  addSVAction,
  delSinhVien,
  editSV,
  updateSV,
  changeInfo,
  changeInfoErrors,
  searchSV,
} = qlsvReducer.actions;

export default qlsvReducer.reducer;
