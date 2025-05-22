import { Search } from "../Icons/Search";
import styles from "./headerinput.module.css";

const HeaderInput = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.inputAndIcon}>
        <Search />
        <input type="text" placeholder="Digite o que você procura" />
      </div>
      <button className={styles.button}>Buscar</button>
    </div>
  )
}

export default HeaderInput;
