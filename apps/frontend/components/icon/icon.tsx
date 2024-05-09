import { classnames } from "@/utils/classnames";
import styles from "./icon.module.css";
import {
  Language,
  BuildingOffice,
  QuestionMarkCircle,
  InformationCircle,
  Cog6Tooth,
  ExclamationCircle,
  ExclamationTriangle,
  Bell,
  Cake,
  Map,
  MapPin,
  Moon,
  QrCode,
  Share,
  Star,
  Sun,
  Trash,
  Users,
  User,
  Xmark,
  Bars3,
} from "./paths";

export type Kind =
  | "building-office"
  | "language"
  | "question-mark-circle"
  | "information-circle"
  | "cog-6-tooth"
  | "exclamation-circle"
  | "exclamation-triangle"
  | "bell"
  | "cake"
  | "map"
  | "map-pin"
  | "moon"
  | "qr-code"
  | "share"
  | "star"
  | "sun"
  | "trash"
  | "users"
  | "user"
  | "bars-3"
  | "x-mark";

interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  kind: Kind;
  size?: "sm" | "md" | "lg" | undefined;
}

export const Icon = ({
  kind,
  size = "md",
  ...props
}: IconProps): React.ReactNode => {
  const pathMap: Record<Kind, () => JSX.Element> = {
    "building-office": BuildingOffice,
    language: Language,
    "question-mark-circle": QuestionMarkCircle,
    "information-circle": InformationCircle,
    "cog-6-tooth": Cog6Tooth,
    "exclamation-circle": ExclamationCircle,
    "exclamation-triangle": ExclamationTriangle,
    bell: Bell,
    cake: Cake,
    map: Map,
    "map-pin": MapPin,
    moon: Moon,
    "qr-code": QrCode,
    share: Share,
    star: Star,
    sun: Sun,
    trash: Trash,
    users: Users,
    user: User,
    "x-mark": Xmark,
    "bars-3": Bars3,
  };

  const IconPath = pathMap[kind];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={classnames(props.className, styles[size])}
      {...props}
    >
      <IconPath />
    </svg>
  );
};
