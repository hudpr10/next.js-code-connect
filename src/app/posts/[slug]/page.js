import logger from "@/logger";
import { remark } from 'remark';
import html from 'remark-html';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import CardPost from "@/components/CardPost";
import styles from "./page.module.css";
import db from "../../../../prisma/db";
import { redirect } from "next/navigation";

// async function getPostBySlug(slug) {
//   try {
//     const response = await fetch(`http://localhost:3042/posts?slug=${slug}`);
//     const responseJson = await response.json();
//     const post = responseJson[0];

//     if(!response.ok) {
//       logger.error("Ops, ocorreu um erro na busca pelo post.");
//       return {};
//     }

//     if(responseJson.length === 0) {
//       logger.error("Ops, post inexistente.");
//       return {};
//     }

//     const processedContent = await remark().use(html).process(post.markdown);

//     const window = new JSDOM('').window;
//     const purify = DOMPurify(window);
//     const sanitized = purify.sanitize(processedContent.toString());

//     post.markdown = sanitized;

//     return post;
//   } catch(e) {
//     logger.error("Ops, ocorreu um erro na busca pelo post.");
//   }
// }

async function getPostBySlug(slug) {
  try {    
    const post = await db.post.findFirst({
      where: { slug },
      include: { author: true }
    });

    if(!post) {
      throw new Error("Post não encontrado, slug: " + {slug})
    }

    const processedContent = await remark().use(html).process(post.markdown);

    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const sanitized = purify.sanitize(processedContent.toString());

    post.markdown = sanitized;

    return post;
  } catch(e) {
    logger.error("Ops, ocorreu um erro na busca pelo post.", {slug, e});
  }

  // Redireciona o usuario de o post não for encontrado
  redirect('/not-found');
}

const PostPage = async ({ params }) => {
  const post = await getPostBySlug(params.slug);

  return(
    <main className={styles.mainPost}>
      <CardPost post={post} highlight={true} />
      <div>
        <h2 className={styles.codeTitle}>Código</h2>
        <div className={styles.codeBlock} dangerouslySetInnerHTML={{ __html: post.markdown }} />
      </div>
    </main>
  )
}

export default PostPage;
