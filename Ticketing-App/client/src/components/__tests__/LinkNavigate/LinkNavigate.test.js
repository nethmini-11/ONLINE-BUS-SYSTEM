import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import LinkNavigate from '../../LinkNavigate/LinkNavigate'
import React from 'react';
afterEach(() => {
  cleanup();
});

test("renders correctly", () => {
  const component = renderer.create(
    <LinkNavigate page="localhost:3001/managetimetable">Link Navigate</LinkNavigate>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


