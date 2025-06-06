import React from "react";

const OTPInputBox = ({ id, previousId, nextId, value, onValueChange, handleSubmit }) => {
  const handleKeyUp = (e) => {
    const key = e.key;

    if (key === "Backspace" || key === "ArrowLeft") {
      const prev = document.getElementById(previousId);
      if (prev) prev.focus();
    } else if ((key >= "0" && key <= "9") || key === "ArrowRight") {
      const next = document.getElementById(nextId);
      if (next) {
        next.focus();
      } else {
        const group = document.getElementById("OTPInputGroup");
        if (group?.dataset?.autosubmit === "true") {
          handleSubmit();
        }
      }
    }
  };

  return (
    <input
      id={id}
      name={id}
      type="text"
      inputMode="numeric"
      className={`w-10 h-12 text-center text-xl border border-gray-400 rounded mx-1
        ${value === "" ? "bg-gray-200 text-gray-500" : "bg-white text-black"}`}
      value={value}
      maxLength={1}
      onChange={(e) => onValueChange(id, e.target.value.replace(/[^0-9]/g, ""))}
      onKeyUp={handleKeyUp}
    />
  );
};

export default OTPInputBox;
