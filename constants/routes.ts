import { Href } from "expo-router";

class Route {
  route: string;

  constructor(route: string) {
    this.route = route;
  }

  getName() {
    const routeParts = this.route.split("/");
    return routeParts[routeParts.length - 1];
  }

  getHref(userParams?: Record<string, string>) {
    const params = new URLSearchParams(userParams || {});
    return `${this.route}?${params.toString()}` as Href;
  }
}

export const ROUTES = {
  notesList: new Route("/(tabs)/notes-list"),
  notesMap: new Route("/(tabs)/notes-map"),
  noteDetails: new Route("/note-details"),
  welcome: new Route("/welcome"),
};
