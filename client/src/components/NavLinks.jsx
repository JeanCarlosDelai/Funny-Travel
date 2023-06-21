import { NavLink } from 'react-router-dom';
import { linksUser, linksAdmin } from '../utils/links';
import {getRoleFromLocalStorage} from '../utils/localStorage'

const NavLinks = ({ toggleSidebar}) => {
  const role = getRoleFromLocalStorage()
  let baseLinks;
  if(role !== 'admin') {
    baseLinks = linksUser();
  }else{
    baseLinks = linksAdmin();
  }
  
    return (
    <div className='nav-links'>
      {
      baseLinks.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={toggleSidebar}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;