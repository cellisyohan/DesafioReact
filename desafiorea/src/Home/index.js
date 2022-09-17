import { Container } from "reactstrap"
import { Link } from "react-router-dom"
export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1> Página Inicial </h1>
                        <Link to="/listar-clientes"
                            className="m-auto btn btn-outline-info btn-se">Clientes</Link>
                    </div>
                    <div className="d-flex p-2">
                        
                    </div>
                </div>
            </Container>
        </div>
    )
}