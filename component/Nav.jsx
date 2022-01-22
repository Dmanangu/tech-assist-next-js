import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";

//

export { Nav };

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  if (!user) return null;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav" style={{ marginLeft: "80%" }}>
        <NavLink href="/clients" exact className="nav-item nav-link">
          CLIENTS
        </NavLink>
        <NavLink href="/worker" exact className="nav-item nav-link">
          WORKER
        </NavLink>
        <NavLink href="/payments" exact className="nav-item nav-link">
          PAYMENTS
        </NavLink>
        <NavLink href="/support" exact className="nav-item nav-link">
          SUPPORT
        </NavLink>
      </div>
    </nav>
  );
}
