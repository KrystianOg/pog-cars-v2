import styles from './button.module.css'

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "light" 
}

export function Button(props: ButtonProps) {
  return <button className={[styles.button, styles.destructive].join(' ')} {...props}/>
}
