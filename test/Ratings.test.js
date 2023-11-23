import { render } from "@testing-library/react-native";
import React from "react";
import Ratings from "../screens/Ratings";
import Header from "../utils/Header";

describe("test back button", () => {
  it("functionality", async () => {
    const { getByTestId } = render(<Ratings />);
    const backBtn = getByTestId("back-button");
    expect(backBtn).toBeTruthy();
  });
});

describe("test element rendering", () => {
    it("title", async () => {
        const { getByTestId } = render(<Ratings />);
        expect(getByTestId("title").tobeTruthy());
    });
});
