import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import HeaderContainer from '../UI_Components/HeaderContainer';

describe('Header', () => {

    const onNavigateChange = jest.fn();

    const onLogout = jest.fn();

    test('Should render correctly for login link', async () => {

        const { queryByTestId } = render(<HeaderContainer onNavigateChange={onNavigateChange}
            onLogout={onLogout} />);


        // test letMenuIcon
        const leftIcon = queryByTestId('left-icon');
        expect(leftIcon).not.toBeNull();

        // test logout link
        expect(queryByTestId('logout-item')).toBeNull();

        // toggle view left menu
        fireEvent.press(leftIcon);
        expect(queryByTestId('logout-item')).not.toBeNull();


        //toggle hide left menu
        fireEvent.press(leftIcon)
        expect(queryByTestId('logout-item')).toBeNull();

        // toggle menu   
        fireEvent.press(leftIcon)

        // test logoutItem
        fireEvent.press(queryByTestId('logout-item'));
        expect(onLogout).toHaveBeenCalled();
    })

    test('Should render correctly for profile link', async () => {

        const { queryByTestId } = render(<HeaderContainer onNavigateChange={onNavigateChange}
            onLogout={onLogout} />);

        // test letMenuIcon
        const leftIcon = queryByTestId('left-icon');
        expect(leftIcon).not.toBeNull();

        // test profile link
        expect(queryByTestId('profile-item')).toBeNull();

        // toggle view left menu
        fireEvent.press(leftIcon);
        expect(queryByTestId('profile-item')).not.toBeNull();

        //test profile link
        fireEvent.press(queryByTestId('profile-item'));
        expect(onNavigateChange).toHaveBeenCalled();

    })
})