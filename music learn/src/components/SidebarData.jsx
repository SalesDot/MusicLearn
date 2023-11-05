import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs'

export const SidebarData = [
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
    title: 'MySongs',
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
