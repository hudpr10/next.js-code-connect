import CardPost from "@/components/CardPost";
import logger from "@/logger";

async function getAllPosts() {
  try {
    const response = await fetch("http://localhost:3042/posts");

    if(!response.ok) {
      logger.error("Ops, alguma coisa ocorreu mal.");
      return [];
    } else {
      logger.info("Posts obtidos com sucesso!");
    }

    return response.json();
  } catch(e) {
    logger.error("Erro: " + e);
  }
}

export default async function Home() {
  const posts = await getAllPosts();

  return (
      <main>
        {posts.map((post) => <CardPost post={post}/> )}
      </main>
  );
}
