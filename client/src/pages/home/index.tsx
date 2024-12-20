import Carousel from "./carouserl";

const Home = () => {
  const slides: any[] = [
    "https://www.searchenginejournal.com/wp-content/uploads/2022/08/google-shopping-ads-6304dccb7a49e-sej.png",
    "https://images.ctfassets.net/rxqefefl3t5b/6I2vL9f0IVsDQ8qFgdrxH7/7660c4bab3116a4a04025d5c4802efa5/Virgin-Red-online-shopping-offers.jpg?fl=progressive&q=80",
    "https://img.freepik.com/free-photo/beautiful-smiling-young-blonde-woman-pointing-sunglasses-holding-shopping-bags-credit-card-pink-wall_496169-1506.jpg",
    "https://visit.antwerpen.be/api/assets-proxy/949b241e-7978-4b4f-90b6-6193213bc4dc",
    "https://e4life.vn/wp-content/uploads/2021/04/tu-vung-ielts-chu-de-shopping-4Life-English-Center.jpg",
  ];

  return (
    <div>
      <Carousel slides={slides} />
    </div>
  );
};

export default Home;
