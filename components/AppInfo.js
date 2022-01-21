import styles from "../styles/AppInfo.module.sass";
import CloseButton from "./CloseButton";
import Overlay from "./Overlay";
import { SVGClose } from "./Svg";

const AppInfo = (props) => {
    return (
        <>
            <Overlay blur={true} />
            <div className={`popup ${styles.container}`}>
                <header className={styles.header}>
                    <div>
                        <h1>AXC</h1>
                        <p className="cascade comment">
                            Attemp-X CHAT APP
                        </p>
                    </div>
                    <div>
                        <CloseButton event={props.close} />
                    </div>
                </header>
                <article className={styles.body}>
                    <p>
                        Veniam aliquip incididunt est tempor excepteur
                        incididunt pariatur voluptate elit nostrud
                        labore Lorem nulla.
                    </p>
                </article>
            </div>
        </>
    );
};

export default AppInfo;
