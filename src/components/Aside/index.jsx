import Image from 'next/image';
import styles from './aside.module.css';
import logo from './logo.svg';

const Aside = () => {
  return (
    <aside className={styles.aside}>
      {/* <img src="/logo.svg" alt="Logo da Code Connect"/> */}
      <Image src={logo} alt='Logo da Code Connect' />
    </aside>
  );
}

export default Aside;
