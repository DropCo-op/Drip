import * as React from "react";

export const navigationRef = React.createRef();

export function navigate(name) {
  navigationRef.current?.navigate(name);
}

export function push(name, params) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}
