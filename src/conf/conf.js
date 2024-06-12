// we are making this folder to avoid glictch while loading 
// this is a good practice as we are importing all our envrionment variables inside a folder

const conf={
    appwriteUrl:String(process.env.REACT_APP_APPWRITE_URL),
    appwriteDatabaseid: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteProjectid: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteCollectionid:String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketid:String(process.env.REACT_APP_APPWRITE_BUCKET_ID)
}

export default conf;