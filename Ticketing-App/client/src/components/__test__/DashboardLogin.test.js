import{render,screen,cleanup} from '@testing-library/react'
import DashboardLogin from '../admin-components/DashboardLogin';
import React from 'react';





test('Should Render Login Components',()=>{

render(<DashboardLogin/>);
const todoElement =screen.getByTestId('todo-2');

expect (todoElement).toBeInTheDocument();
expect(todoElement).toHaveTextContent('LOGIN');






})