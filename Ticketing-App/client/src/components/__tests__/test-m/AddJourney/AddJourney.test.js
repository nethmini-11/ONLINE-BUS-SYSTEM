import { render, screen, cleanup } from "@testing-library/react";
import AddJourney from '../../../bus-employee-components/AddJourney';
import React from 'react';

import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("Render AddJourney Component", () => {
  render(<AddJourney text="test" />);



  const faderElem =screen.getByTestId('add-journey');



  expect(faderElem).toBeInTheDocument();
  expect(faderElem).toHaveTextContent("Loading...");

});

test("fader matches snapshot", () => {
  const component = renderer.create(<AddJourney/>);

  let tree = component.toJSON();

});
