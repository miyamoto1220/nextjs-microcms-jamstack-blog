import { createClient } from "microcms-js-sdk";

export const client = createClient({
   serviceDomain : "blog-sotuten",
   apiKey : process.env.API_KEY,
})