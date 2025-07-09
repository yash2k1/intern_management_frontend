import { createPortal } from "react-dom";

const DropdownPortal = ({ children }) => {
  const el = document.getElementById("dropdown-root");
  return el ? createPortal(children, el) : null;
};

export default DropdownPortal;
