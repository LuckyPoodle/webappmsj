import Link from 'next/link'
import Header from '../components/Header'
  ;
export default function Custom404() {
  return <div className='container h-screen '>
    <Header />
    <div className='container p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <h1 className='font-bold lg' >404 - Page Not Found</h1>
      <Link href="/">
        <a>
          Go back home
        </a>
      </Link>

    </div>

  </div>
}
