import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import HeaderContainer from '../UI_Components/HeaderContainer';

describe('Header', () => {

    const onNavigateChange = jest.fn();

    const onLogout = jest.fn();

    test('Should render correctly', async () => {

        const { queryByTestId, queryByText } = render(<HeaderContainer onNavigateChange={onNavigateChange}
            onLogout={onLogout} />);

        // test homeIcon   
        const homeIcon = queryByTestId('home-icon');
        expect(homeIcon).not.toBeNull();
        fireEvent.press(homeIcon);
        expect(onNavigateChange).toHaveBeenCalled();

        // test rightIcon
        const rightIcon = queryByTestId('right-icon');
        expect(rightIcon).not.toBeNull();

        // test logout link
        expect(queryByTestId('logout-item')).toBeNull();

        // toggle view right menu
        fireEvent.press(rightIcon);
        expect(queryByTestId('logout-item')).not.toBeNull();

        // test logoutItem
        fireEvent.press(queryByTestId('logout-item'));
        expect(onLogout).toHaveBeenCalled();

        //toggle hide right menu
        fireEvent.press(rightIcon)
        expect(queryByText('login-item')).toBeNull();

        //test left icon
        const leftIcon = queryByTestId('left-icon');
        expect(leftIcon).not.toBeNull();

        //test left menu
        expect(queryByTestId('profile-item')).toBeNull();

        fireEvent.press(leftIcon);
        expect(queryByTestId('profile-item')).not.toBeNull();

        //test profile link
        fireEvent.press(queryByTestId('profile-item'));
        expect(onNavigateChange).toHaveBeenCalled();

        //toggle hide left menu
        fireEvent.press(leftIcon)
        expect(queryByText('profile-item')).toBeNull();
    })
})