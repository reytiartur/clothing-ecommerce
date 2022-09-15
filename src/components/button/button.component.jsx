import './button.styles.scss'


export const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted"
}

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    return (
        <button disabled={isLoading} className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}{...otherProps}>
            {disabled ? "Processing..." : children}
        </button>
    )
}

export default Button;