import { Search } from "../Icons/Search";
import styles from "./headerinput.module.css";

const HeaderInput = () => {
  return (
    <form className={styles.headerContainer} action="/">
      <div className={styles.inputAndIcon}>
        <Search />
        <input 
          name="q"
          type="text" 
          placeholder="Digite o que você procura" 
        />
      </div>
      <button className={styles.button}>Buscar</button>
    </form>
  )
}

export default HeaderInput;
