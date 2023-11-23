import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import CreateAccountScreen from "../screens/CreateAccount.js";

describe("CreateAccountScreen", () => {
  test("displays error message for empty email field", () => {
    const { queryByText, getByText, getByTestId } = render(<CreateAccountScreen />);
    fireEvent.press(getByText("Create Account"));
    expect(queryByText("Please enter an email.")).toBeTruthy();
  });

  test('displays error message for empty username field', () => {
    const { queryByText, getByText, getByTestId } = render(<CreateAccountScreen />);
    expect(queryByText('Please enter a username.')).toBeNull();
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.press(getByText('Create Account'));
    expect(queryByText('Please enter a username.')).toBeTruthy();
  });
 
  test('displays error message for empty password field', () => {
    const { queryByText, getByText, getByTestId } = render(<CreateAccountScreen />);
    expect(queryByText('Please enter a username.')).toBeNull();
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('username-input'), 'testusername');
    fireEvent.press(getByText('Create Account'));
    expect(queryByText('Please enter a password.')).toBeTruthy();
  }); 

  test('displays error message for empty confirm password field', () => {
    const { queryByText, getByText, getByTestId } = render(<CreateAccountScreen />);
    expect(queryByText('Please enter a username.')).toBeNull();
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('username-input'), 'testusername');
    fireEvent.changeText(getByTestId('password-input'), 'testpassword');
    fireEvent.press(getByText('Create Account'));
    expect(queryByText('Please confirm your password.')).toBeTruthy();
  });  
});
