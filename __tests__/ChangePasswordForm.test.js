import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native'

import ChangePasswordForm from '../UI_Components/ChangePasswordForm';

describe('Change password form', () => {

    test('ChangePassword form should render correctly', async () => {

        formSubmit = jest.fn();

        const { queryByTestId, getByPlaceholderText } = render(<ChangePasswordForm onFormSubmit={formSubmit}
            isLoading={false} />)

        const submitBtn = queryByTestId('submit-btn');

        const oldPassword = getByPlaceholderText('old password');
        const newPassword = getByPlaceholderText('new password');
        const confirmationPassword = getByPlaceholderText('confirmation password');

        // fire event with confirmation password not matching new password
        await act(async () =>
            fireEvent.changeText(oldPassword, '1234aA1$'),
            fireEvent.changeText(newPassword, '4321aA1$'),
            fireEvent.changeText(confirmationPassword, '1234aA1$'),
        )
        expect(submitBtn).toBeDisabled();

        // match confirmation password to new password
        await act(async () =>
            fireEvent.changeText(confirmationPassword, '4321aA1$'),
        )

        expect(submitBtn).not.toBeDisabled();

        await act(async () =>
            fireEvent.press(submitBtn));
        expect(formSubmit).toHaveBeenCalled();

    })
})