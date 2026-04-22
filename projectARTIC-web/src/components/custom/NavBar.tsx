import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="text-white m-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="mr-4">
              <Link to="/">Clock In</Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mr-4">
              <Link to="/entry-list">Entry List</Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mr-4">
              <Link to="/">Look up</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <main className="pt-16"> {children}</main>
      </div>
    </>
  );
}

export default NavBar;
