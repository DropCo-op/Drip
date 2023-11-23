import { render } from "@testing-library/react-native";
import React from "react";
import Header from "../utils/Header";

const handler = () => {}

describe("test rendering header", () => {
  it("header", async () => {
    const { getByTestId } = render(<Header handler={ handler }/>);
    expect(getByTestId("head"))
  });
});
