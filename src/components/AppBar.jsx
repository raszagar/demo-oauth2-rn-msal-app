import Constants from 'expo-constants';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppBarTab from './AppBarTab';


const AppBar = () => {
    return (
        <View style={styles.appBar}>
            <ScrollView horizontal style={styles.scroll}>
                <AppBarTab active to='/'>Home</AppBarTab>
                <AppBarTab to='/profile'>Perfil</AppBarTab>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    appBar: {
        backgroundColor: '#004254',
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
    },
    scroll: {
        paddingBottom: 15
    },
    text: {
        color: '#fff',
    }
});

export default AppBar;
