import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "../../constants";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import OAuth from "../../components/OAuth";

const SignIn = () => {

  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [from, setFrom] = useState({
    name: "",
    email: "",
    password: ""
  })


  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: from.email,
        password: from.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, from.email, from.password])

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[250px]"
          />
          <Text className="text-2xl text-black font-JakartaBold absolute bottom-5 left-5">
            Welcome👋
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter Your Email"
            icon={icons.email}
            value={from.email}
            onChangeText={(value) => { setFrom({ ...from, email: value }) }}
          />
          <InputField
            label="Password"
            placeholder="Enter Your Password"
            icon={icons.lock}
            value={from.password}
            onChangeText={(value) => { setFrom({ ...from, password: value }) }}
            secureTextEntry={true}
          />
          <CustomButton
            title="Sing In"
            className="mt-6"
            onPress={onSignInPress}
          />
          <OAuth />

          <Link href={'/sign-up'} className="text-lg text-center text-general-200 mt-5">
            <Text>Don't have an account?</Text>
            <Text className="text-primary-500"> Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignIn;
