import Link from "next/link.js";
import { client } from "../../libs/client.js"
import styles from "../../styles/Home.module.scss";

//SSG
export const getStaticProps = async (context) => {
   try {
      const id = context.params.id;
      const data = await client.get({
         endpoint: "blog",
         queries: { limit: 100 },
         contentId: id
      });
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
   const data = await client.get({
      endpoint: "blog",
      queries: { limit: 100 },
   })
   const paths = data.contents.map((content) => `/blog/${content.id}`);
   return {
      paths,
      fallback: false,
   };
};

// formatDate 関数をコンポーネントの外に定義
//日時だけを表示する
const formatDate = (dateString) => {
   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
   const formattedDate = new Date(dateString).toLocaleDateString('ja-JP', options);
   return formattedDate;
};

export default function BlogId({ blog }) {
   console.log(blog);
   return (
      <div className={styles.body}>
         <main className={styles.main}>
            <p className={styles.title}>{blog.title}</p>
            <div className={styles.day}>
               <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" height="1em"
                  viewBox="0 0 512 512">
                  <path
                     d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
               </svg>
               <p className={styles.article_day}>{formatDate(blog.day)}</p>
            </div>
            {blog.mainImage && (
               <img className={styles.main_single_img}
                  src={blog.mainImage.url}
                  alt={blog.mainImage.alt}
               />
            )}
            <div dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
               className={styles.post}>
            </div>
            <div className={styles.post_link}>
               <div className={styles.top}>
                  <Link href={`/`}>
                     <p>topへ戻る</p>
                  </Link>
               </div>
            </div>
         </main>
      </div>
   );
}