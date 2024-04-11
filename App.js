import { StatusBar } from "react-native";
import { NativeRouter } from "react-router-native";
import MainLogin from "./src/components/MainLogin";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NativeRouter>
        <MainLogin />
      </NativeRouter>
    </>
  );
}
