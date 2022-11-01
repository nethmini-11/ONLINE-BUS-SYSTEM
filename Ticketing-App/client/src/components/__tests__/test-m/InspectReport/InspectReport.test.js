import{render,screen,cleanup} from '@testing-library/react'
import InspectReport from '../../../transport-manager-components/InspectReport';
import React from 'react';
import "@testing-library/jest-dom";





test('Render InspectReport component',()=>{

render(<InspectReport/>);
const todoElement =screen.getByTestId('report-i');

expect (todoElement).toBeInTheDocument();
expect(todoElement).toHaveTextContent('Manage Inspected Report details');






})