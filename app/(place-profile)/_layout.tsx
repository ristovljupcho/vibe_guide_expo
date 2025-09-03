import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function PlaceProfileLayout(): React.JSX.Element {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
