import styles from '/styles/AppInfo.module.sass';
import { CloseButton, Overlay } from '..';

const AppInfo = ({ close }: any) => {
	return (
		<>
			{/* <Overlay blur={true} /> */}
			<div className={`popup ${styles.container}`}>
				{/* <header className={styles.header}>
					<div>
						<h1>AXC</h1>
						<p className="cascade comment">Attemp-X CHAT APP</p>
					</div>
					<div>
						<CloseButton event={close} />
					</div>
				</header> */}
				<article className={styles.body}>
					<p>
						Veniam aliquip incididunt est tempor excepteur
						incididunt pariatur voluptate elit nostrud labore Lorem
						nulla. Magna aliquip mollit laboris sit voluptate. Qui
						velit sit eu nostrud anim irure do consequat cupidatat
						eu do eiusmod aute commodo. Voluptate ex consequat
						occaecat amet deserunt esse ut ad.
					</p>{' '}
					<p>
						Irure Lorem aliqua minim adipisicing velit incididunt
						cillum cillum officia sit. Cupidatat commodo ex Lorem
						laboris fugiat quis magna ipsum ut eiusmod. Incididunt
						est commodo aute voluptate aute cillum. Et tempor velit
						fugiat voluptate anim labore anim sint. Nisi nulla non
						veniam mollit dolore tempor laborum ex do.
					</p>
				</article>
			</div>
		</>
	);
};

export default AppInfo;
