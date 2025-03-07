import {
    Client,
    Account,
    ID,
    Avatars,
    Databases,
    Query,
    Storage,
  } from "react-native-appwrite";
  
  export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.app.farmNation",
    projectId: "67c8863b002156720b74",
    databaseId: "67c9643b00222ce618a6",
    usercollectionsId: "67c9645700142b0f3967",
    productcollectionsId: "67c964660038301c86fb",
    storageBucketId: "67c965a80004638f2847",
  };

  const client = new Client();

  client.