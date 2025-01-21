import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Chat() {
    return <View className='bg-black'>
        <Link href="/sign-in">
            <Text className=''>Chat</Text>
        </Link>
    </View>
}