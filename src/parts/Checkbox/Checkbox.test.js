import { fireEvent, render } from "@testing-library/react";
import Checkbox from './Checkbox';

describe('Checkbox Component', () => {
    it('renders checkbox icon', () => {
        const { getByAltText } = render(<Checkbox />);
        const checkboxIcon = getByAltText('Checkbox Icon');
        expect(checkboxIcon).toBeInTheDocument();
    })

    it('toggles checkbox state on click', () => {
        const { getByAltText } = render(<Checkbox />);
        const checkboxIcon = getByAltText('Checkbox Icon');
        fireEvent.click(checkboxIcon);
        const checkmarkIcon = getByAltText('Checkmark Icon');
        expect(checkmarkIcon).toBeInTheDocument();

        fireEvent.click(checkboxIcon);
        expect(checkmarkIcon).not.toBeInTheDocument();
    });
})