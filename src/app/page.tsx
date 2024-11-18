import React from "react";
import HomePage from "./_components/HomePage";
import NavBar from "./_components/NavBar";

function RootPage() {
  return (
    <main className="max-w-10xl mx-auto">
      <NavBar />
      <HomePage />
    </main>
  );
}

export default RootPage;
