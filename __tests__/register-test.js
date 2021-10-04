import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native'

import Register from '../components/register';

describe('Register page', () => {


    test('Register page should render', async () => {

        const { getByTestId, getByPlaceholderText } = render(<Register />)

        const registerBtn = getByTestId('register-btn');
        await waitFor(() => {

            expect(registerBtn).not.toBeNull();
            expect(registerBtn).toBeDisabled();

            const firstNameInput = getByPlaceholderText('fist name');
            const lastNameInput = getByPlaceholderText('last name');
            const usernameInput = getByPlaceholderText('username');
            const emailInput = getByPlaceholderText('email');
            const phoneNumberInput = getByPlaceholderText('phone number');

            fireEvent.changeText(firstNameInput, 'Ahmed');
            fireEvent.changeText(lastNameInput, 'Mohamed');
            fireEvent.changeText(usernameInput, 'abdu');
            fireEvent.changeText(emailInput, 'test@test.com');
            fireEvent.changeText(phoneNumberInput, '0123456789');

            expect(registerBtn).not.toBeDisabled();
        })
    })
})