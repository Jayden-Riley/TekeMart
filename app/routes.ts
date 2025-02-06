import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("logout", "auth/logout.ts"),
  index("routes/home.tsx"),
  route("login", "auth/login.tsx"),
  // route("SearchBar", "component/searchBar.tsx"),

  route("signup", "auth/signup.tsx"),
  route("auth/confirm", "routes/confirm.ts"),
  route("dashboard", "dashboard/dashboard.tsx", [
    index("dashboard/index.tsx"),
    route("Phones", "dashboard/phones.tsx"),
    route("Computers", "dashboard/computers.tsx"),
    route("Electronics", "dashboard/electronics.tsx"),
    route("Toys", "dashboard/toys.tsx"),
    route("Games", "dashboard/games.tsx"),
    route("PetSupplies", "dashboard/pet.tsx"),
    route("Phones/:id", "dashboard/phonesDetails.tsx"),
    route("Computers/:id", "dashboard/computersDetails.tsx"),
    route("Electronics/:id", "dashboard/electronicsDetails.tsx"),
    route("Toys/:id", "dashboard/toysDetails.tsx"),
    route("Games/:id", "dashboard/gamesDetails.tsx"),
    route("PetSupplies/:id", "dashboard/petDetails.tsx"),
    route("cartItems", "dashboard/items.tsx"),
    // route("profiles", "dashboard/profiles.tsx"),
    route("this", "dashboard/this.tsx"),
  ]),
] satisfies RouteConfig;
