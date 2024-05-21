import React, { FC } from "react";

// ** Third Part Imports
import { Link } from "react-router-dom";

interface Props {
  name: string;
  url: string;
}

const NavItem: FC<Props> = (props) => {
  const { name, url } = props;

  return (
    <li className="nav-item py-10 flex items-center text-dark-grayish-blue hover:text-very-dark-blue transition duration-300">
      <Link to={url} className="h-full flex items-center">
        {name}
      </Link>
    </li>
  );
};

export default NavItem;
