import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { Helmet } from 'react-helmet'
//import ContactForm from '../../components/forms/contactForm';

const ContactShop = () => {
  const [show, setShow] = useState(false)

  const router = useRouter()

  useEffect(() => {
    return () => {
      var element = document.querySelectorAll('[id*="i0kztz9d"')

      element[0].parentNode.removeChild(element[0])
    }
  }, [])

  return (
    <div className=' bg-black'>
      <Header />

      <div className=''>
        {/* <ContactForm /> */}

        <Script
          id='my-script'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
    (function(d, src, c) { 
        var t=d.scripts[d.scripts.length - 1],s=d.createElement('script');
        s.id='la_x2s6df8d';s.async=true;s.src=src;
        s.onload=s.onreadystatechange=function(){
            var rs=this.readyState;if(rs&&(rs!='complete')&&(rs!='loaded')){return;}c(this);
        };
        t.parentElement.insertBefore(s,t.nextSibling);
    })
    (document, 'https://holtah.ladesk.com/scripts/track.js', function(e){ LiveAgent.createForm('i0kztz9d', e); })
  `,
          }}
        />
      </div>
    </div>
  )
}

export default ContactShop
