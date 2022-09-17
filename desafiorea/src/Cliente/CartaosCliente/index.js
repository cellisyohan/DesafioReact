import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Table } from "reactstrap"
import { api } from "../../config"
export const CartaosCliente = () => {

    const params = useParams()

    const [data, setData] = useState([])
    const [id] = useState(params.id)

    useEffect(() => {
        const getCartaos = async () => {
            await axios.get(api + "/cartao/cliente/" + id)
                .then((response) => {
                    console.log(response.data.cartc)   //.then(cartc => no controller.js
                    setData(response.data.cartc)   //.then(cartc =>  no controller.js
                }).catch(() => {
                    console.log("sem conexão da API")
                })
        }
        getCartaos()
    }, [id])
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Cartao do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className="m-auto btn btn-outline-info btn-sm">
                            Clientes</Link>
                        <Link to={"/novo-cartao/" + id} 
                            className="btn btn-outline-info btn-sm">Inserir</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            
                            <th>Id</th>
                            <th>Cliente</th>
                            <th>Data do Cartão</th>
                            <th>Validade do Cartão</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cartc => (
                            <tr key={cartc.id}>
                                <th scope="row">{cartc.id}</th>
                                <th>{cartc.ClienteId}</th>
                                <th>{cartc.dataCartao}</th>
                                <th>{cartc.validade}</th>
                                <th><Link to={"/editar-cartao/" + cartc.id}
                                    className="btn btn-outline-info btn-sm">Editar</Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
