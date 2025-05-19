import Image from "next/image";
import Avatar from "../Avatar";

const CardPost = ({ post }) => {
  return (
    <article>
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
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </main>
      <footer>
        <Avatar 
          imgSrc={post.author.avatar} 
          name={post.author.username} 
        />
      </footer>
    </article>
  );
}

export default CardPost;
