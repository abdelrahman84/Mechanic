import React, { useState } from 'react';
import { View } from 'react-native';;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Modal } from 'native-base';

import HeaderContainer from '../UI_Components/HeaderContainer';

const Dashboard: () => Node = ({ navigation }) => {

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleHeaderNavigate = (page) => {
    navigation.navigate(page)
  }

  const logoutCallback = () => { setShowLogoutModal(true) }

  const logout = async () => {
    await AsyncStorage.removeItem('USER');
    await AsyncStorage.removeItem('TOKEN');
    navigation.navigate('Login');
  }


  return (
    <View>
      <HeaderContainer onNavigateChange={handleHeaderNavigate} onLogout={logoutCallback} />

      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Are you sure you want to logout?</Modal.Header>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost"
                colorScheme='blueGray'
                onPress={() => setShowLogoutModal(false)}
              >
                Cancel
              </Button>
              <Button
                colorScheme='blue'
                onPress={() => logout()}>
                Logout
              </Button>

            </Button.Group>
          </Modal.Footer>

        </Modal.Content>
      </Modal>
    </View>
  )
}



export default Dashboard;

