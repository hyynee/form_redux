import React from "react";
import ReactDOM from "react-dom/client";
import ShoesStore from "./homework-3/ShoesStore";

import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import Homepages from "./redux/Demo/Homepages";
import Home from "./form_func/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ShoesStore></ShoesStore>
  // <Form></Form>
  // <FormDemo></FormDemo>
  // <Lifecycle></Lifecycle>
  <Provider store={store}>
    <Homepages></Homepages>
    {/* <Home></Home> */}
  </Provider>
);
