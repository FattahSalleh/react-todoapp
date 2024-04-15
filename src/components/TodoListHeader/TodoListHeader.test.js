import React from 'react';
import { render, fireEvent, getByAltText } from '@testing-library/react';
import TodoListHeader from './TodoListHeader';

describe('TodoListHeader Component', () => {
    const toggleFormVisibility = jest.fn();
    const handleDeleteAll = jest.fn();

    it('renders correctly with the provided props', () => {

        const { getByText, getByAltText } = render(
            <TodoListHeader
                toggleFormVisibility={toggleFormVisibility}
                handleDeleteAll={handleDeleteAll}
            />
        );

        expect(getByText('To Do List')).toBeInTheDocument();
        expect(getByAltText('Add Icon')).toBeInTheDocument();
        expect(getByAltText('Ellipsis Icon')).toBeInTheDocument();
    });

    it('calls toggleFormVisibility when AddIcon is clicked', () => {

        const { getByAltText } = render(
            <TodoListHeader
                toggleFormVisibility={toggleFormVisibility}
                handleDeleteAll={handleDeleteAll}
            />
        );

        const addIcon = getByAltText('Add Icon');
        fireEvent.click(addIcon);
        expect(toggleFormVisibility).toHaveBeenCalledTimes(1);
    });

    it('check if handleDeleteAll exist when EllipsisDropdown is clicked', () => {

        const { getByAltText } = render(
            <TodoListHeader
                toggleFormVisibility={toggleFormVisibility}
                handleDeleteAll={handleDeleteAll}
            />
        );

        const ellipsisDropdown = getByAltText('Ellipsis Icon');
        fireEvent.click(ellipsisDropdown);
        expect(handleDeleteAll).toHaveBeenCalledTimes(0);
    });
});
