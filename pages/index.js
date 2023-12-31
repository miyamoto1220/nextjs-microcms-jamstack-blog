import { client } from "../libs/client";
import Link from "next/link";
import styles from "../src/app/Home.module.scss";

//SSG
export const getStaticProps = async () => {
   const data = await client.get({ endpoint: "blog" });
   console.log(data);
   return {
      props: {
         blog: data.contents,
      },
   }
}

export default function Home({ blog }) {
   return (
      <div>
         <div>
            <ul>
               <li>aaa</li>
               <li>iii</li>
            </ul>
         </div>
         <div>
            {blog.map((blog) => (
               <li key={blog.id}>
                  <Link href={`blog/${blog.id}`}>
                     {blog.title}
                  </Link>
                  {blogItem.mainImage && (
                     // メイン画像が存在する場合は表示
                     <img
                        src={blogItem.mainImage.url}
                        alt={blogItem.mainImage.alt}
                        className={styles.mainImage}
                     />
                  )}
               </li>
            ))}
         </div>
      </div>
   );
}