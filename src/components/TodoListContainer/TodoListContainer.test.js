import React from 'react';
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import TodoListContainer from './TodoListContainer';
import * as UserService from '../../services/UserService';

// Mocking UserService methods
jest.mock('../../services/UserService', () => ({
    fetchTodoList: jest.fn(),
    addTodoItem: jest.fn(),
    deleteTodoItem: jest.fn(),
    updateTodoItemTitle: jest.fn(),
}));

describe('TodoListContainer Component', () => {
    beforeEach(() => {
        UserService.fetchTodoList.mockResolvedValue([]);
    });

    it('renders without crashing', () => {
        render(<TodoListContainer />);
    });

    it('initial state', () => {
        const { getByText } = render(<TodoListContainer />);
        expect(getByText(/Don't miss out an important tasks anymore/i)).toBeInTheDocument();
    });

    it('check api to fetch todo list on mount', async () => {
        await waitFor(() => expect(UserService.fetchTodoList).toBeDefined());
    });

    it('check for api to add todo item', async () => {
        await waitFor(() => expect(UserService.addTodoItem).toBeDefined());
    });

    it('check for api to delete todo item', async () => {
        await waitFor(() => expect(UserService.deleteTodoItem).toBeDefined());
    });

    it('check for api to update todo item', async () => {
        await waitFor(() => expect(UserService.updateTodoItemTitle).toBeDefined());
    });

});
