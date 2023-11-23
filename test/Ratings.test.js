import { render } from "@testing-library/react-native";
import React from "react";
import Ratings from "../screens/Ratings.js";
import { navigationRef } from "../__mocks__/mockNavigation.js";

const mockRoute = {
    "params": {
        "Marker": {
            "name": '',
            'temperature': 0,
            'pressure': 0,
            'taste': 0,
            'busyness': 0,
            'spoutCount': 0,
            'history': "",
            'notes': "",
            'adjustableValve': true,
            'ratingCount': 0,
            'longitude': 0,
            'latitude': 0,
        },
        "List": []
    }
}

// describe("test back button", () => {
//   it("functionality", async () => {
//     const { getByTestId } = render(<Ratings navigation={navigationRef} route={mockRoute}/>);

//     await awaitFor(() => {
//       const backBtn = getByTestId("back-button");
//       expect(backBtn).toBeTruthy();
//     });
//   });
// });

describe("test element rendering", () => {
  it("title", async () => {
    const { getByTestId } = render(<Ratings navigation={navigationRef} route={mockRoute}/>);
    expect(getByTestId("title")).toBeTruthy();
  });
});
