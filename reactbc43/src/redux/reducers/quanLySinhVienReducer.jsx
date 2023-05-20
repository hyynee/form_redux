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
      state.arrSVUpdate.push(action.payload);
      state.svEdit = {
        maSV: "",
        tenSV: "",
        sDT: "",
        email: "",
      };
    },
    delSinhVien: (state, action) => {
      const maSV = action.payload;
      state.arrSV = state.arrSV.filter((sv) => sv.maSV !== maSV);
      state.arrSVUpdate = state.arrSVUpdate.filter((sv) => sv.maSV !== maSV);
    },
    editSV: (state, action) => {
      state.isEdit = true;
      state.svEdit = action.payload;
      state.errors = {
        maSV: "",
        tenSV: "",
        sDT: "",
        email: "",
      };
    },
    updateSV: (state, action) => {
      state.isEdit = false;
      const { id, value } = action.payload;
      const index = state.arrSVUpdate.findIndex((sv) => sv.maSV === id);
      if (index !== -1) {
        // Thực hiện kiểm tra hợp lệ
        for (let key in value) {
          if (value[key].trim() === "") {
            return;
          }
        }
        state.arrSVUpdate[index] = { ...state.arrSVUpdate[index], ...value };
      }
      state.arrSV = state.arrSVUpdate.slice(); // Sao chép nội dung từ arrSVUpdate vào arrSV
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
  changeInfo,
  changeInfoErrors,
  themSinhVien,
  delSinhVien,
  editSV,
  updateSV,
  searchSV,
} = quanLySinhVienReducer.actions;

export default quanLySinhVienReducer.reducer;
