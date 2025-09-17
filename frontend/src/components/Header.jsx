

const Header = () => {
    return (
        <header className="header">
        <div className="header__container">
          <img src="/img/icons/logo.svg" alt="" className="logo" />
          <nav className="nav__menu">
            <button className="city__btn"><img src="/img/icons/country.svg" alt="" />Москва</button>
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
            <button className="interaction-btn"><img src="/img/icons/bell.svg" alt="" /></button>
            <button className="interaction-btn"><img src="/img/icons/heart.svg" alt="" /></button>
            <button className="interaction-btn"><img src="/img/icons/profile.svg" alt="" /></button>
            <button className="interaction-btn cart-btn">
              <span>Корзина</span>
              <img src="/img/icons/cart.svg" alt="" />
            </button>
          </div>
        </div>
      </header>
    );
}

export default Header;