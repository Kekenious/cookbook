import { Navbar, Container, NavbarBrand } from 'reactstrap';

export function Header() {
  return (
    <Navbar color="info" dark>
      <Container>
        <NavbarBrand href="/">Cookbook</NavbarBrand>
      </Container>
    </Navbar>
  );
}
