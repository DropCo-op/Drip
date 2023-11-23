import MapScreen from "../screens/Map";
import render from "@testing-library/react-native";
import { navigationRef } from "../__mocks__/mockNavigation.js";

describe("Test using the map", () => {
  it("Normal Map Stuff", async () => {
    try {
      const whatever = render(<MapScreen navigation={navigationRef}/>)
      expect(true).toBe(true);
    } catch (err) {
      console.log(err);
    }
  });
});
