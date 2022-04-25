import { useEffect, useState } from "react";
import { ChangelogDataType } from 'pages/api/changelog';

export default function useChangelog() {
    const [data, setData] = useState<ChangelogDataType[]>();

    useEffect(() => {
        async function x() {
            const res = await fetch('/api/changelog');
            const dat = await res.json();

            setData(dat);
        }
        x()
    }, []);

    return data;
}
