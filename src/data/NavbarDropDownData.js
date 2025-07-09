// NavbarDropdownData.js

const NavbarDropdownData = [
  {
    title: "Sign in with another account",
    key: "signInAnother",
  },
  {
    title: "Request HR Role",
    key: "requestHR",
    condition: (role) => role === "Mentor",
  },
  {
    title: (isDark) => (isDark ? "Light Mode ☀️" : "Dark Mode 🌙"),
    key: "toggleTheme",
  },
  {
    title: "Log Out",
    key: "logout",
  },
  {
    title: "Change password",
    key: "changePassword",
    path: "/change-password",
  },
  {
    title: "Delete Account",
    key: "deleteAccount",
    className:
      "w-full text-left px-4 py-2 cursor-pointer bg-secondary hover:bg-red-700 text-white rounded-b-lg",
  },
];

export default NavbarDropdownData;
