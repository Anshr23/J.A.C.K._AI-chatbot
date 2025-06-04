import { Link } from "react-router-dom";

type Props = {
    to: string; 
    children: React.ReactNode;
    onClick?: () => Promise<void>;
    className?: string; // for extra styling if needed
};

const NavLink = (props: Props) => {
  return (
    <Link
        className={`navLink ${props.className || ""}`}
        to={props.to}
        onClick={props.onClick}
    > 
      {props.children}
    </Link>
  )
}

export default NavLink;

/*
import { Link } from "react-router-dom";
import styles from './index.module.css';

type Props = {
    to: string; 
    bg: string; 
    text: string; 
    textColor: string;
    onClick?: () => Promise<void>;
};

const NavLink = (props: Props) => {
  return (
    <Link
        className={styles.navLink}
        to={props.to}
        /* style={{ background: props.bg, color: props.textColor }} 8 /
        > 
        {props.text} 
        </Link>
      )
    }
    export default NavLink
*/