// import Link from "next/link";
import { useState } from "react";
import { auth } from "pages/index";
import styles from "../styles/Header.module.sass";

import { useAuthState } from "react-firebase-hooks/auth";

import Buttons from "./Buttons";
import AppInfo from "./AppInfo";
import {
    SVGAccount,
    SVGBug,
    SVGDollar,
    SVGInfo,
    SVGLogIn,
    SVGLogOut,
    SVGMenu,
} from "./Svg";
import AccountInfo from "./AccountInfo";

export default function Header() {
    const [user] = useAuthState(auth);
    const [openAppInfo, setOpenAppInfo] = useState(false);
    const [openAccountInfo, setOpenAccountInfo] = useState(false);

    const HeaderDropdown = () => {
        return (
            <div>
                {openAppInfo && (
                    <AppInfo
                        close={() => setOpenAppInfo(!openAppInfo)}
                    />
                )}
                {openAccountInfo && (
                    <AccountInfo
                        close={() =>
                            setOpenAccountInfo(!openAccountInfo)
                        }
                    />
                )}
                <div className={styles.headerDropdownWrapper}>
                    <button className={styles.headerDropdownButton}>
                        <SVGMenu />
                    </button>
                    <ul className={styles.listContainer}>
                        {user && (
                            <li className={styles.listItem}>
                                <button
                                    onClick={() =>
                                        setOpenAccountInfo(
                                            !openAccountInfo
                                        )
                                    }
                                >
                                    <SVGAccount />
                                    Account
                                </button>
                            </li>
                        )}
                        <li className={styles.listItem}>
                            <button
                                onClick={() =>
                                    setOpenAppInfo(!openAppInfo)
                                }
                            >
                                <SVGInfo />
                                About
                            </button>
                        </li>
                        <li className={styles.listItem}>
                            <a>
                                <SVGDollar />
                                Donate
                            </a>
                        </li>
                        <li className={styles.listItem}>
                            <a
                                href="https://github.com/qwyzex/axc/issues/new"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <SVGBug />
                                Bug
                            </a>
                        </li>
                        <li className={styles.listItem}>
                            <Buttons
                                className={styles.logOutButton}
                                child={
                                    user ? (
                                        <SVGLogOut />
                                    ) : (
                                        <SVGLogIn />
                                    )
                                }
                            />
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.header}>
            <div>
                <h1>AXC</h1>
            </div>
            <HeaderDropdown />
        </div>
    );
}
