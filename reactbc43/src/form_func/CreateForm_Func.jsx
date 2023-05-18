import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSVAction,
  changeInfoErrors,
  searchSV,
  updateSV,
  updateSVAction,
} from "../redux/reducers/qlsvReducer";
const CreateForm_Func = () => {
  const { arrSV, userSV, errors, isEdit } = useSelector(
    (state) => state.qlsvReducer
  );
  const dispatch = useDispatch();
  // console.log("mang SV ",arrSV);

  const handleValidation = (e) => {
    const dataType = e.target.getAttribute("data-type");
    const minLength = e.target.getAttribute("data-minlength");
    const maxLength = e.target.getAttribute("data-maxlength");
    const { value, id } = e.target;

    let newErrors = { ...errors };
    let errorMessage = "";

    if (value.trim() === "") {
      errorMessage = id + " không được bỏ trống !!!";
    } else {
      if (dataType) {
        switch (dataType) {
          case "number": {
            let regexNumber = /^-?\d*\.?\d+$/;
            if (!regexNumber.test(value)) {
              errorMessage = id + " phải là số !!!";
            }
            break;
          }
          case "string": {
            let regexString = /^[a-z A-Z0-9]+$/;
            if (!regexString.test(value)) {
              errorMessage = id + " không được chứa dấu và ký tự đặc biệt!!!";
            }
            break;
          }
          case "email": {
            let regexEmail =
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!regexEmail.test(value)) {
              errorMessage = id + " không hợp lệ !!!";
            }
            break;
          }
        }
      }
      if (minLength) {
        if (value.length < minLength) {
          errorMessage = id + " không được dưới " + minLength + " ký tự!!!";
        }
      }
      if (maxLength) {
        if (value.length > maxLength) {
          errorMessage = id + " không được hơn " + maxLength + " ký tự!!!";
        }
      }
      if (id === "maSV") {
        const maSVList = arrSV.map((sv) => sv.maSV);
        if (maSVList.includes(value)) {
          errorMessage = "Mã SV đã tồn tại!!!";
        }
      }
      if (id === "email") {
        const maSVList = arrSV.map((sv) => sv.email);
        if (maSVList.includes(value)) {
          errorMessage = "email đã tồn tại!!!";
        }
      }
    }
    newErrors[id] = errorMessage;
    const action = changeInfoErrors({ id, value: errorMessage });
    dispatch(action);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    for (let key in errors) {
      if (errors[key] !== "") {
        alert("data is not valid!!");
        return;
      }
    }
    const action = addSVAction(userSV);
    dispatch(action);
  };
  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    const action = updateSV({ id, value });
    dispatch(action);
    handleValidation(e);
  };
  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <div className="card-header bg-dark text-white">
          <h3>Thông tin sinh viên</h3>
          <div className="d-flex w-25" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                const action = searchSV(e.target.value);
                console.log(e.target.value);
                dispatch(action);
              }}
            />
            <button className="btn btn-outline-success" type="button">
              Search
            </button>
          </div>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="form-group col-6">
                <p>Mã sinh viên</p>
                <input
                  data-type="number"
                  data-maxlength="32"
                  type="number"
                  name="maSV"
                  id="maSV"
                  className="form-control"
                  onInput={handleChangeInput}
                  value={userSV.maSV}
                  disabled={isEdit}
                />
                <span className="text-danger fw-bold">{errors.maSV}</span>
              </div>
              <div className="form-group col-6">
                <p>Tên sinh viên</p>
                <input
                  data-type="string"
                  type="text"
                  name="tenSV"
                  id="tenSV"
                  className="form-control"
                  onInput={handleChangeInput}
                  value={userSV.tenSV}
                />
                <span className="text-danger fw-bold">{errors.tenSV}</span>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <p>Số điện thoại</p>
                <input
                  type="number"
                  data-type="number"
                  data-minlength="10"
                  data-maxlength="32"
                  name="sDT"
                  id="sDT"
                  className="form-control"
                  onInput={handleChangeInput}
                  value={userSV.sDT}
                />
                <span className="text-danger fw-bold"> {errors.sDT} </span>
              </div>
              <div className="form-group col-6">
                <p>Email</p>
                <input
                  data-type="email"
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  onInput={handleChangeInput}
                  value={userSV.email}
                />
                <span className="text-danger fw-bold"> {errors.email}</span>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-success">
            Thêm Sinh Viên
          </button>
          <button
            className="btn btn-primary mx-2"
            type="button"
            onClick={() => {
              const action = updateSV({ id: userSV.maSV, value: userSV });
              dispatch(action);
            }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm_Func;
