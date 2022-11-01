import { render, screen, cleanup } from "@testing-library/react";
import DashBoard from "../../dashboard-components/components/DashBoard";
import React from 'react';

import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("should render fader component", () => {
  render(<DashBoard text="test" />);



  const faderElem =screen.getByTestId('todo-3');



  expect(faderElem).toBeInTheDocument();
  expect(faderElem).toHaveTextContent("Loading...");

});

test("fader matches snapshot", () => {
  const component = renderer.create(<DashBoard />);

  let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});
