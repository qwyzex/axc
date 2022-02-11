import styles from '../styles/AnchorButton.module.sass';

export interface AnchorButtonProps {
	// functionallity
	to: string;
	text: string;
	newtab?: boolean;

	// styles
	color?: string;
	thickness?: number;

	primary?: boolean;
	invertHover?: boolean;
	invertClick?: boolean;
	dark?: boolean;
	light?: boolean;
	shadow?: boolean;
	shadowHover?: boolean;
	shadowClick?: boolean;
	italic?: boolean;
	bold?: boolean;
}

const AnchorButton = (props: AnchorButtonProps) => {
	return (
		<a
			href={props.to}
			target={props.newtab ? '_blank' : '_self'}
			rel="noreferrer"
			className={`
                ${styles.container} 
                ${props.primary && styles.primary}
                ${props.invertHover && styles.invertHover}
                ${props.invertClick && styles.invertClick}
                ${props.dark && styles.dark}
                ${props.light && styles.light}
                ${props.shadow && styles.shadow}
                ${props.shadowHover && styles.shadowHover}
                ${props.shadowClick && styles.shadowClick}
            `}
			// prettier-ignore
			style={{
                // @ts-ignore
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
                fontStyle: props.italic ? "italic" : "normal",
                fontWeight: props.bold ? "bold" : "normal",
            }}
		>
			{props.text}
		</a>
	);
};

export default AnchorButton;
