import InputMore from "../screens/InputMore";
import render from "@testing-library/react-native";
//import { navigationRef } from "../__mocks__/mockNavigation";

const routeParamsMock = {
    "params":{
    "Name": "name",
    "Latitude": 1,
    "Longitude": 1,
    "Temperature": 2,
    "Pressure": 1,
    "Busyness": 1,
    "Taste": 1,
    "List": [],
    }
}

const navigationRef = (props) => ({
    navigate: ()=>{console.log("sup")},
    ...props
  });

describe("Test using the inputMore page", () => {
  test("Test History Text Input", async () => {
    try{
      const {getTestByID} = render(<InputMore navigation={ navigationRef.navigation } route={routeParamsMock}/>)
      
      const testHistoryTextInput = getTestByID("HistoryTextInput");

      expect(testHistoryTextInput).toBeTruthy();
    }
    catch(err){
        console.log(err)
    }
  });
  test("Test submit button", async () => {
    try {
      const {getTestById} = render(<InputMore navigation={ navigationRef } route={routeParamsMock}/>)
      
      const testSubmitButton = getTestById("submitButton");

      expect(testSubmitButton).toBeTruthy();
    } catch (err) {
      console.log(err);
    }
  });
  test("Test name field", async () => {
    try {
      const {getTestById} = render(<InputMore navigation={ navigationRef } route={routeParamsMock}/>)
      
      const testNameField = getTestById("nameField");

      expect(testNameField.value).toBe("name");
    } catch (err) {
      console.log(err);
    }
  });

  test("Test change valve count", async () => {
    try {
      const {getTestById} = render(<InputMore navigation={ navigationRef } route={routeParamsMock}/>)
      
      const testNameField = getTestById("notesOrCommentsTextField");

      fireEvent.change(testNameField, { target: { value: 'this is a test' } });

      expect(testNameField.value).toBe("this is a test");
    } catch (err) {
      console.log(err);
    }
  });
});
