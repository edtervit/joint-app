import React from "react";

import styled from "styled-components";
import Profile from "./Profile";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

function Nav() {
  const logOut = useStoreActions((actions) => actions.logOut);
  const isLogged = useStoreState((state) => state.isLoggedIn);
  const hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);
  return (
    <div>
      <Navbar>
        {isLogged && <Profile />}
        {hasSavedTrackLists && (
          <div className="has-profile">
            <Link as={ReactLink} to="/">
              Dashboard
            </Link>
          </div>
        )}
        {isLogged && (
          <p className="logout" onClick={() => logOut()}>
            Logout
          </p>
        )}
      </Navbar>
    </div>
  );
}

export default Nav;

const Navbar = styled.nav`
  background: #fafafa;
  padding: 2rem 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  a {
    color: inherit;
    text-decoration: none;
  }

  .has-profile {
    margin-left: auto;
  }
  p.logout {
    margin-left: 10px;
    cursor: pointer;
  }
`;
