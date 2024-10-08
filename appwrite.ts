import {Client, Account, ID, Databases, Storage } from 'appwrite'

const client = new Client()
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)


const account = new Account(client);
const databases = new Databases(client);
const storage =  new Storage(client)

//console.log(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
//console.log(account)

export {client, account, databases, storage, ID}
