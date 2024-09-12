import { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";

import { ROUTES } from "@/constants/routes";

const TabLayout = () => {
  // hooks
  const router = useRouter();

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
