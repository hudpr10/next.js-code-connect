import Image from "next/image";

const Avatar = ({ imgSrc, name }) => {
  return (
    <ul>
      <li>
        <Image src={imgSrc} alt={`Avatar do(a) ${name}`} width={32} height={32} />
      </li>
      <li>
        @{name}
      </li>
    </ul>
  );
}

export default Avatar;
