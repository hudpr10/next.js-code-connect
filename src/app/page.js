import CardPost from "@/components/CardPost";

async function getAllPosts() {
  try {
    const response = await fetch("http://localhost:3042/posts");

    if(!response.ok) {
      console.log("Ops, alguma coisa ocorreu mal.");
    }

    return response.json();
  } catch(e) {
    console.error("Erro: " + e);
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
