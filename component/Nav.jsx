import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";
import useStyles from "../utils/styles";
import { AppBar, Toolbar } from "@material-ui/core";
//

export { Nav };

function Nav() {
  const [user, setUser] = useState(null);
  const classes = useStyles();
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
    // <nav className="navbar navbar-expand navbar-dark bg-dark">
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        {/* <div className="navbar-nav"> */}
        <div className={classes.grow}></div>
        <div>
          <NavLink href="/clients" className={classes.brand}>
            CLIENTS
          </NavLink>
          <NavLink href="/worker" className={classes.brand}>
            WORKER
          </NavLink>
          <NavLink href="/payments" className={classes.brand}>
            PAYMENTS
          </NavLink>
          <NavLink href="/support" className={classes.brand}>
            SUPPORT
          </NavLink>
        </div>
        {/* </div> */}
      </Toolbar>
    </AppBar>
    // </nav>
  );
}
