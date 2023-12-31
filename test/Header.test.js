import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import Header from "../utils/Header";

describe("Test Header", () => {

  test("Render header", async () => {
    let { getByTestId } = render(<Header handler={ handler }/>);
    expect(getByTestId("head")).toBeTruthy();
  });

  test("Press button", async () => {
    const handle = jest.fn();
    let { getByTestId } = render(<Header handler={ handle }/>);
    fireEvent.press(getByTestId("butt"));
    expect(handle).toHaveBeenCalled();
  });
});
