import { render } from "@testing-library/react-native";
import React from "react";
import Ratings from "../screens/Ratings.js";
import { navigationRef } from "../__mocks__/mockNavigation.js";

const mockRoute = {
  params: {
    Marker: {
      name: "",
      temperature: 0,
      pressure: 0,
      taste: 0,
      busyness: 0,
      spoutCount: 0,
      history: "",
      notes: "",
      adjustableValve: true,
      ratingCount: 0,
      longitude: 0,
      latitude: 0,
    },
    List: [],
  },
};

describe("test element rendering", () => {
  test("title", async () => {
    const { getByTestId } = render(
      <Ratings navigation={navigationRef} route={mockRoute} />
    );
    expect(getByTestId("title")).toBeTruthy();
  });

  test("numRatings", async () => {
    const { getByTestId } = render(
      <Ratings navigation={navigationRef} route={mockRoute} />
    );
    expect(getByTestId("numRatings")).toBeTruthy();
  });

  test("correct number of children", async () => {
    const { getByTestId } = render(
      <Ratings navigation={navigationRef} route={mockRoute} />
    );
    expect(getByTestId("container").children[1]).toBeTruthy();
    expect(getByTestId("container").children[2]).toBe(undefined);
  });
});
