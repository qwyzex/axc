export const changelog = [
    {
        version: "1.0.0",
        date: "January 22th 2022",
        description: "Initialize release",
        feature: [
            {
                name: "Account Info Component",
                description:
                    "User can see who they were logged-in as, can be accessed from the menu.",
            },
            {
                name: "App Info Component",
                description:
                    "User can see the App's information, the version and source code link. can be accessed from the menu.",
            },
            {
                name: "Okay Landing Page",
                description: "Built a landing page for new user.",
            },
            {
                name: "Fully Functional Skeleton",
                description: "Fully functional messaging app, it works",
            },
            {
                name: "Delete Message",
                description:
                    "User can delete message if the message UID and User's UID is equal.",
            },
            {
                name: "Custom Confirmation Block",
                description: "",
            },
        ],
    },
];

// async function postData() {
//     const data = changelog;
//     const response = await fetch("/data", {
//         method: "POST",
//         body: JSON.stringify(data),
//     });

//     const result = await response.text();
//     console.log(result);
// }

// postData();
