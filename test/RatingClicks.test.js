import { render } from "@testing-library/react-native";
import React from "react";
import RatingClicks from "../utils/RatingClicks";

describe("Test Rating Clicks", () => {

  test("Render name", async () => {
    const name = "foo";
    const rating = 3;
    const handle = jest.fn();
    let { getByTestId } = render(<RatingClicks name={ name } rating={ rating } parentHandler={ handle }/>);
    expect(getByTestId("name")).toBeTruthy();
  });

  test("Loop", async () => {
    const name = "foo";
    const rating = 3;
    const handle = jest.fn();
    let { getByTestId } = render(<RatingClicks name={ name } rating={ rating } parentHandler={ handle }/>);

    expect(getByTestId("drops")["_fiber"]["tag"]).toBe(5);
  });

});
