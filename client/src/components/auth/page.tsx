import React from "react";
import Login from "./login";
import Signup from "./signup";

export default function Auth() {
  const [activeCard, setActiveCard] = React.useState("login");

  return (
    <>
      {activeCard === "login" ? (
        <Login setActiveCard={setActiveCard} />
      ) : (
        <Signup setActiveCard={setActiveCard} />
      )}
    </>
  );
}
