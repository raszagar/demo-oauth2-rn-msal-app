import { StyleSheet, Text } from 'react-native';
import { Link, useLocation } from 'react-router-native';

const AppBarTab = ({ children, to }) => {
    const { pathname } = useLocation();
    const active = pathname === to;
    
    const textStyles = [
        styles.text,
        active && styles.active,
    ];

    return (
        <Link to={to}>
            <Text style={textStyles}>
                {children}
            </Text>
        </Link>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#999',
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    active: {
        color: '#fff'
    }
});

export default AppBarTab;