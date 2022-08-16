import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Script from 'next/script'
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet'

const ContactShop = () => {
    const [show, setShow] = useState(false);

    const router = useRouter();




    useEffect(() => {

        return () => {
            var element = document.querySelectorAll('[id*="i0kztz9d"');
          
            element[0].parentNode.removeChild(element[0]);



        }
    }, [])







    return (
        <div className="container">
            <Header />



            <div className="h-full p-10 flex flex-wrap">

                <div className="h-full w-screen">
                    <div className="p-50">
                        {/* <Script
                            strategy="afterInteractive"
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
                        /> */}

                        {/* <Script id="show_form" strategy="lazyOnload">
  {`(function(d, src, c) { 
        var t=d.scripts[d.scripts.length - 1],s=d.createElement('script');
        s.id='la_x2s6df8d';s.async=true;s.src=src;
        s.onload=s.onreadystatechange=function(){
            var rs=this.readyState;if(rs&&(rs!='complete')&&(rs!='loaded')){return;}c(this);
        };
        t.parentElement.insertBefore(s,t.nextSibling);
    })
    (document, 'https://holtah.ladesk.com/scripts/track.js', function(e){ LiveAgent.createForm('i0kztz9d', e); })`}
</Script> */}

                        <Helmet>
                            <script id='i0kztz9d'>
                                {`(function(d, src, c) { 
        var t=d.scripts[d.scripts.length - 1],s=d.createElement('script');
        s.id='la_x2s6df8d';s.async=true;s.src=src;
        s.onload=s.onreadystatechange=function(){
            var rs=this.readyState;if(rs&&(rs!='complete')&&(rs!='loaded')){return;}c(this);
        };
        t.parentElement.insertBefore(s,t.nextSibling);
       
    })
    (document, 'https://holtah.ladesk.com/scripts/track.js', function(e){ LiveAgent.createForm('i0kztz9d', e); })`}
                            </script>
                        </Helmet>





                    </div>
                </div>



            </div>





        </div>
    );
}

export default ContactShop;
