import React, {useEffect, useState, useRef} from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit'
import './Footer.css'

function Footer() {
    const stickySectionRef = useRef();
    const fullFooterRef = useRef();
    const [showFullFooter, setShowFullFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const stickySection = stickySectionRef.current;
            const fullFooter = fullFooterRef.current;

            if (stickySection && fullFooter) {
                const stickySectionOffset = stickySection.offsetTop;
                const fullFooterOffset = fullFooter.offsetTop;

                if (window.pageYOffset >= fullFooterOffset - window.innerHeight) {
                    setShowFullFooter(true);
                } else {
                    setShowFullFooter(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
            <section ref={stickySectionRef} className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom sticky-section'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with me on social networks:</span>
                </div>
                <div>
                    <a href='/' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='google' />
                    </a>
                    <a href='https://www.linkedin.com/in/roy-drori-652596240/' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='linkedin' />
                    </a>
                    <a href='https://github.com/roydrori' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='github' />
                    </a>
                </div>
            </section>
            <section ref={fullFooterRef} className={`full-footer ${showFullFooter ? 'show-full-footer' : ''}`}>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                About Me
                            </h6>
                            <p>
                                Hi, I'm Roy Drori, a software developer on a continuous journey of progress.
                                With 1.6 years of experience, I'm currently focused on mastering React.
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Repositories</h6>
                            <p>
                                <a href='https://github.com/roydrori/E-shop' className='text-reset'>
                                    E-Shop
                                </a>
                            </p>
                            <p>
                                <a href='https://github.com/roydrori/Netflix' className='text-reset'>
                                    Netflix
                                </a>
                            </p>
                            {/* <p>
                                <a href='#!' className='text-reset'>
                                    Blog
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Library
                                </a>
                            </p> */}
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <a href='/' className='text-reset'>
                                    Home
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Settings
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Orders
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Help
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                Kiryat Bialik City, IL
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                roydrori75@gmail.com
                            </p>
                            <p>
                                <MDBIcon fab icon="whatsapp" className='me-3' /> +972 5475-99790
                            </p>
                            <p>
                                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <div>
                        <div className="text-center">All Rights Reserved</div>
                    </div>
                </MDBContainer>
            </section>



        </MDBFooter>
    )
}
export default Footer;