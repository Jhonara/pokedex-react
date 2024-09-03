import React from 'react';
import css from './header.module.scss';
import imgLogo from '../../../assets/pokemon_logo.png';

export const Header = () => {
    return (
        <nav className={css.header}> 
            <div className={css.div_header}>
                <div className={css.div_logo}>
                    <img src={imgLogo} alt='Logo'></img>
                </div>
                <div className={css.div_search}>
                    <input type='search' />
                </div>
 
            </div>
        </nav>

    )
}
