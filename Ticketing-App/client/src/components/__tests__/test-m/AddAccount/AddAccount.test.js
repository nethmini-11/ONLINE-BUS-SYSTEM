import{render,screen,cleanup} from '@testing-library/react'
import AddAccount from '../../../admin-components/AddAccount';
import React from 'react';
import "@testing-library/jest-dom";





test('Render add account.jsx',()=>{

render(<AddAccount/>);
const todoElement =screen.getByTestId('add-account');

expect (todoElement).toBeInTheDocument();
expect(todoElement).toHaveTextContent('Create User Account');






})