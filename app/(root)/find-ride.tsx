import { View, Text } from 'react-native'
import React from 'react'
import { useLocationStore } from '../../store'
import RideLayout from '../../components/RideLayout';
import InputField from '../../components/InputField';
import GoogleTextInput from '../../components/GoogleTextInput';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

export default function FindRide() {
    const { userAddress, destinationAddress, setDestinationLocation, setUserLocation } = useLocationStore();
    return (
        <RideLayout title="Go Back" snapPoints={["40%", "60%"]}>
            <Text className='text-lg font-JakartaSemiBold mb-3'>From</Text>
            <GoogleTextInput
                icon={icons.target}
                initialLocation={userAddress}
                containerStyle='bg-neutral-100'
                textInputBackgroundColor='#f5f5f5'
                handlePress={(location) => { setUserLocation(location) }}
            />
            <Text className='text-lg font-JakartaSemiBold mb-3'>To</Text>
            <GoogleTextInput
                icon={icons.map}
                initialLocation={destinationAddress}
                containerStyle='bg-neutral-100'
                textInputBackgroundColor='transparent'
                handlePress={(location) => { setDestinationLocation(location) }}
            />
            <CustomButton
                title='Find now'
                onPress={() => { router.push("/(root)/confirm-ride") }}
                className='mt-10'
            />
        </RideLayout>
    )
}