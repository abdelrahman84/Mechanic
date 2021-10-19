import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native'

import LoginForm from '../UI_Components/LoginForm';

describe('Login form', () => {

    test('Login form should render correctly', async () => {

        navigateToRegister = jest.fn();
        formSumbit = jest.fn();

        const { queryByTestId, getByPlaceholderText, queryByText } = render(<LoginForm onNavigateToRegister={navigateToRegister}
            onFormSubmit={formSumbit}
            isLoading={false} />)

        const loginBtn = queryByTestId('login-btn');
        const registerLink = queryByText('Register');

        await waitFor(() => {
            expect(loginBtn).not.toBeNull();
            expect(registerLink).not.toBeNull();
            expect(loginBtn).toBeDisabled();
        })

        const emailInput = getByPlaceholderText('email');
        const passwordInput = getByPlaceholderText('password');

        await act(async () =>
            fireEvent.changeText(emailInput, 'test@test.com'),
            fireEvent.changeText(passwordInput, '1234lK5#'),
        )
        expect(loginBtn).not.toBeDisabled();

        await act(async () =>
            fireEvent.press(loginBtn));
        expect(formSumbit).toHaveBeenCalled();

        // // test for register link
        fireEvent.press(registerLink);
        expect(navigateToRegister).toHaveBeenCalled();

    })
})