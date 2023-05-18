import React from "react";
//
import { useDispatch, useSelector } from "react-redux";
import { delSinhVien, editSV } from "../redux/reducers/qlsvReducer";
const Form_Func = () => {
  const { arrSV, isEdit } = useSelector((state) => state.qlsvReducer);
  // console.log("mang SV ",arrSV);

  const dispatch = useDispatch();
  return (
    <div className="container" style={{ paddingTop: 100 }}>
      <table className="table">
        <thead className="bg-dark text-white fw-bold">
          <tr>
            <th>Mã SV</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrSV.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.maSV}</td>
                <td>{item.tenSV}</td>
                <td>{item.sDT}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      const action = delSinhVien(item.maSV);
                      dispatch(action);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary mx-4"
                    onClick={() => {
                     dispatch(editSV(item));
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Form_Func;
