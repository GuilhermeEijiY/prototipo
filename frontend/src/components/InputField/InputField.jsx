import styles from "./InputField.module.css"

function InputField({
  id,
  label,
  name,
  value,
  onChange,
  type = "number",
  placeholder,
  min,
  step = "any",
  required = true,
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        required={required}
        className={styles.input}
      />
    </div>
  )
}

export default InputField
