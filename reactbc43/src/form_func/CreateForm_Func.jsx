import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSVAction,
  changeInfoErrors,
  searchSV,
  updateSV,
  updateSVAction,
} from "../redux/reducers/qlsvReducer";
import { useFormik } from "formik";
import * as Yup from "yup";
const CreateForm_Func = () => {
  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      maSV: "",
      tenSV: "",
      sDT: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      maSV: Yup.number().required().min(4),
      tenSV: Yup.string().required().max(15),
      sDT: Yup.number().required().min(10),
      email: Yup.string().required().email(),
    }),
    onSubmit: (values) => {
      const action = addSVAction(values);
      dispatch(action);
    },
  });

  const { arrSV, userSV, isEdit } = useSelector((state) => state.qlsvReducer);
  useEffect(() => {
    const { setValues } = form;
    setValues({ ...userSV });
    console.log(form.values);
  }, [userSV]);
  return (
    <div className="container">
      <form
        className="card"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
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
                  type="number"
                  name="maSV"
                  id="maSV"
                  className="form-control"
                  onChange={form.handleChange}
                  disabled={isEdit}
                  value={form.values.maSV}
                />
                <span className="text-danger fw-bold">{form.errors.maSV}</span>
              </div>
              <div className="form-group col-6">
                <p>Tên sinh viên</p>
                <input
                  type="text"
                  name="tenSV"
                  id="tenSV"
                  className="form-control"
                  onChange={form.handleChange}
                  value={form.values.tenSV}
                />
                <span className="text-danger fw-bold">{form.errors.tenSV}</span>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <p>Số điện thoại</p>
                <input
                  type="number"
                  name="sDT"
                  id="sDT"
                  className="form-control"
                  onChange={form.handleChange}
                  value={form.values.sDT}
                />
                <span className="text-danger fw-bold"> {form.errors.sDT} </span>
              </div>
              <div className="form-group col-6">
                <p>Email</p>
                <input
                  data-type="email"
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  onChange={form.handleChange}
                  value={form.values.email}
                />
                <span className="text-danger fw-bold">
                  {" "}
                  {form.errors.email}
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
