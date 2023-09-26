import React from "react";
import { View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import styles from './ContentInputModal.style';
import Button from '../../Button';

const ContentInputModal = ({ visible, onClose, onSend }) => {
    const [text, setText] = React.useState(null);
    
    function handleSend(){
        if(!text){
            return
        }
        onSend(text)
        setText(null)
    }
    return (
        <Modal
            style={styles.modal}
            isVisible={visible}
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}>
            <View style={styles.container}  >
                <View style={styles.input_container} >
                    <TextInput
                        placeholder="Write Something..."
                        onChangeText={setText}
                        multiline
                    />
                </View>
                <Button text='Send' onPress={handleSend} />
            </View>
        </Modal>
    )
}


export default ContentInputModal;