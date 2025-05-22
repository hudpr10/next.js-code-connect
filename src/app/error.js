'use client'

import { useEffect } from "react";
import styles from "./error/error.module.css";
import Link from "next/link";
import Image from "next/image";
import error500 from "./error/500.png";
import { ArrowBack } from "@/components/Icons/ArrowBack";

export default function Error({ error }) {
  useEffect(() => {
    console.log(error);
  }, [error])
  
  return (
    <div className={styles.errorBlock}>
      <Image src={error500} alt="Imagem de um robo realista decepcionado por não encontrar a página" />
      <h2 className={styles.errorTitle}>Opa! Um erro ocorreu.</h2>
      <p>Não conseguimos carregar a página, volte para seguir navegando.</p>
      <Link href="/">Voltar ao feed <ArrowBack color="#BFFFC3" /></Link>
    </div>
  )
}