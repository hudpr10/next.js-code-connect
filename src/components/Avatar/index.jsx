import Image from "next/image";

const Avatar = ({ imgSrc, name }) => {
  return (
    <ul>
      <li>
        <Image src={imgSrc} alt={`Foto de perfil de ${name}`} width={32} height={32} />
      </li>
      <li>
        @{name}
      </li>
    </ul>
  );
}

export default Avatar;
