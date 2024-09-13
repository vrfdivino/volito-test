import { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "@/constants/theme";
import { ROUTES } from "@/constants/routes";
import Typography from "@/components/Typography";
import { useUserStore } from "@/stores/UserStore";
import LogOutButton from "@/components/LogOutButton";

const TabLayout = () => {
  // hooks
  const router = useRouter();
  const { user } = useUserStore();

  // states
  const [initialRender, setInitialRender] = useState<boolean>(true);

  // effects
  useEffect(() => {
    setInitialRender(false);
  }, []);

  useEffect(() => {
    if (!initialRender) {
      router.push(ROUTES.welcome.getHref());
    }
  }, [initialRender]);

  // render
  return (
    <Tabs
      initialRouteName={ROUTES.notesList.getName()}
      screenOptions={{
        headerRight: () => <LogOutButton />,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.border,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name={ROUTES.notesList.getName()}
        options={{
          title: "List",
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <Typography
              variant={"screenTitle"}
              text={`Hi, ${user?.displayName}!`}
              customStyle={{
                marginLeft: 20,
              }}
            />
          ),
          tabBarLabel: ({ children, color }) => (
            <Typography
              variant={"bodySmall"}
              text={children}
              customStyle={{
                color,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={ROUTES.notesMap.getName()}
        options={{
          title: "Map",
          headerShown: false,
          tabBarLabel: ({ children, color }) => (
            <Typography
              variant={"bodySmall"}
              text={children}
              customStyle={{
                color,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
