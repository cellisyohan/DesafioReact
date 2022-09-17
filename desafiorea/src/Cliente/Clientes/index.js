import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../config"

export const Clientes = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const getClientes = async () => {
        await axios.get(api + "/clientes")            // route do Controller.js E bak-end conecta ao front-end
            .then((response) => {                     // conecta banco de dados e tabela clientes
                console.log(response.data.clie)       // retorno da API 'clie'
                setData(response.data.clie)
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
                console.log("erro na API")
            })
    };

    const excCliente = async (idCliente) => {
        console.log(idCliente)
        const headers = {
            'Content-type': ' application/json'
        }
        await axios.delete(api + "/excliente/" + idCliente, { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message);
                getClientes();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não conectou a API'
                })
            })
    }

    useEffect(() => {
        getClientes();
    }, [])
    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Clientes</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/novo-cliente" className="btn btn-outline-info
                        btn-sm">Inserir</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <td>Nome</td>
                            <td>Data de Nascimento</td>
                            <td>Cliente desde:</td>
                            <td>Cidade</td>
                            <td>Estado</td>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(clie => (
                            <tr key={clie.id}>
                                <th scope="row">{clie.id}</th>
                                <th>{clie.nome}</th>
                                <th>{clie.nascimento}</th>
                                <th>{clie.createdAt}</th>
                                <th>{clie.cidade}</th>
                                <th>{clie.uf}</th>
                                <th><Link to={"/cartao-cliente/" + clie.id}
                                    className="btn btn-outline-info btn-sm">Cartão/ões</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => excCliente(clie.id)}>Excluir</span>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}