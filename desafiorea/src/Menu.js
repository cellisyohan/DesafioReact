import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

export const Menu = (args)=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="primary" dark expand="md">
                <Container>
                    <NavbarBrand>Services TI Academy Brasil</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="http://tiacademybrasil.com.br">
                                    TI Academy Brasil
                                </NavLink>
                            </NavItem>
                        </Nav>                        
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
}