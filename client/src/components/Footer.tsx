import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function Footer() {
  return (
    <Nav className="footer" fill>
      <Nav.Item>
        <Nav.Link
          title="about"
          className="about-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/daurham/PiRoutine-EC2-Client#readme"
        >
          About This Project
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
