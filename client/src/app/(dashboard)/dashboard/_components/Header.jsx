"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, LayoutDashboard, LibraryBig, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/slices/authSlice";
import { useLogout } from "@/hooks/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { mutate, isPending } = useLogout(dispatch, logout, router);

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div
          className="flex items-center gap-2 font-semibold"
        >
          <BookOpen className="size-5" />
          <span className="hidden sm:inline-flex">Personal Book Manager</span>
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          {/* <Link
            href="/dashboard"
            className={`rounded-md px-4 py-2 text-sm transition bg-primary text-primary-foreground`}
          > */}
          <span
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm transition bg-primary text-primary-foreground`}
          // className="flex items-center gap-2"
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </span>
          {/* </Link> */}
        </nav>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-[12px] font-medium h-7 w-7 text-accent rounded-full bg-muted-foreground inline-flex items-center justify-center">{user?.username.charAt(0).toUpperCase()}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user?.username}</p>
              </TooltipContent>
            </Tooltip>
            {/* <p className="text-[12px] font-medium h-7 w-7 text-accent rounded-full bg-muted-foreground inline-flex items-center justify-center">{user?.username.charAt(0).toUpperCase()}</p> */}
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon"><LogOut className="size-4" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be logged out from this device.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => mutate()} disabled={isPending}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
}
