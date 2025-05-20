import Image from "next/image";
import Avatar from "../Avatar";
import styles from './cardpost.module.css';
import Link from "next/link";

const CardPost = ({ post }) => {
  return (
    <article className={styles.article}>
      <header>
        <figure>
          <Image 
            src={post.cover} 
            width={438} 
            height={133} 
            alt={`Imagem do post: ${post.title}`} />
        </figure>
      </header>
      <main>
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <Link href={`/posts/${post.slug}`}>Ver detalhes</Link>
        </div>
        <footer>
          <Avatar
            imgSrc={post.author.avatar} 
            name={post.author.username} 
          />
        </footer>
      </main>
    </article>
  );
}

export default CardPost;
