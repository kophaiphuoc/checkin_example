import {StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';

const Modal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  return (
    <View>
      <Modal animationType="slide" onRequestClose={closeModal}>
        <View>
          <Text>Xin hãy nhập pass</Text>
          {/* Nút để đóng modal */}
          <Button title="Đóng Modal" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({});
