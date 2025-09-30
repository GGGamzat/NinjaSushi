'use client';
import { useState } from 'react';

import RegisterationModal from '../components/RegisterationModal.jsx';

const Header = () => {
    let [profileOpen, setProfileOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <header className="header">
        <div className="header__container">
          <div className="logo">
            <img src="/img/icons/logo__1.svg" alt="" className="logo__1" />
            <div className="logo_text">
              <img src="/img/icons/logo__2.svg" alt="" className="logo__2" />
              <img src="/img/icons/logo__3.svg" alt="" className="logo__3" />
            </div>
          </div>
          {/* <img src="/img/icons/logo.svg" alt="" className="logo" /> */}
          <nav className="nav__menu">
            <div className="location_btns">
              <button className="city__btn"><img src="/img/icons/country.svg" alt="" />Москва</button>
              <button className="lang__btn">RU</button>
            </div>
            <ul className="menu">
              <li className="menu__item"><a href="" className="menu__link">Главная</a></li>
              <li className="menu__item"><a href="" className="menu__link">Доставка</a></li>
              <li className="menu__item"><a href="" className="menu__link">О нас</a></li>
              <li className="menu__item"><a href="" className="menu__link">Новости</a></li>
              <li className="menu__item">
                <a href="" className="menu__link menu__number">
                  <img src="/img/icons/phone.svg" alt="" />
                  <span>+38 097 699 34 38</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="block__interaction">
            <button className="interaction-btn short-btn"><img src="/img/icons/bell.svg" alt="" /></button>
            <button className="interaction-btn short-btn"><img src="/img/icons/heart.svg" alt="" /></button>

            <button onClick={() => setProfileOpen(prev => !prev)} className={`interaction-btn short-btn profile-btn ${profileOpen && 'active'}`}>
              <img src="/img/icons/profile.svg" alt="" />
            </button>

            {profileOpen && (
              <div className="offer-auth">
                <div className="offer-auth__upper">
                  <h3>Войдите в аккаунт</h3>
                  <button className="close-btn" onClick={() => setProfileOpen(false)}><img src="/img/icons/close-icon.svg" alt="" /></button>
                </div>
                <div className="offer-auth__low">
                  <button className="signin-btn">Войти</button>

                  <button onClick={() => setSignupOpen(true)} className="signup-btn">Регистрация</button>

                  {signupOpen && (
                    <RegisterationModal onClose={handleCloseModal} />
                  )}

                </div>
              </div>
            )}

            <button className="interaction-btn long-btn cart-btn">
              <span>Корзина</span>
              <img src="/img/icons/cart.svg" alt="" />
            </button>

            <button onClick={() => setOpenMenu(true)} className="menu__btn">
              <img src="/img/icons/menu__btn.svg" alt="" />
            </button>

            {openMenu && (
              <div className="burger-menu">
                <div className="burger-menu__container">
                  <div className="burger-menu__upper">
                    <h3>Меню</h3>
                    <button onClick={() => setOpenMenu(false)} className="menu__close-btn"><img src="/img/icons/menu__close-btn.svg" alt="" /></button>
                  </div>
                  <div className="burger-menu__block">
                    <div className="burger-menu__items">
                      <button>Главная</button>
                      <button>Доставка</button>
                      <button>О нас</button>
                      <button>Новости</button>
                    </div>
                    <div className="burger-menu__categories"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    );
}

export default Header;