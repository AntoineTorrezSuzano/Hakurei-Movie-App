import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-dark-200 font-bold ">Hakurei Movie</Text>
        <Link href="/onBoarding">Onboarding</Link>
        <Link
            href={{
                pathname: '/movie/[id]',
                params: { id: 'Touhou' }
            }}>
            Movies
        </Link>
    </View>
  );
}
