import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <h1 className=" text-left mt-60 max-sm:mt-20  text-7xl max-sm:text-5xl md:text-8xl font-bold mb-6 pb-1 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent leading-right flex flex-col">
            <p>Muaz Hamza</p>
            <p>Leventoğlu</p>
          </h1>

          <div className="ml-5 my-10 flex justify-start space-x-6">
            <button className=" button-2">Contact</button>
            <button className="button-2">Projects</button>
          </div>

          <div className=" max-sm:justify-center justify-between flex">
            <ul className="flex max-sm:flex-col max-sm:justify-start justify-between space-x-5 w-full max-sm:text-left text-gray-400 text-xl space-y-3">
              <li>
                <a href="https://github.com/MHLevent" target="_blank" rel="noopener noreferrer">
                  <img src="/src/assets/github-mark-white.svg" alt="GitHub" className="inline-block w-6 h-6 mr-2" />
                  GitHub/MHLevent
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                  <img src="/src/assets/linkedin.png" alt="LinkedIn" className="inline-block w-6 h-6 mr-2" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <img src="/src/assets/Instagram.png" alt="Instagram" className="inline-block w-6 h-6 mr-2" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="card max-w-lg md:max-w-175 mt-15">
            <p>              
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aperiam expedita consequatur neque eveniet deleniti quia necessitatibus nam similique aliquam. Reiciendis nulla necessitatibus, accusantium eligendi ab corporis repellat sequi suscipit.
              Facilis, asperiores. Distinctio expedita exercitationem incidunt, delectus similique repellendus nulla laboriosam possimus beatae? Iste dolor fuga in excepturi adipisci non sapiente odit necessitatibus mollitia. Aspernatur esse dolores eius natus deserunt!
            </p>
          </div>

        </div>

        <div className="mt-130"></div>
        <div className="card">
          <p className=" max-w-lg md:max-w-175 text-gray-400  text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, praesentium! Rem repellat dolorem quas vel! Sit voluptatum aut a repellat necessitatibus qui optio, quaerat natus impedit. Numquam inventore totam similique!
            Ex magnam velit nemo eum reprehenderit cum labore veniam nobis vero animi quibusdam mollitia similique laborum voluptas harum asperiores debitis molestias repellendus minus, natus excepturi praesentium quasi? Impedit, dolorem delectus!
            Accusantium rerum at, dolorum magnam ut exercitationem laboriosam tempore debitis dignissimos sapiente? Debitis quia adipisci cupiditate consequuntur aliquam corporis, et, voluptates mollitia, reiciendis autem est ad provident labore! Odit, vero!
            Quos illum, adipisci dolorem dolor magnam voluptate delectus culpa explicabo. Nulla ducimus, amet facilis error dolores cupiditate provident similique? Corporis quidem temporibus sequi. Natus, optio dignissimos. Provident vel laudantium nulla?
            Possimus non sunt saepe aperiam cupiditate nostrum numquam quae quasi debitis consequuntur, amet minus alias animi nemo ipsum. Expedita, molestias amet! Culpa eius reprehenderit obcaecati fuga aut dolorem, ipsum est?
            Dolores iure explicabo quas aliquam inventore, totam provident obcaecati soluta natus nostrum, veritatis quos facilis quaerat, rem tempora magni odit ab? Ducimus sunt, architecto quae quia odit magnam atque ipsam!
            Amet culpa sed temporibus inventore enim sunt explicabo sapiente deleniti iure vel perferendis, error molestiae non qui mollitia illum ex eum fuga omnis doloremque debitis ab, rem assumenda natus. Repellat!
            Ex facilis delectus animi, quam iure a, sint illo quo aliquid ducimus suscipit, cum saepe aut et repellendus molestiae sapiente? Vel laborum nesciunt nam in itaque repellat ad illum perspiciatis.
            Commodi, dicta perspiciatis inventore ullam id harum voluptatibus veritatis dolorum ex deleniti! Exercitationem magni porro sunt, numquam sit expedita reiciendis perspiciatis voluptates aspernatur, accusamus commodi natus sapiente debitis quam autem!
            Minus soluta obcaecati reiciendis ut, consequuntur nisi in sunt laudantium maiores eum fugiat voluptates dolorum voluptate ex, molestias velit, quisquam nihil error rem cupiditate culpa totam. Error praesentium culpa accusantium.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis modi quod, sint blanditiis voluptate minus. Labore, veritatis doloremque a ea vero qui nesciunt porro fugiat beatae possimus ex magni? Fugiat!
          </p>
        </div>
        <div className="py-5"></div>
        <div className="flex justify-center">
          <a href="#contact" className="button">
            Contact Me
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
};
  