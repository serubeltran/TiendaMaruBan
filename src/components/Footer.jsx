// Footer con contacto, enlaces y redes

import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer(){
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row g-4 mb-4">
          {/* Información de contacto */}
          <div className="col-md-4 text-center text-md-start">
            <h6 className="footer-title mb-3">📞 Contacto</h6>
            <p className="footer-link mb-2">
              <FaPhone className="me-2" />
              +54 (11) 1234-5678
            </p>
            <p className="footer-link mb-2">
              <FaEnvelope className="me-2" />
              <a href="mailto:info@maruban.com" className="text-decoration-none">
                info@maruban.com
              </a>
            </p>
            <p className="footer-link">
              <FaMapMarkerAlt className="me-2" />
              Buenos Aires, Argentina
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-md-4 text-center">
            <h6 className="footer-title mb-3">🔗 Enlaces</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="footer-link text-decoration-none">Inicio</a>
              </li>
              <li className="mb-2">
                <a href="/nosotros" className="footer-link text-decoration-none">Nosotros</a>
              </li>
              <li className="mb-2">
                <a href="/" className="footer-link text-decoration-none">Productos</a>
              </li>
              <li>
                <a href="/" className="footer-link text-decoration-none">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="col-md-4 text-center text-md-end">
            <h6 className="footer-title mb-3">📱 Nuestras Redes</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="footer-social-link" title="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="footer-social-link" title="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="footer-social-link" title="WhatsApp">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisora */}
        <hr className="my-4" />

        {/* Copyright */}
        <div className="text-center">
          <p className="mb-0 footer-copyright">
            &copy; {currentYear} <strong>Tienda MaruBan</strong> - Artesanías Premium | Desarrollado por <strong>ByB Sistemas</strong>
          </p>
          <p className="footer-disclaimer mt-2 mb-0">
            Demo educativo - Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
