import { View, Text, FlatList } from 'react-native'
import React from 'react'
import RideLayout from '../../components/RideLayout'
import DriverCard from '../../components/DriverCard'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import { useDriverStore } from '../../store'



export default function ConfirmRide() {

    const { drivers, selectedDriver, setSelectedDriver } = useDriverStore()

    console.log(selectedDriver)
    return (
        <RideLayout title="Choose a Driver" snapPoints={["40%", "90%"]}>
            <FlatList
                data={drivers}
                renderItem={({ item }) => {
                    return <DriverCard
                        selected={selectedDriver}
                        setSelected={() => setSelectedDriver(item.id)}
                        item={item} />
                }}
                ListHeaderComponent={
                    <View className='pb-5'>
                        <Text className='text-lg text-center font-JakartaSemiBold'>
                             <Text className='text-blue-500'>Ready to Hit {drivers[0]?.distance?.text} ?</Text> Select the Right Driver for the Journey!
                        </Text>
                    </View>}
                ListFooterComponent={
                    <View className='mx-10 mt-10'>
                        <CustomButton
                            title='Select Ride'
                            onPress={() => router.push("/(root)/book-ride")}
                            className="bg-blue-500"
                            disabled={selectedDriver==null}
                        />
                    </View>
                }
            />

        </RideLayout>
    )
}