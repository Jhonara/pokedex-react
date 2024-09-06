import React from 'react';
import css from './header.module.scss';
import imgLogo from '../../../assets/pokemon_logo.png';
import * as FaIcons from 'react-icons/fa';


export const Header = ({obtenerSearch}) => {
    return (
        <nav className={css.header}> 
            <div className={css.div_header}>
                <div className={css.div_logo}>
                    <img src={imgLogo} alt='Logo'></img>
                </div>
                <div className={css.div_search}>
                    <div>
                        <FaIcons.FaSearch />
                    </div>
                    <input type='search' 
                    onChange={(e => obtenerSearch(e.target.value))} />
                </div>
 
            </div>
        </nav>

    )
}
