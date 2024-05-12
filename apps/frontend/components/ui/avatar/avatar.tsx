import Link from "next/link";
import styles from "./avatar.module.css";
import Image from 'next/image'

interface AvatarProps {
  id: number;
  img?: string;
  firstName: string;
  lastName: string;
}

export const Avatar = ({ id, img, firstName, lastName }: AvatarProps) => {
  const initials = firstName[0] + lastName[0];
  const fullName = `${firstName} ${lastName}`;

  return (
    <Link href={`/user/${id}`} className={styles.avatar}>
      {/* TODO: make sure img is ~64x64px */}
      {img ? 
        <Image  src={img} alt={fullName} /> 
         : <strong>{initials}</strong>}
    </Link>
  );
};
