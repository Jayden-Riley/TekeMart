import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "auth/login.tsx"),
  route("logout", "auth/logout.ts"),

  route("signup", "auth/signup.tsx"),
  route("auth/confirm", "routes/confirm.ts"),
  route("dashboard", "dashboard/dashboard.tsx", [
    index("dashboard/index.tsx"),
    route("Phones", "dashboard/phones.tsx"),
    // // route("Computers", "dashboard/computers.tsx"),
    // route("Clothing", "dashboard/clothing.tsx"),
    // route("Toys", "dashboard/toys.tsx"),
    // route("Video Games", "dashboard/videoGames.tsx"),
    // route("Jewelry", "dashboard/jewelry.tsx"),
    // route("Pet Supplies", "dashboard/petSupplies.tsx"),
  ]),
] satisfies RouteConfig;
