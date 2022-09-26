import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../config"
export const Cartoes = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const getCartoes = async () => {
        await axios.get(api + "/cartoes/")            // route do Controller.js E bak-end conecta ao front-end
            .then((response) => {                     // conecta banco de dados e tabela clientes
                console.log(response.data.cart)       // retorno da API '....'
                setData(response.data.cart)
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
                console.log("erro na API")
            })
    };
    useEffect(() => {
        getCartoes();
    }, []);
    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Cartões</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/listar-clientes"
                            className="m-auto btn p-2 btn-outline-primary btn-se">Lista de Clientes</Link>
                        <Link to="/lista-empresas"
                            className="m-auto btn p-2 btn-outline-success btn-se">Lista de Empresas</Link>
                    </div>
                </div>
                <Table striped>
                    <thead><tr><th>Id</th>
                        <td>Cliente Id</td>
                        <td>Data do Cartão</td>
                        <td>Cartão Expira em:</td>
                        <td>Cartão Cadastrodo em:</td>
                        <td>Atualizado em:</td>
                        <th>Ações</th></tr></thead>
                    <tbody>
                        {data.map(cart => (
                            <tr key={cart.id}>
                                <th scope="row">{cart.id}</th>
                                <th>{cart.ClienteId}</th>
                                <th>{cart.dataCartao}</th>
                                <th>{cart.validade}</th>
                                <th>{cart.createdAt}</th>
                                <th>{cart.updatedAt}</th>
                                <th><Link to={"/lista-umacompra/" + cart.id}
                                    className="m-auto p-2 btn btn-outline-dark btn-se">Compras Realizadas no Cartão</Link>
                                    {/* <Link to={"/editar-cliente/" + cart.id}
                                        className="btn btn-outline-success btn-sm">Editar</Link>
                                    */}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}