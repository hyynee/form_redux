import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeInfo,
  changeInfoErrors,
  editSV,
  searchSV,
  themSinhVien,
  updateSV,
} from "../reducers/quanLySinhVienReducer";

class CreateForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    for (let key in this.props.errors) {
      if (this.props.errors[key] !== "") {
        alert("data is not valid!!");
        return;
      }
    }
    const action = themSinhVien(this.props.svEdit);
    this.props.dispatch(action);
  };
  handleValidation = (e) => {
    const dataType = e.target.getAttribute("data-type");
    const minLength = e.target.getAttribute("data-minlength");
    const maxLength = e.target.getAttribute("data-maxlength");
    const { value, id } = e.target;

    let newErrors = { ...this.props.errors };
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
        let { arrSV } = this.props;
        const maSVList = arrSV.map((sv) => sv.maSV);
        if (maSVList.includes(value)) {
          errorMessage = "Mã SV đã tồn tại!!!";
        }
      }
      if (id === "email") {
        let { arrSV } = this.props;
        const maSVList = arrSV.map((sv) => sv.email);
        if (maSVList.includes(value)) {
          errorMessage = "email đã tồn tại!!!";
        }
      }
    }

    newErrors[id] = errorMessage;
    const action = changeInfoErrors({ id, value: errorMessage });
    // const action = changeInfo({ id: e.target.id, value: e.target.value });
    this.props.dispatch(action);
    // this.setState({
    //   errors: newErrors,
    // });
  };
  changeInput = (e) => {
    const action = changeInfo({ id: e.target.id, value: e.target.value });
    this.props.dispatch(action);
    this.handleValidation(e);
  };
  render() {
    // anh sửa lại
    let svEdit = this.props.svEdit;
    // console.log(svEdit);
    return (
      <div className="container">
        <form className="card" onSubmit={this.handleSubmit}>
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
                  this.props.dispatch(action);
                }}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={() => {}}
              >
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
                    onInput={this.changeInput}
                    value={svEdit.maSV}
                    disabled={this.props.isEdit && this.props.isUpdate}
                  />
                  <span className="text-danger fw-bold">
                    {this.props.errors.maSV}
                  </span>
                </div>
                <div className="form-group col-6">
                  <p>Tên sinh viên</p>
                  <input
                    data-type="string"
                    type="text"
                    name="tenSV"
                    id="tenSV"
                    className="form-control"
                    onInput={this.changeInput}
                    value={svEdit.tenSV}
                  />
                  <span className="text-danger fw-bold">
                    {this.props.errors.tenSV}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <p>Số điện thoại</p>
                  <input
                    data-type="number"
                    data-minlength="10"
                    data-maxlength="10"
                    type="number"
                    name="sDT"
                    id="sDT"
                    className="form-control"
                    onInput={this.changeInput}
                    value={svEdit.sDT}
                  />
                  <span className="text-danger fw-bold">
                    {" "}
                    {this.props.errors.sDT}
                  </span>
                </div>
                <div className="form-group col-6">
                  <p>Email</p>
                  <input
                    data-type="email"
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    onInput={this.changeInput}
                    value={svEdit.email}
                  />
                  <span className="text-danger fw-bold">
                    {" "}
                    {this.props.errors.email}
                  </span>
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
                const action = updateSV({ id: svEdit.maSV, value: svEdit });
                this.props.dispatch(action);
              }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
  // can thiệp sau render
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.svEdit.maSV !== this.props.svEdit.maSV) {
  //     this.setState({
  //       values: this.props.svEdit,
  //     });
  //   }
  // }
}
const mapStateToProps = (state) => ({
  arrSV: state.quanLySinhVienReducer.arrSV,
  svEdit: state.quanLySinhVienReducer.svEdit,
  errors: state.quanLySinhVienReducer.errors,
  isEdit: state.quanLySinhVienReducer.isEdit,
  updateSV: state.quanLySinhVienReducer.updateSV,
  isUpdate: state.quanLySinhVienReducer.isUpdate,
});

export default connect(mapStateToProps)(CreateForm);
