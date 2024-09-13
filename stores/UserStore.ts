import { flow, SnapshotOut, types } from "mobx-state-tree";
import * as Location from "expo-location";

const UserLocation = types.model({
  latitude: types.number,
  longitude: types.number,
});

const User = types
  .model({
    email: types.string,
    id: types.identifier,
  })
  .views((self) => ({
    get displayName() {
      return self.email.split("@")[0];
    },
  }));

const UserStore = types
  .model({
    loading: types.boolean,
    user: types.maybeNull(User),
    location: types.maybeNull(UserLocation),
  })
  .actions((self) => ({
    init: flow(function* (user) {
      if (!user) return;

      self.loading = true;

      yield Location.requestForegroundPermissionsAsync();
      const { coords } = yield Location.getCurrentPositionAsync({});
      self.location = { ...coords };

      if (user) {
        self.user = { ...user, id: user.uid };
      }

      self.loading = false;
    }),
  }));

const userStore = UserStore.create({
  loading: false,
  user: null,
  location: null,
});

export const useUserStore = () => userStore;
export type IUser = SnapshotOut<typeof User>;
