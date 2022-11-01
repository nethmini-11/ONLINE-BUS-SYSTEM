import{render,screen,cleanup} from '@testing-library/react'
import SignUp from '../admin-components/SignUp';
import React from 'react';





test('Should Render SignUp Components',()=>{

render(<SignUp/>);
const todoElement =screen.getByTestId('todo-1');

expect (todoElement).toBeInTheDocument();
expect(todoElement).toHaveTextContent('Sign up');






})