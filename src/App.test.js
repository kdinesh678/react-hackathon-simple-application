import React from "react";
import { shallow } from "enzyme";
import App from "./App";

test("renders learn react link", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("a").text()).toBe("Learn React");
});
