import NavLinks from "./NavLinks";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useSelector } from "react-redux";

const BigSidebar = () => {
  const { isSidebarOpen, user } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks email={user.email} />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
