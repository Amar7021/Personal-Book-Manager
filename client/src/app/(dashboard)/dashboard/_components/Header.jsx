"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, LayoutDashboard, LibraryBig, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/slices/authSlice";
import { useLogout } from "@/hooks/auth";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { mutate, isPending } = useLogout({
    onSuccess: (data) => {
      dispatch(logout());
      toast.success(data.message);
      router.replace("/login");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <BookOpen className="size-5" />
          Personal Book Manager
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/dashboard"
            className={`rounded-md px-4 py-2 text-sm transition ${
              pathname === "/dashboard"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard className="size-4" />
              Dashboard
            </span>
          </Link>
          <Link
            href="/books"
            className={`rounded-md px-4 py-2 text-sm transition ${
              pathname === "/books"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-2">
              <LibraryBig className="size-4" />
              Books
            </span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            disabled={isPending}
            onClick={() => mutate()}
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
