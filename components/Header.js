import { View, Image } from 'react-native';
import React from 'react';

const Header = (props) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
            <Image
                source={require('../assets/header.png')}
                style={styles.imageStyle}
            />
        </View>
    );
};

const styles = {
    imageStyle: {
        width: 100,
        height: 70,
        marginTop: 30,
        resizeMode: 'contain'
    }
};

export default Header;
