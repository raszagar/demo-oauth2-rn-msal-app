import { ScrollView, View } from "react-native";
import { Route, Routes } from "react-router-native";
import HomeScreen from "../pages/HomeScreen"; //ejemplo de import default
import { PerfilScreen } from "../pages/PerfilScreen"; //ejemplo de import nombrado
import AppBar from "./AppBar";

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppBar />
      <ScrollView style={{ width: '100%' }}>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/profile' element={<PerfilScreen />} />
        </Routes>
      </ScrollView>
    </View>
  );
}

export default Main;
