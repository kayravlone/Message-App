import { View, Text, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './Messages.style';
import FloatingButton from '../../components/FloatingButton';
import ContentInputModal from '../../components/modal/ContentInputModal';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from '../../Utils/parseContentData';
import MessageCard from '../../components/card/MessageCard';

const Messages = ({navigation}) => {
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [contentList, setContentList] = useState([]);
    const [userToken, setUserToken] = useState(null); // Kullanıcı token'ı

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) {
                // Kullanıcı oturum açtığında token'ı alın
                user.getIdToken().then((token) => {
                    setUserToken(token);
                });
            } else {
                setUserToken(null);
            }
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    useEffect(() => {
        database().ref('messages/').on('value', (snapshot) => {
            const contentData = snapshot.val();
            const parsedData = parseContentData(contentData || {});
            setContentList(parsedData);
        });
    }, []);

    function handleInputToggle() {
        if (userToken) {
            setInputModalVisible(!inputModalVisible);
        } else {
            Alert.alert('Giriş Yapın', 'Mesaj göndermek için giriş yapmalısınız.');
            navigation.navigate('LoginPage')
        }
    }

    function handleSendContent(content) {
        handleInputToggle();
        sendContent(content);
    }

    function sendContent(content) {
        const userMail = auth().currentUser.email;
        const contentObject = {
            text: content,
            username: userMail.split('@')[0],
            date: new Date().toISOString(),
            dislike: 0,
        };
        database().ref('messages/').push(contentObject);
    }

    function handleBanane(item) {
        database().ref(`messages/${item.id}/`).update({ dislike: item.dislike + 1 });
    }

    const renderContent = ({ item }) => <MessageCard message={item} onBanane={() => handleBanane(item)} />;

    return (
        <View style={styles.container}>
            <FlatList data={contentList} renderItem={renderContent} />
            <FloatingButton icon="plus" onPress={handleInputToggle} />
            <ContentInputModal visible={inputModalVisible} onClose={handleInputToggle} onSend={handleSendContent} />
        </View>
    );
};

export default Messages;
