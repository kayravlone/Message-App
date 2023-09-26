import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 16,
        margin: 12,
        elevation: 2,
        backgroundColor: '#007C73',
    },
    inner_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    user: {
        fontSize: 14,
        color: 'white',
        // Yeni stil özellikleri buraya ekleyebilirsiniz
        fontWeight: 'bold', // Örnek: metin kalın olarak stilendirilsin
    },
    date: {
        fontSize: 12,
        color: 'white',
        // Yeni stil özellikleri buraya ekleyebilirsiniz
        fontStyle: 'italic', // Örnek: metin italik olarak stilendirilsin
    },
    title: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        // Yeni stil özellikleri buraya ekleyebilirsiniz
        marginTop: 8, // Örnek: metin ile altındaki içerik arasına bir boşluk ekleyin
    },
    footer: {
        alignItems:'flex-end'
    },
    dislike_contanier: {
       flexDirection:'row',
       backgroundColor:'white',
       padding:3,
       paddingHorizontal:10,
       borderRadius:20,
       alignItems:'center'
    },
    dislike_count_container: {
        backgroundColor:colors.darkgreen,
        padding:3,
        borderRadius:20,
        marginRight:3
    },
    dislike_count_text: {
        color:'white',
        fontWeight:'bold'
    },
    dislike_text: {
        color:colors.darkgreen,
        fontWeight:'bold'
        
    },
});

export default styles;
