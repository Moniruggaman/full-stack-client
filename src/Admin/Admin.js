import *as AiIcons from 'react-icons/ai';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import {Link} from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Admin.css';

const Admin = () => {

    const [sidebar, setSidebar] = useState(false);
    
    return (
        < IconContext.Provider value={{ color: '#fff' }}>
            <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className='navbar-toggle'>
                        <Link to='/home' className='menu-bars' onClick={() => setSidebar(!sidebar)}>
                            <AiIcons.AiOutlineClose />
                        </Link>

                    </li>
                    {
                        SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </IconContext.Provider >
    );
};

export default Admin;

