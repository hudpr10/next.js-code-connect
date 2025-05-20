import logger from "@/logger";
import { remark } from 'remark';
import html from 'remark-html';

async function getPostBySlug(slug) {
  try {
    const response = await fetch(`http://localhost:3042/posts?slug=${slug}`);
    const responseJson = await response.json();
    const post = responseJson[0];

    if(!response.ok) {
      logger.error("Ops, ocorreu um erro na busca pelo post.");
      return {};
    }

    if(responseJson.length === 0) {
      logger.error("Ops, post inexistente.");
      return {};
    }

    const processedContent = await remark()
      .use(html)
      .process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml;

    return post;
  } catch(e) {
    logger.error("Ops, ocorreu um erro na busca pelo post.");
  }
}

const PostPage = async ({ params }) => {
  const post = await getPostBySlug(params.slug);
  console.log(post)


  return(
    <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
  )
}

export default PostPage;
