import Link from 'next/link'

function Footer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 bg-gray-100 px-32 py-14 border-t text-gray-600">
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">ABOUT</h5>
        <Link href="/about"><a><p>About us</p></a></Link>
        <Link href="/faq"><a><p>FAQ</p></a></Link>
        <p>V1.0</p>
       
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">Our Aim</h5>
        <div className="container w-22 ">
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
