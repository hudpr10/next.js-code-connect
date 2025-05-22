import CardPost from "@/components/CardPost";
import logger from "@/logger";
import styles from "./page.module.css";
import Link from "next/link";
import db from "../../prisma/db";

// async function getAllPosts(page) {
//   try {
//     const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=6`);
//     const responseJson = await response.json();

//     if(!response.ok) {
//       return [];
//     } else {
//       logger.info("Posts obtidos com sucesso!");
//     }

//     return responseJson;
//   } catch(e) {
//     logger.error("Erro: " + e);
//   }
// }

async function getAllPosts(page) {
  try {
    const postsPerPage = 4;
    const skipPosts = (page - 1) * postsPerPage;

    // Pega o total de posts
    const totalPosts = await db.post.count();
    // Arredonda pra cima o total de posts divido pela quantidade de posts por pagina
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null; 

    const data = await db.post.findMany({
      // Quantos itens pegar
      take: postsPerPage,

      // Pula os posts
      skip: skipPosts,

      // Ordem dos posts, em decrescente
      orderBy: {
        createdAt: 'desc'
      },

      // Inclui o relacionamento com author
      include: {
        author: true
      }
    });

    return { data, prev: prev, next: next };
  } catch(error) {
    logger.error("Falha ao obter posts", { error })
    return { data: [], prev: null, next: null };
  }
}

export default async function Home({ searchParams }) {
  // searchParams são os paramentos de busca na navegação! ?page=1, ?page=2...
  const currentPage = parseInt(searchParams?.page) || 1;
  const { data, prev, next } = await getAllPosts(currentPage);
  console.log(prev);
  console.log(next);
  return (
      <main className={styles.main}>
        {data.map((post) => 
          <CardPost 
            key={post.id} 
            post={post}
          />
        )}
        {/* <Link> funciona como uma tag <a> super poderosa! */}
        <footer className={styles.footer}>
          <Link href={`/?page=${prev}`} className={prev === null ? styles.disabled : styles.enable}>Página anterior</Link>
          <span>{currentPage}</span>
          <Link href={`/?page=${next}`} className={next === null ? styles.disabled : styles.enable}>Próxima página</Link>
        </footer>
      </main>
  );
}
