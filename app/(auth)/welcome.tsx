import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { onboarding } from "../../constants";
import CustomButton from "../../components/CustomButton";


const Home = () => {

  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-black">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end"
      >
        <Text className="text-white text-md font-JakartaBold pr-5">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {
          onboarding.map((items) => (
            <View key={items.id} className="flex justify-center items-center p-5">
              <Image
                source={items.image}
                resizeMethod="auto"
                className="w-full h-[320px]"
              />
              <View className="flex justify-center flex-row items-center w-full">
                <Text className="text-white font-bold mx-10 text-center text-3xl ">{items.title}</Text>
              </View>
              <Text className="text-[#858585] mt-3 font-JakartaSemiBold mx-10 text-center text-lg ">{items.description}</Text>
            </View>
          )
          )
        }
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-11/12 my-2"
        onPress={() => {
          isLastSlide ? router.replace("/(auth)/sign-up") : swiperRef.current?.scrollBy(1);
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
