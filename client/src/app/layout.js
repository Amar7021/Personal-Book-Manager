import Providers from "@/providers/Providers";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export const metadata = {
  title: "Personal Book Manager",
  description: "Keep your book organized.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
