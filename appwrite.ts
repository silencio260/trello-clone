import {Client, Account, ID, Databases, Storage } from 'appwrite'

const client = new Client()
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)//'664c7233001f18274901');


const account = new Account(client);
const databases = new Databases(client);
const storage =  new Storage(client)

export {client, account, databases, storage, ID}
