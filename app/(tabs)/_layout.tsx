import { ROUTES } from "@/constants/routes";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs initialRouteName={ROUTES.notesList.getName()}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes (list)",
          href: null,
        }}
      />
      <Tabs.Screen
        name={ROUTES.notesList.getName()}
        options={{
          title: "Notes (list)",
        }}
      />
      <Tabs.Screen
        name={ROUTES.notesMap.getName()}
        options={{
          title: "Notes (map)",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
