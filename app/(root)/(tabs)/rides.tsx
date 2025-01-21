import { FlatList, Text, View } from 'react-native'
import { fetchAPI } from '../../../lib/fetch'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import RideCard from '../../../components/RideCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Rides() {

    const { userId } = useAuth()
    const [recentRides, setRecentRides] = useState([]);

    useEffect(() => {

        const recentRides = async () => {
            const rides = await fetchAPI(`/(api)/ride/${userId}`)
            setRecentRides(rides?.data)
        }
        recentRides()
    }, [])

    return <SafeAreaView>
        <FlatList
            data={recentRides}
            renderItem={({ item }) => <RideCard ride={item} />}
            className='px-5'
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                paddingBottom: 100
            }}
        />
    </SafeAreaView>
}