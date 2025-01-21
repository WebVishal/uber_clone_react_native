import { useAuth, useUser } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RideCard from '../../../components/RideCard'
import { icons, images } from '../../../constants'
import { ActivityIndicator } from 'react-native'
import GoogleTextInput from '../../../components/GoogleTextInput'
import Map1 from '../../../components/Map1'
import { useLocationStore } from '../../../store'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { fetchAPI } from '../../../lib/fetch'


export default function Page() {
    const { user } = useUser()
    const { signOut } = useAuth();
    const { setUserLocation, setDestinationLocation } = useLocationStore();
    const loading = false

    const [hasPermissions, setHasPermissions] = useState(false);
    const [recentRides, setRecentRides] = useState([]);
    const handleSignOut = () => {
        signOut();
        router.replace("/(auth)/sign-in");
    };

    const handleDestinationPress = (
        location: {
            latitude: number,
            longitude: number,
            address: string

        }) => {
        setDestinationLocation(location)
        router.push("/(root)/find-ride")
    }

    useEffect(() => {

        const recentRides = async () => {
            const rides = await fetchAPI(`/(api)/ride/${user.id}`)
            setRecentRides(rides?.data)
        }


        const requestPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setHasPermissions(false)
            }
            let location = await Location.getCurrentPositionAsync();
            const address = await Location.reverseGeocodeAsync({
                latitude: location?.coords?.latitude!,
                longitude: location?.coords?.longitude!,
            });
            setUserLocation(
                {
                    latitude: location?.coords?.latitude,
                    longitude: location?.coords?.longitude,
                    address: `${address[0].name}, ${address[0].region},${address[0].postalCode}`
                }
            )

            setHasPermissions(true)
        }
        requestPermission()
        recentRides()
    }, [])

    return (
        <SafeAreaView className='bg-general-500'>
            <FlatList
                data={recentRides}
                renderItem={({ item }) => <RideCard ride={item} />}
                className='px-5'
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                ListEmptyComponent={() => (
                    <View className="flex flex-col items-center justify-center">
                        {!loading ? (
                            <>
                                <Image
                                    source={images.noResult}
                                    className="w-40 h-40"
                                    alt="No recent rides found"
                                    resizeMode="contain"
                                />
                                <Text className="text-sm">No recent rides found</Text>
                            </>
                        ) : (
                            <ActivityIndicator size="small" color="#000" />
                        )}
                    </View>
                )}
                ListHeaderComponent={
                    <>
                        <View className="flex flex-row items-center justify-between pt-4">
                            <Text className="text-xl capitalize font-JakartaExtraBold">
                                Welcome, {user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0].slice(0, 7)}...👋
                            </Text>
                            <TouchableOpacity
                                onPress={handleSignOut}
                                className="justify-center items-center w-10 h-10 rounded-full bg-white shadow-lg shadow-neutral-300"
                            >
                                <Image source={icons.out} className="w-4 h-4" />
                            </TouchableOpacity>
                        </View>

                        <GoogleTextInput
                            containerStyle="bg-white shadow-md shadow-neutral-300 mt-3"
                            handlePress={handleDestinationPress}
                        />

                        <>
                            <Text className="text-lg font-JakartaBold mt-5 mb-3">
                                Your current location
                            </Text>
                            <View className="flex flex-row items-center bg-transparent h-[300px]">
                                <Map1 />
                            </View>
                        </>

                        <Text className="text-xl font-JakartaBold mt-5 mb-3">
                            Recent Rides
                        </Text>
                    </>
                }
            />
        </SafeAreaView>
    )
}