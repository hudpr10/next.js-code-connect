import Image from "next/image";
import Avatar from "../Avatar";

const CardPost = ({ post }) => {
  return (
    <article>
      <header>
        <figure>
          <Image src={post.cover} width={438} height={133} />
        </figure>
      </header>
      <main>
        <h3>{post.title}</h3>
        <p>{post.slug}</p>
      </main>
      <footer>
        <Avatar 
          imageSrc={post.author.avatar} 
          name={post.author.username} 
        />
      </footer>
    </article>
  );
}

export default CardPost;
