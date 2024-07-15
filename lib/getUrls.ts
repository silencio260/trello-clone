import { storage } from "@/appwrite"


const getUrls = (image: Image) => {
    const url = storage.getFilePreview(image.bucketId, image.fileId)

    return url
}

export default getUrls