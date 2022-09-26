import { Container } from "reactstrap"
import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex p-4" >
                    <div className="m-auto p-4">
                        <h1 className="m-auto p-4"> Página Inicial </h1>
                        <div className="p-4" class="estilo">
                            <Link to="/listar-clientes"
                                className="m-auto p-2 btn btn-outline-primary btn-se">Lista de Clientes</Link>
                            <Link to="/lista-cartoes"
                                className="m-auto p-2 btn btn-outline-secondary btn-se">Lista dos Cartões</Link>
                            <Link to="lista-compras"
                                className="m-auto p-2 btn btn-outline-dark btn-se">Lista de Compras</Link>
                            <Link to="/lista-promocoes"
                                className="m-auto p-2 btn btn-outline-danger btn-se">Lista das Promoções</Link>
                            <Link to="/lista-empresas"
                                className="m-auto p-2 btn btn-outline-success btn-se">lista de Empresas</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}