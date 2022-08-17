function Footer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 bg-gray-100 px-32 py-14 border-t text-gray-600">
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">ABOUT</h5>
        <p>About us</p>
        <p>FAQ</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">Our Aim</h5>
        <div className="container w-25 ">
        <p>Makeshipjoy aims to make it easier
        to find great deals in your
        neighbourhoods </p>
      
        </div>
      </div>

    

      <div className="space-y-4 text-xs text-gray-800">
      <h5 className="font-bold">Our Values</h5>
        <div className="container w-30 ">
        <p>Integrity, Passion, Creativity </p>
      
        </div>
      </div>
    </div>
  );
}

export default Footer;
