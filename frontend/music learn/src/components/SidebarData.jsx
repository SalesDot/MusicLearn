import React, { useContext } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import { AuthContext } from '../AuthContext';

export const generateSidebarData = () => {
  const { token } = useContext(AuthContext);

  if (token) {
    return [
      {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
      },
      {
        title: 'Progress',
        path: '/Progress',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Songs',
        path: '/MySongs',
        icon: <BsIcons.BsMusicNoteList />,
        cName: 'nav-text'
      },
      {
        title: 'Account',
        path: '/Account',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
      }
    ];
  } else {
    return [
      {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
      },
      {
        title: 'Login',
        path: '/Login',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
      },
      {
        title: 'Register',
        path: '/Register',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
      }
    ];
  }
};
