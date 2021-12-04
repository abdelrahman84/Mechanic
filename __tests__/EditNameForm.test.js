import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native'

import EditNameForm from '../UI_Components/EditNameForm';

describe('Login form', () => {

    test('EditName form should render correctly', async () => {

        formSubmit = jest.fn();

        const { queryByTestId, getByPlaceholderText, queryByText } = render(<EditNameForm onFormSubmit={formSubmit}
            isLoading={false} />)

        const submitBtn = queryByTestId('submit-btn');

        const nameInput = getByPlaceholderText('full name');

        await act(async () =>
            fireEvent.changeText(nameInput, 'new name'),
        )
        expect(submitBtn).not.toBeDisabled();

        await act(async () =>
            fireEvent.press(submitBtn));
        expect(formSubmit).toHaveBeenCalled();

    })
})