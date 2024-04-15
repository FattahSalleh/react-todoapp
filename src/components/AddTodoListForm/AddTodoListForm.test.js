import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddTodoListForm from './AddTodoListForm';

describe('AddTodoListForm Component', () => {

    const handleAdd = jest.fn();
    const toggleFormVisibility = jest.fn();
    
    it('does not render when form is not visible', () => {
        const { container } = render(<AddTodoListForm isFormVisible={false} />);
        expect(container.firstChild).toBeNull();
    });

    it('focuses input field when form is visible', () => {
        const { getByPlaceholderText } = render(<AddTodoListForm isFormVisible={true} />);
        const inputField = getByPlaceholderText('What needs to be done?');
        expect(document.activeElement).toBe(inputField);
    });

    it('updates input value when typing', () => {
        const { getByPlaceholderText } = render(<AddTodoListForm isFormVisible={true} />);
        const inputField = getByPlaceholderText('What needs to be done?');
        fireEvent.change(inputField, { target: { value: 'New Todo' } });
        expect(inputField.value).toBe('New Todo');
    });

    it('calls handleAdd with correct input value when clicking create button', async () => {
        
        const { getByText, getByPlaceholderText } = render(
            <AddTodoListForm
                isFormVisible={true}
                handleAdd={handleAdd}
                toggleFormVisibility={toggleFormVisibility}
            />
        );
        const inputField = getByPlaceholderText('What needs to be done?');
        const createButton = getByText('Create');
        fireEvent.change(inputField, { target: { value: 'New Todo' } });
        fireEvent.click(createButton);
        await waitFor(() => expect(handleAdd).toHaveBeenCalledWith('New Todo'));
    });

    it('clears input field and hides form when clicking create button', () => {
        const { getByText, getByPlaceholderText } = render(
            <AddTodoListForm
                isFormVisible={true}
                handleAdd={handleAdd}
                toggleFormVisibility={toggleFormVisibility}
            />);
        const inputField = getByPlaceholderText('What needs to be done?');
        const createButton = getByText('Create');
        fireEvent.change(inputField, { target: { value: 'New Todo' } });
        fireEvent.click(createButton);
        expect(inputField.value).toBe('');
    });

    it('clears input field and hides form when clicking cancel button', () => {
        const { getByText, getByPlaceholderText } = render(
            <AddTodoListForm
                isFormVisible={true}
                handleAdd={handleAdd}
                toggleFormVisibility={toggleFormVisibility}
            />);
        const inputField = getByPlaceholderText('What needs to be done?');
        const cancelButton = getByText('Cancel');
        fireEvent.change(inputField, { target: { value: 'New Todo' } });
        fireEvent.click(cancelButton);
        expect(inputField.value).toBe('');
    });

    it('behaves same as clicking create button when pressing enter key', async () => {
        const { getByPlaceholderText } = render(
            <AddTodoListForm
                isFormVisible={true}
                handleAdd={handleAdd}
                toggleFormVisibility={toggleFormVisibility}
            />);
        const inputField = getByPlaceholderText('What needs to be done?');
        fireEvent.change(inputField, { target: { value: 'New Todo' } });
        fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });
        await waitFor(() => expect(handleAdd).toHaveBeenCalledWith('New Todo'));
    });
});
