// CustomHeaderButton.jsx
import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeaderButton = ({ title, navigationTarget }) => {
    const navigation = useNavigation();

    return (
        <Button
            onPress={() => navigation.navigate(navigationTarget)}
            title={title}
            color="#000"
        />
    );
};

export default CustomHeaderButton;
