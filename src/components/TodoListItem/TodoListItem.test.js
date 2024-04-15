import React from 'react';
import { render, fireEvent, queryByText, getByTestId } from '@testing-library/react';
import TodoListItem from './TodoListItem';

describe('TodoListItem Component', () => {

    const todo = {
        _id: '1',
        title: 'Sample Todo',
        isEditing: false
    };

    const handleEdit = jest.fn();
    const handleSave = jest.fn();
    const handleDelete = jest.fn();
    const handleCancel = jest.fn();

    it('renders correctly with the provided props', () => {
        const { getByText, queryByText } = render(
            <TodoListItem
                todo={todo}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleCancel={handleCancel}
            />
        );

        // Check if the TodoListItem renders with the correct title
        expect(getByText('Sample Todo')).toBeInTheDocument();

        // Check if the TodoListItem hides the edit button at first
        const editButton = queryByText('Edit Item');
        expect(editButton).toBeNull();

        // Check if the TodoListItem hides the delete button at first
        const deleteButton = queryByText('Delete Item');
        expect(deleteButton).toBeNull();
    });

    it('displays ellipsis dropdown with correct options', () => {

        const { getByAltText, getByText } = render(
            <TodoListItem
                todo={todo}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleCancel={handleCancel}
            />
        );

        // Find the ellipsis dropdown by its alt text
        const ellipsisDropdown = getByAltText('Ellipsis Icon');
        fireEvent.click(ellipsisDropdown);

        // Check if the edit and delete options are present in the dropdown
        expect(getByText('Edit Item')).toBeInTheDocument();
        expect(getByText('Delete Item')).toBeInTheDocument();
    });

    it('allows typing input in edit mode', () => {
        const todo = {
            _id: '1',
            title: 'Sample Todo',
            isEditing: true
        };

        const { getByDisplayValue } = render(
            <TodoListItem
                todo={todo}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleCancel={handleCancel}
            />
        );

        // Find the input field by its display value
        const inputField = getByDisplayValue('Sample Todo');

        // Simulate user typing in the input field
        fireEvent.change(inputField, { target: { value: 'Updated Todo' } });

        // Check if the input value changes correctly
        expect(inputField.value).toBe('Updated Todo');
    });

    it('switches to edit mode when the edit button is clicked and check if Confirm and Cancel button shows and call correct functions', () => {
        const todo = {
            _id: '1',
            title: 'Sample Todo',
            isEditing: true
        };

        const { getByAltText } = render(
            <TodoListItem
                todo={todo}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleCancel={handleCancel}
            />
        );

        // Find the edit button within the dropdown by its alt text
        const confirmEditButton = getByAltText('Confirm Icon');
        fireEvent.click(confirmEditButton);
        expect(handleSave).toHaveBeenCalledWith('1', 'Sample Todo');

        // Find the delete button within the dropdown by its alt text
        const cancelEditButton = getByAltText('Cancel Icon');
        fireEvent.click(cancelEditButton);
        expect(handleCancel).toHaveBeenCalled;

    });

});
