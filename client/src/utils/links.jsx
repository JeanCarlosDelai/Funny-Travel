import { IoBarChartSharp } from "react-icons/io5";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const linksUser = () => {
  const baseLinks = [
    { id: 1, text: "Todas as Viagens", path: "/", icon: <IoBarChartSharp /> },
    { id: 4, text: "Perfil", path: "profile", icon: <ImProfile /> },
  ];
  return baseLinks;
};

const linksAdmin = () => {
  const baseLinks = [
    { id: 1, text: "Todas as Viagens", path: "/", icon: <IoBarChartSharp /> },
    {
      id: 2,
      text: "Minhas Viagens",
      path: "all-travels",
      icon: <MdOutlineTravelExplore />,
    },
    {
      id: 3,
      text: "Adicionar nova Viagem",
      path: "add-travel",
      icon: <FaWpforms />,
    },
    { id: 4, text: "Perfil", path: "profile", icon: <ImProfile /> },
  ];
  return baseLinks;
};

export {linksUser, linksAdmin};
