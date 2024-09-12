import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs initialRouteName="notes-list">
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes (list)",
          href: null,
        }}
      />
      <Tabs.Screen
        name="notes-list"
        options={{
          title: "Notes (list)",
        }}
      />
      <Tabs.Screen
        name="notes-map"
        options={{
          title: "Notes (map)",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
