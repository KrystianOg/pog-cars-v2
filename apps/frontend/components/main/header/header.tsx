import styles from "./header.module.css";
import { Avatar } from "@/components/ui/avatar/avatar";

export const Header = () => {
  // TODO: get user id
  const user = {
    id: 1,
    firstName: "Krystian",
    lastName: "Ogonowski",
    imageSrc: undefined,
  };

  const agency = {
    name: "Super pro rental",
  };

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <header className={styles.header}>
      {/* TODO: add logo*/}
      <h2>POG cars</h2>
      {/* TODO: */}
      <div className={styles.user}>
        <Avatar {...user} img={user.imageSrc} />
        <div className={styles.text}>
          <h3>{fullName}</h3>
          <p>{agency.name}</p>
        </div>
      </div>
    </header>
  );
};
