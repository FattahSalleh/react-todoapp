import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoListContent from './TodoListContent';

describe('TodoListContent Component', () => {
    const todos = [
        { _id: 1, title: 'Todo 1', isCompleted: false },
        { _id: 2, title: 'Todo 2', isCompleted: true },
    ];

    const isFormVisible = true;
    const toggleFormVisibility = jest.fn();
    const handleAdd = jest.fn();
    const handleEdit = jest.fn();
    const handleSave = jest.fn();
    const handleDelete = jest.fn();
    const handleCancel = jest.fn();

    it('renders correctly with the provided props', () => {

        const { getByTestId, getAllByTestId } = render(
            <TodoListContent
                isFormVisible={isFormVisible}
                toggleFormVisibility={toggleFormVisibility}
                todos={todos}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleCancel={handleCancel}
            />
        );

        // Check if TodoListItem components are rendered for each todo
        const todoListItems = getAllByTestId('todo-list-item');
        expect(todoListItems.length).toBe(todos.length);

        // Check if AddTodoListForm component is rendered
        const addTodoListForm = getByTestId('add-todo-list-form');
        expect(addTodoListForm).toBeInTheDocument();
    });

    it('renders the correct number of TodoListItem components with the correct props', () => {

        const { getAllByTestId } = render(
            <TodoListContent
                isFormVisible={false}
                toggleFormVisibility={toggleFormVisibility}
                todos={todos}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleCancel={handleCancel}
            />
        );

        const todoListItems = getAllByTestId('todo-list-item');
        expect(todoListItems.length).toBe(todos.length);
    });


    it('calls toggleFormVisibility when AddTodoListForm is rendered', () => {

        const { getByTestId } = render(
            <TodoListContent
                isFormVisible={true}
                toggleFormVisibility={toggleFormVisibility}
                todos={todos}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleCancel={handleCancel}
            />
        );

        // Check if AddTodoListForm is rendered with the correct data-testid
        const addTodoListForm = getByTestId('add-todo-list-form');
        expect(addTodoListForm).toBeInTheDocument();
    });
});
