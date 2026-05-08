import styles from "./Button.module.css"

function Button({
  children,
  type = "button",
  onClick,
  fullWidth = false,
  disabled = false,
}) {
  const className = fullWidth ? `${styles.button} ${styles.fullWidth}` : styles.button

  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
