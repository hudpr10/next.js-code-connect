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
    // Inclui o relacionamento com author
    const data = await db.post.findMany({
      include: {
        author: true
      }
    });

    return { data, prev: null, next: null };
  } catch(error) {
    logger.error("Falha ao obter posts", { error })
    return { data: [], prev: null, next: null };
  }
}

export default async function Home({ searchParams }) {
  // searchParams são os paramentos de busca na navegação! ?page=1, ?page=2...
  const currentPage = searchParams?.page || 1;
  const { data, prev, next } = await getAllPosts(currentPage);

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
          <Link href={`/?page=${prev}`} className={next ? styles.disabled : styles.enable}>Página anterior</Link>
          <span>{currentPage}</span>
          <Link href={`/?page=${next}`} className={prev ? styles.disabled : styles.enable}>Próxima página</Link>
        </footer>
      </main>
  );
}
