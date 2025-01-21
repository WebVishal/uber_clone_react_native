import { ActivityIndicator, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useDriverStore, useLocationStore } from '../store'
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from '../lib/map'
import { Driver, MarkerData } from '../types/type'
import { icons } from '../constants'
import { fetchAPI, useFetch } from '../lib/fetch'
import MapViewDirections from 'react-native-maps-directions'




export default function Map1() {
    const { userLatitude, userLongitude, destinationLatitude, destinationLongitude } = useLocationStore()
    const { data: drivers, loading, error } = useFetch<Driver>("/(api)/driver")
    const { selectedDriver, setDrivers } = useDriverStore()

    const [markers, setMarkers] = useState<MarkerData[]>([])


    const region = calculateRegion(
        {
            userLatitude,
            userLongitude,
            destinationLatitude,
            destinationLongitude
        })

    useEffect(() => {
        if (Array.isArray(drivers)) {

            if (!userLatitude || !userLongitude) return
            const newMarker = generateMarkersFromData({ data: drivers, userLongitude, userLatitude })
            setMarkers(newMarker)
        }
    }, [drivers, userLatitude, userLongitude])

    useEffect(() => {
        if (markers.length > 0 && destinationLatitude && destinationLongitude) {
            calculateDriverTimes({
                markers,
                userLongitude,
                userLatitude,
                destinationLatitude,
                destinationLongitude,
            }).then((drivers) => {
                setDrivers(drivers)
            })
        }
    }, [markers, destinationLatitude, destinationLongitude])
    
    if (loading || !userLatitude || !userLongitude) {
        return <View className='w-full flex justify-center items-center bg-white h-full'>
            <ActivityIndicator size="small" color="#000" />
        </View>
    }
    if (error) {
        return <View className='w-full flex justify-center items-center'>
            <Text>Error:{error}</Text>
        </View>

    }
    return (
        <>
            <MapView
                provider={PROVIDER_GOOGLE}
                className='w-full h-full'
                tintColor='black'
                //mapType={"mutedStandard"}
                showsPointsOfInterest={false}
                initialRegion={region}
                showsUserLocation={true}
                userInterfaceStyle="light"
            >

                {markers.map((marker, index) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.title}
                        image={
                            selectedDriver === +marker.id ? icons.selectedMarker : icons.marker
                        }
                    />
                ))}
                {
                    destinationLatitude && destinationLongitude && (
                        <>
                            <Marker
                                key="destination"
                                coordinate={{
                                    latitude: destinationLatitude,
                                    longitude: destinationLongitude
                                }}
                                title="Destination"
                                icon={icons.pin}
                            />
                            <MapViewDirections
                                origin={{
                                    latitude: userLatitude!,
                                    longitude: userLongitude!,
                                }}
                                destination={{
                                    latitude: destinationLatitude!,
                                    longitude: destinationLongitude!,
                                }}
                                apikey={process.env.EXPO_PUBLIC_PLACES_API_KEY}
                                strokeColor='#2F80ED'
                                strokeWidth={4}
                            />
                        </>
                    )
                }

            </MapView>
        </>

    )
}