import { render, screen, cleanup } from "@testing-library/react";
import InspectorDashboard from '../../dashboard-components/components/InspectorDashboard';
import React from 'react';

import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("should render DashBoard component", () => {
  render(<InspectorDashboard text="test" />);



  const faderElem =screen.getByTestId('todo-5');



  expect(faderElem).toBeInTheDocument();
  expect(faderElem).toHaveTextContent("Loading...");

});

test("fader matches snapshot", () => {
  const component = renderer.create(<InspectorDashboard/>);

  let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});
