import { View, Text, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import { useStripe } from '@stripe/stripe-react-native';
import { fetchAPI } from '../lib/fetch';
import { PaymentProps } from '../types/type';
import { useLocationStore } from '../store';
import { useAuth } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';
import { images } from '../constants';
import { router } from 'expo-router';


export default function Payment1({
    fullName,
    email,
    driverId,
    rideTime,
    amount }: PaymentProps) {

    const { userId } = useAuth()
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [success, setSuccess] = useState(false)
    const { userAddress, userLatitude,
        userLongitude, destinationAddress,
        destinationLatitude, destinationLongitude } = useLocationStore()

    const initializePaymentSheet = async () => {

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            intentConfiguration: {
                mode: {
                    amount: parseInt(amount) * 100,
                    currencyCode: "USD",
                },
                confirmHandler: async (paymentMethod, _, intentCreationCallback) => {

                    const { paymentIntent, customer } = fetchAPI('/(api)/(stripe)/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: fullName || email.split('@')[0],
                            email: email,
                            amount: amount,
                            paymentMethod: paymentMethod.id

                        })
                    })
                    if (paymentIntent.clientSecret) {

                        const { result } = fetchAPI('/(api)/(stripe)/pay', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                payment_method_id: paymentMethod.id,
                                payment_intent_id: paymentIntent.id,
                                customer_id: customer
                            })
                        })

                        if (result.client_secret) {
                            await fetchAPI('/(api)/ride/create',
                                {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json', },
                                    body: JSON.stringify({
                                        origin_address: userAddress,
                                        destination_address: destinationAddress,
                                        origin_latitude: userLatitude,
                                        origin_longitude: userLongitude,
                                        destination_latitude: destinationLatitude,
                                        destination_longitude: destinationLongitude,
                                        ride_time: rideTime.toFixed(0),
                                        fare_price: parseInt(amount) * 100,
                                        payment_status: 'paid',
                                        driver_id: driverId,
                                        user_id: userId,
                                    })

                                })
                            intentCreationCallback({
                                clientSecret: result.client_secret,
                            })
                        }
                    }



                }
            },
            returnURL: "myapp//Book_ride"

        });
        if (error) {
            console.log("initializePaymentSheet :", error)
        }
    };
    const didTapCheckoutButton = async () => {

        await initializePaymentSheet();

        const { error } = await presentPaymentSheet();

        if (error) {
            console.log(error)
            Alert.alert(`Error Code: ${error.code}`)
        } else {

            setSuccess(true)

        }
    }



    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <View>
            <CustomButton
                title="Book Ride"
                className="mt-5"
                onPress={didTapCheckoutButton}
            />
            <ReactNativeModal isVisible={success} onBackdropPress={() => setSuccess(false)}>
                <View className='flex flex-col items-center justify-center bg-white p-7 rounded-2xl'>
                    <Image
                        source={images.check}
                        className='w-28 h-28 mt-5'
                    />
                    <Text className='text-center text-2xl font-JakartaBold mt-5'>Ride Booked!</Text>
                    <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
                        Thank you for your booking. Your reservation has been successfully
                        placed. Please proceed with your trip.
                    </Text>

                    <CustomButton
                        title="Back Home"
                        onPress={() => {
                            setSuccess(false);
                            router.push("/(root)/(tabs)/home");
                        }}
                        className="mt-5"
                    />

                </View>
            </ReactNativeModal>
        </View>
    )
}