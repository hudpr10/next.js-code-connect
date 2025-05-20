import logger from "@/logger";

async function getPostBySlug(slug) {
  try {
    const response = await fetch(`http://localhost:3042/posts?slug=${slug}`);
    const responseJson = await response.json();

    if(!response.ok) {
      logger.error("Ops, ocorreu um erro na busca pelo post.");
      return {};
    }

    if(responseJson.length === 0) {
      logger.error("Ops, post inexistente.");
      return {};
    }

    return responseJson[0];
  } catch(e) {
    logger.error("Ops, ocorreu um erro na busca pelo post.");
  }
}

const PostPage = async ({ params }) => {
  const post = await getPostBySlug(params.slug);
  console.log(post)

  return(
    <main>{post.markdown}</main>
  )
}

export default PostPage;
