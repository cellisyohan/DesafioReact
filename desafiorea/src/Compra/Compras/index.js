import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../config"
export const Compras = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const getCompras = async () => {
        await axios.get(api + "/compras/")            // route do Controller.js E bak-end conecta ao front-end
            .then((response) => {                     // conecta banco de dados e tabela clientes
                console.log(response.data.comp)       // retorno da API 'clie'
                setData(response.data.comp)
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
                console.log("erro na API")
            })
    };
    const excCompra = async (idCompra) => {
        console.log(idCompra)
        const headers = {
            'Content-type': ' application/json'
        }
        await axios.delete(api + "/excCompra/" + idCompra, { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message);
                getCompras();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não conectou a API'
                })
            })
    }
    useEffect(() => {
        getCompras();
    }, []);
    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <div className="d-flex">
                    <div className="p-4 m-auto">
                        <h1>Lista de Compras Realizadas</h1>
                    </div>
                    <div className="p-4 m-auto">
                        <Link to="/listar-clientes"
                            className="m-auto btn p-2 btn-outline-primary btn-se">Lista de Clientes</Link>
                        <Link to="/lista-empresas"
                            className="m-auto btn p-2 btn-outline-success btn-se">Lista de Empresas</Link>
                    </div>
                </div>
                <Table striped>
                    <thead><tr className="p-4 m-auto">
                        <th>Id</th>
                        <td>Nº do Cartão</td>
                        <td>Nº da Promoção</td>
                        <td>Quantidade</td>
                        <td>Valor Total</td>
                        <td>Data da Compra</td>
                        <td>Compra Atualizada em:</td>
                        <th>Ações</th></tr></thead>
                    <tbody>
                        {data.map(comp => (
                            <tr key={comp.id} className="p-4 m-auto">
                                <th scope="row">{comp.id}</th>
                                <th>{comp.CartaoId}</th>
                                <th>{comp.PromocaoId}</th>
                                <th>{comp.quantidade}</th>
                                <th>{comp.valor}</th>
                                <th>{comp.createdAt}</th>
                                <th>{comp.updatedAt}</th>
                                <th>
                                    <Link to={"/editar-compra/" + comp.id}
                                        color="success" className="btn btn-outline-primary btn-se">Editar</Link>
                                    <span className="btn btn-outline-danger btn-se"
                                        onClick={() => excCompra(comp.id)}>Excluir</span>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}