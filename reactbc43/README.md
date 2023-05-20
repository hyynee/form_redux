  // console.log("mang SV ",arrSV);

  // const handleValidation = (e) => {
  //   const dataType = e.target.getAttribute("data-type");
  //   const minLength = e.target.getAttribute("data-minlength");
  //   const maxLength = e.target.getAttribute("data-maxlength");
  //   const { value, id } = e.target;

  //   let newErrors = { ...errors };
  //   let errorMessage = "";

  //   if (value.trim() === "") {
  //     errorMessage = id + " không được bỏ trống !!!";
  //   } else {
  //     if (dataType) {
  //       switch (dataType) {
  //         case "number": {
  //           let regexNumber = /^-?\d*\.?\d+$/;
  //           if (!regexNumber.test(value)) {
  //             errorMessage = id + " phải là số !!!";
  //           }
  //           break;
  //         }
  //         case "string": {
  //           let regexString = /^[a-z A-Z0-9]+$/;
  //           if (!regexString.test(value)) {
  //             errorMessage = id + " không được chứa dấu và ký tự đặc biệt!!!";
  //           }
  //           break;
  //         }
  //         case "email": {
  //           let regexEmail =
  //             /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //           if (!regexEmail.test(value)) {
  //             errorMessage = id + " không hợp lệ !!!";
  //           }
  //           break;
  //         }
  //       }
  //     }
  //     if (minLength) {
  //       if (value.length < minLength) {
  //         errorMessage = id + " không được dưới " + minLength + " ký tự!!!";
  //       }
  //     }
  //     if (maxLength) {
  //       if (value.length > maxLength) {
  //         errorMessage = id + " không được hơn " + maxLength + " ký tự!!!";
  //       }
  //     }
  //     if (id === "maSV") {
  //       const maSVList = arrSV.map((sv) => sv.maSV);
  //       if (maSVList.includes(value)) {
  //         errorMessage = "Mã SV đã tồn tại!!!";
  //       }
  //     }
  //     if (id === "email") {
  //       const maSVList = arrSV.map((sv) => sv.email);
  //       if (maSVList.includes(value)) {
  //         errorMessage = "email đã tồn tại!!!";
  //       }
  //     }
  //   }
  //   newErrors[id] = errorMessage;
  //   const action = changeInfoErrors({ id, value: errorMessage });
  //   dispatch(action);
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   for (let key in errors) {
  //     if (errors[key] !== "") {
  //       alert("data is not valid!!");
  //       return;
  //     }
  //   }
  //   const action = addSVAction(userSV);
  //   dispatch(action);
  // };
  // const handleChangeInput = (e) => {
  //   const { id, value } = e.target;
  //   const action = updateSV({ id, value });
  //   dispatch(action);
  //   handleValidation(e);
  // };