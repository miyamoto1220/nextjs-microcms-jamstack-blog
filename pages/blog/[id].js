import { client } from "../../libs/client.js"
import styles from '../../src/app/Home.module.scss';

//SSG
export const getStaticProps = async (context) => {
   try {
      const id = context.params.id;
      const data = await client.get({ endpoint: "blog", contentId: id });

      console.log("Fetched data:", data);

      return {
         props: {
            blog: data,
         },
      };
   } catch (error) {
      console.error("Error fetching data:", error);
      return {
         props: {
            blog: null,
         },
      };
   }
};
export const getStaticPaths = async () => {
   const data = await client.get({ endpoint: "blog" })

   const paths = data.contents.map((content) => `/blog/${content.id}`);
   return {
      paths,
      fallback: false,
   };
};

export default function BlogId({ blog }) {
   return (
      <main className={styles.main}>
         <h1 className={styles.title}>{blog.title}</h1>
         <p className={styles.publishedAt}>{blog.publishedAt}</p>
         <div dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
            className={styles.post}>
         </div>
      </main>
   );
}