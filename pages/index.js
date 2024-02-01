import { client } from "../libs/client";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

//SSG
export const getStaticProps = async () => {

   const data = await client.get({
      endpoint: "blog",
      queries: { limit: 100 },
   });
   console.log(data);
   return {
      props: {
         blog: data.contents,
      },
   }
}

// formatDate 関数をコンポーネントの外に定義
const formatDate = (dateString) => {
   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
   const formattedDate = new Date(dateString).toLocaleDateString('ja-JP', options);
   return formattedDate;
};

export default function Home({ blog }) {
   console.log(blog);
   return (
      <div className={styles.body}>
         <div className={styles.inner}>
            <div className={styles.article}>

               {blog.map((blogItem) => (
                  <div className={styles.content} key={blogItem.id}>
                     <Link href={`/blog/${blogItem.id}`} passHref>
                        <div className={styles.flex}>
                           {blogItem.mainImage && (
                              <img className={styles.main_img}
                                 src={blogItem.mainImage.url}
                                 alt={blogItem.mainImage.alt}
                              />
                           )}
                           <div className={styles.article_text}>
                              <p className={styles.article_title}>{blogItem.title}</p>
                              <div className={styles.day}>
                                 <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" height="1em"
                                    viewBox="0 0 512 512">
                                    <path
                                       d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                                 </svg>
                                 <p className={styles.article_day}>{formatDate(blogItem.day)}</p>
                              </div>
                           </div>

                        </div>
                     </Link>
                  </div>
               ))}

            </div>
         </div>
      </div>
   );
}
