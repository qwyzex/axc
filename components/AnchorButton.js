import styles from "../styles/AnchorButton.module.sass";

const AnchorButton = (props) => {
    return (
        <a
            href={props.to}
            target={props.newtab && "_blank"}
            className={`
                ${styles.container} 
                ${props.primary && styles.primary}
                ${props.invertHover && styles.invertHover}
                ${props.invertClick && styles.invertClick}
                ${props.dark && styles.dark}
                ${props.light && styles.light}
            `}
            // prettier-ignore
            style={{
                "--color": props.color,
                "--textcolor": props.dark
                    ? "7.8%"
                    : props.light
                    ? "96.1%"
                    : "96.1%",
                backgroundColor: props.color
                    ? "hsl(var(--color), 90%, calc( var(--l) - 6% ))"
                    : "royalblue",
                outlineWidth: props.thickness ? props.thickness + "px" : 3 + "px",
                outlineColor: props.color ? "var(--outline)" : "royalblue",
                fontStyle: props.italic && "italic",
                fontWeight: props.bold && "bold",
            }}
        >
            {props.text}
        </a>
    );
};

export default AnchorButton;
