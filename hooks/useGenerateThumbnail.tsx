import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useMutation } from "convex/react";
import { Dispatch, SetStateAction, useState } from "react";
interface useGenerateThumbnailProps {
  blob: Blob;
  fileName: string;
  setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  setImage: Dispatch<SetStateAction<string>>;
}
const useGenerateThumbnail =async ({blob,fileName,setImageStorageId,setImage}:useGenerateThumbnailProps)=>{
    const [isImageLoading, setIsImageLoading] = useState(false);
    setIsImageLoading(true);
    setImage('');


    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const { startUpload } = useUploadFiles(generateUploadUrl);
    const getImageUrl = useMutation(api.podcasts.getUrl);
    const {toast} = useToast()
    try {
      const file = new File([blob], fileName, { type: "image/png" });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setImageStorageId(storageId);
      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast({
        title: "Thumbnail generated Successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error generating thumnail",
        variant: "destructive",
      });
    }
}
export default useGenerateThumbnail;