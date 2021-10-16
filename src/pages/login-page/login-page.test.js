import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "./login-page";
import { login } from "../../external/external-proxy";
import { Button } from "@mui/material";

jest.mock("../../external/external-proxy");

describe("Login Page", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginPage />);
    login.mockReset();
  });

  it("should display a input field for employee Id and store the entered value in state", () => {
    expect(wrapper.exists("#empId")).toEqual(true);
    wrapper.find("#empId").simulate("change", { target: { value: "E9155" } });

    expect(wrapper.find("#empId").prop("value")).toEqual("E9155");
  });

  it("should display a input field for employee name and store the entered value in state", () => {
    expect(wrapper.exists("#empName")).toEqual(true);
    wrapper
      .find("#empName")
      .simulate("change", { target: { value: "Dinesh" } });

    expect(wrapper.find("#empName").prop("value")).toEqual("Dinesh");
  });

  it("should display a submit button which invokes a function to save the login details and naviagte to next page", () => {
    wrapper.find("#empId").simulate("change", { target: { value: "E9155" } });
    wrapper
      .find("#empName")
      .simulate("change", { target: { value: "Dinesh" } });
    wrapper.update();

    const loginButton = wrapper.find(Button);

    expect(loginButton.length).toEqual(1);

    loginButton.simulate("click");
    expect(login).toHaveBeenCalledWith("E9155", "Dinesh");
  });

  it("should should not be able to click if the employee id and name are not available", () => {
    const loginButton = wrapper.find(Button);

    expect(loginButton.length).toEqual(1);

    loginButton.simulate("click");
    expect(login).not.toHaveBeenCalledWith("E9155", "Dinesh");
  });
});
