import { PiSmileySad } from "react-icons/pi";
import css from './NotFoundPage.module.css';

export const NotFoundPage = ({ children }) => {
  return (
    <div className={css.container}>
      <PiSmileySad />
      <p>{children}</p>
    </div>
  );
};
