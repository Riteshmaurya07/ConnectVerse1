import React, { useContext } from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Screens from './Utils/Screens';
import Profile from './Screens/Profile';
import Home from './Screens/Home';
import Job from './Screens/Job';
import Post from './Screens/Post';
import Notification from './Screens/Notification';
import Network from './Screens/Network';
import Colors from './Utils/Colors';
import { StatusBar } from 'react-native';
import CustomIcon from './Components/CustomIcon';
import HeaderOptions from './Components/HeaderOptions';
import { AuthContext } from './Context/AuthContext';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const JobStack = createNativeStackNavigator();
const PostStack = createNativeStackNavigator();
const NetworkStack = createNativeStackNavigator();
const NotificationStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name={Screens.HOME} component={Home} />
    <HomeStack.Screen name={Screens.PROFILE} component={Profile} />
  </HomeStack.Navigator>
);

// ...other stack screens as in your code

const showTabBar = (route: RouteProp<any, any>): 'none' | 'flex' => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? Screens.HOME;
  return routeName === Screens.PROFILE ? 'none' : 'flex';
};

const header = (
  navigation: BottomTabNavigationProp<any>,
  route: RouteProp<any, any>,
  icon: string,
  title: string,
  iconLeft = '',
  isPostScreen = false,
  isNotificationScreen = false,
) => ({
  title,
  tabBarStyle: { display: showTabBar(route) as 'none' | 'flex' },
  tabBarBadge: isNotificationScreen ? 5 : undefined,
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <CustomIcon
      name={icon}
      size={28}
      color={focused ? Colors.BLACK : Colors.GRAY}
    />
  ),
  header: () => (
    <HeaderOptions
      iconLeft={iconLeft}
      navigation={navigation}
      isPostScreen={isPostScreen}
    />
  ),
});

export default function Routes() {
  const { user, initializing } = useContext(AuthContext)!;
  if (initializing) return null;

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
      {user ? (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: Colors.BLACK,
            tabBarInactiveTintColor: Colors.GRAY,
            tabBarLabelStyle: { fontWeight: 'bold' },
            headerStyle: { elevation: 10 },
          }}>
          <Tab.Screen
            name={Screens.HOME_STACK}
            component={HomeStackScreen}
            options={({ navigation, route }) =>
              header(navigation, route, 'home', 'Home')
            }
          />
          {/* ...other authenticated screens */}
        </Tab.Navigator>
      ) : (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Signup" component={SignupScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
