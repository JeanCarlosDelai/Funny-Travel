import { IoBarChartSharp } from "react-icons/io5";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = (email) => {
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

  // Verificar permissão do usuário para acessar "Todas as Viagens" (path "/")
  let userLinks = baseLinks;

  if (email !== "admin@admin.com" && email !== "admin2@admin.com") {
    userLinks = baseLinks.filter(
      (link) => link.path === "/" || link.path === "profile"
    );
  }

  return userLinks;
};

export default links;
