import erro404 from "./error/404.png";
import styles from "./error/error.module.css";
import Link from "next/link";
import Image from "next/image";
import { ArrowBack } from "@/components/Icons/ArrowBack";

export default function page() {
  return (
    <div className={styles.errorBlock}>
      <Image src={erro404} alt="Imagem de um robo realista decepcionado por não encontrar a página" />
      <h2 className={styles.errorTitle}>OPS! Página não encontrada.</h2>
      <p>Você pode voltar ao feed e continuar buscando projetos incríveis!</p>
      <Link href="/">Voltar ao feed <ArrowBack color="#BFFFC3" /></Link>
    </div>
  )
}
