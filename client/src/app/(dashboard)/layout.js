"use client";
import Loader from "@/components/loader/Loader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "@/hooks/auth";
import { logout, setUser } from "@/redux/slices/authSlice";
import Header from "./dashboard/_components/Header";

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
      router.replace("/login");
    }
  }, [isError, dispatch, router]);

  if (isLoading) {
    return <Loader text={"Loading your library..."} />;
  }

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl p-6">
        {children}
      </main>
    </>
  );
}
