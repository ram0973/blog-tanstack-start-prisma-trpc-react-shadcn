import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "@/components/theme-toggle";
import { Link } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import { AvatarDropdown } from "./avatar-dropdown";
const Navbar = () => {
  
  const { data } = authClient.useSession();
  return (
    <div className="bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />
            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>
          <div className="flex items-center gap-3">
            {!data?.session && (
              <>
                <Button variant="outline" className="hidden sm:inline-flex">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
            <ThemeToggle />
            <AvatarDropdown/>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
