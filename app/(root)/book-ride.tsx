import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";

import RideLayout from "../../components/RideLayout";
import { icons } from "../../constants";
import { formatTime } from "../../lib/utils";
import { useDriverStore, useLocationStore } from "../../store";
import { StripeProvider } from '@stripe/stripe-react-native';
import Payment from "../../components/Payment";

const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
const BookRide = () => {
    const { user } = useUser();
    const { userAddress, destinationAddress } = useLocationStore();
    const { drivers, selectedDriver } = useDriverStore();


    const driverDetails = drivers?.filter(
        (driver) => +driver.id === Number(selectedDriver),
    )[0];
    return (
        <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.aapnaride.com" // required for Apple Pay
            urlScheme="myapp" // required for 3D Secure and bank redirects
        >

            <RideLayout title="Book Ride" snapPoints={["40%", "100%"]}>
                <>
                    <Text className="text-2xl font-JakartaSemiBold mb-2">
                        Ride Information
                    </Text>

                    <View className="flex flex-col w-full items-center justify-center mt-5">
                        <Image
                            source={{ uri: driverDetails?.profile_image_url }}
                            className="w-20 h-20 rounded-full"
                        />

                        <View className="flex flex-row items-center justify-center mt-2 space-x-2">
                            <Text className="text-lg font-JakartaSemiBold">
                                {driverDetails?.title}
                            </Text>

                            <View className="flex flex-row items-center space-x-0.5">
                                <Image
                                    source={icons.star}
                                    className="w-5 h-5"
                                    resizeMode="contain"
                                />
                                <Text className="text-lg font-JakartaRegular">
                                    {driverDetails?.rating}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View
                        className="flex flex-col w-full items-start justify-center py-2 px-5 rounded-3xl bg-general-600 mt-4">
                        <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                            <Text className="text-base font-JakartaRegular">Ride Price</Text>
                            <Text className="text-base font-JakartaRegular text-[#0CC25F]">
                                ${driverDetails?.price}
                            </Text>
                        </View>

                        <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                            <Text className="text-base font-JakartaRegular">Pickup Time</Text>
                            <Text className="text-base font-JakartaRegular">
                                {formatTime(parseInt(String(driverDetails?.time!)))}
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-between w-full py-3">
                            <Text className="text-base font-JakartaRegular">Distance</Text>
                            <Text className="text-base font-JakartaRegular">
                                {driverDetails?.distance?.text}
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-between w-full py-3">
                            <Text className="text-base font-JakartaRegular">Car Seats</Text>
                            <Text className="text-base font-JakartaRegular">
                                {driverDetails?.car_seats}
                            </Text>
                        </View>
                    </View>

                    <View className="flex flex-col w-full items-start justify-center mt-2">
                        <View
                            className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
                            <Image source={icons.to} className="w-6 h-6" />
                            <Text className="text-base font-JakartaRegular ml-2">
                                {userAddress}
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
                            <Image source={icons.point} className="w-6 h-6" />
                            <Text className="text-base font-JakartaRegular ml-2">
                                {destinationAddress}
                            </Text>
                        </View>
                    </View>
                    <Payment
                        fullName={user?.fullName!}
                        email={user?.emailAddresses[0]?.emailAddress!}
                        amount={driverDetails?.price!}
                        driverId={driverDetails?.id!}
                        rideTime={driverDetails?.time!}
                    />
                </>
            </RideLayout>
        </StripeProvider>
    );
};

export default BookRide;