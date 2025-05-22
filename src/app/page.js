import CardPost from "@/components/CardPost";
import logger from "@/logger";
import styles from "./page.module.css";
import Link from "next/link";
import db from "../../prisma/db";

async function getAllPosts(page, searchTerm) {
  try {
    const where = {}

    if(searchTerm) {
      // Filtragem
      where.title = {
        contains: searchTerm,
        mode: "insensitive"
      }
    }
    const postsPerPage = 6;
    const skipPosts = (page - 1) * postsPerPage;

    // Pega o total de posts
    const totalPosts = await db.post.count({ where });
    // Arredonda pra cima o total de posts divido pela quantidade de posts por pagina
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null; 

    const data = await db.post.findMany({
      // Quantos itens pegar
      take: postsPerPage,

      // Pula os posts
      skip: skipPosts,

      // Filtragem
      where,
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
  const searchTerm = searchParams?.q;

  const { data, prev, next } = await getAllPosts(currentPage, searchTerm);

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
          <Link 
            href={{ pathname: '/', query: { page: prev, q: searchTerm }}} 
            className={prev === null ? styles.disabled : styles.enable}>
              Página anterior
          </Link>
          <span>{currentPage}</span>
          <Link 
            href={{ pathname: '/', query: { page: next, q: searchTerm }}} 
            className={next === null ? styles.disabled : styles.enable}>
              Próxima página
          </Link>
        </footer>
      </main>
  );
}
