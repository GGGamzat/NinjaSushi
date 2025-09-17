import Header from '../components/Header.jsx';
import Slider from '../components/Slider.jsx';

const slides = [
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
];

export default function Home() {
  return (
    <div className="wrapper">
      <Header></Header>

      <div className="header-categories">
        <nav className="nav-categories">
          <button className="nav-categories__item">
            <div className="item__fill">
              <img src="/img/icons/icon1.svg" alt="" />
              <span>Роллы</span>
            </div>
          </button>
          <button className="nav-categories__item">
            <div className="item__fill">
              <img src="/img/icons/icon2.svg" alt="" />
              <span>Суши</span>
            </div>
          </button>
          <button className="nav-categories__item">
            <div className="item__fill">
              <img src="/img/icons/icon3.svg" alt="" />
              <span>Сеты</span>
            </div>
          </button>
          <button className="nav-categories__item">
            <div className="item__fill">
              <img src="/img/icons/icon4.svg" alt="" />
              <span>Боулы</span>
            </div>
          </button>
          <button className="nav-categories__item">
            <div className="item__fill">
              <img src="/img/icons/icon5.svg" alt="" />
              <span>Напитки</span>
            </div>
          </button>
          <button className="nav-categories__item">
            <div className="item__fill">
              <img src="/img/icons/icon6.svg" alt="" />
              <span>Соусы</span>
            </div>
          </button>
        </nav>
      </div>
      {/* <img src="/img/5.jpg" alt="" className="test"/> */}

      {/* <Slider></Slider> */}
      <Slider slides={slides} autoPlay={true} interval={4000} />
    </div>
  );
}
