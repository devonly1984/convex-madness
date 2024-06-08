import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { GeneratePodcastProps } from "@/types";
import {  useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation } from "convex/react";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';
const useGeneratePodcast = ({setAudio,voiceType,voicePrompt,setAudioStorageId}:GeneratePodcastProps)=>{
    //Logic for podcast generation
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const { startUpload } = useUploadFiles(generateUploadUrl);
    const getPodcastAudio = useAction(api.openai.generateAudioAction);  
    const [isGenerating, setIsGenerating] = useState(false)
    const getAudioUrl = useMutation(api.podcasts.getUrl);
    const { toast } = useToast();
    const generatePodcast =async()=>{
      setIsGenerating(true);
      setAudio("");
      if (!voicePrompt) {
        toast({
          title: "No Voice Prompt",
          description: "Please Provide a voice Prompt",
          variant: 'destructive'
        });
        return setIsGenerating(false);
      }
      try {
        const response = await getPodcastAudio({
          voice: voiceType,
          input: voicePrompt,
        });
        const blob = new Blob([response], { type: "audio/mpeg" });
        const filename = `podcast-${uuidv4()}.mp3`;
        const file = new File([blob], filename, { type: "audio/mpeg" });
        const uploaded = await startUpload([file]);
        const storageId = (uploaded[0].response as any).storageId;
        setAudioStorageId(storageId);
        const audioUrl = await getAudioUrl({ storageId });
        setAudio(audioUrl!);
        setIsGenerating(false);
        toast({
          title: "Generated Successfully",
          description: "Audio Podcast Generated Successfully",
        });
      } catch (error) {
        toast({
          title: "Generation Failed",
          description: "Audio podcast generation failed",
          variant: "destructive",
        });
        setIsGenerating(false);
      }
    }
  
    return {
      isGenerating,
      generatePodcast: generatePodcast,
    };
  }
  export default useGeneratePodcast;