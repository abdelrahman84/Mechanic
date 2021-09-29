import React from 'react';
import {render} from '@testing-library/react-native'

import Register from '../components/register';

test('Register page should render', () => {
    const {getByText} = render(<Register />)

    const registerBtn = getByText('Register');
    expect(registerBtn).not.toBeNull();
})