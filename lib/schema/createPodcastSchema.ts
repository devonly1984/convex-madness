import {z} from 'zod';



const createPodCastSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
});
export default createPodCastSchema