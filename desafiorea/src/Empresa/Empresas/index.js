import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../config"
export const Empresas = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const getEmpresas = async () => {
        await axios.get(api + "/empresas")            // route do Controller.js E bak-end conecta ao front-end
            .then((response) => {                     // conecta banco de dados e tabela clientes
                console.log(response.data.emp)       // retorno da API 'clie'
                setData(response.data.emp)
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
                console.log("erro na API")
            })
    };
    const excEmpresa = async (idEmpresa) => {
        console.log(idEmpresa)
        const headers = {
            'Content-type': ' application/json'
        }
        await axios.delete(api + "/empresa/" + idEmpresa, { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message);
                getEmpresas();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não conectou a API'
                })
            })
    }
    useEffect(() => {
        getEmpresas();
    }, []);
    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <div className="d-flex p-2">
                    <div>
                        <h1>Lista de Empresas</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/nova-empresa"
                            className="m-auto p-2 btn btn-outline-dark btn-se">Cadastrar Nova Empresa</Link>
                        <Link to="/listar-clientes"
                            className="m-auto btn p-2 btn-outline-primary btn-se">Lista de Clientes</Link>
                    </div>
                </div>
                <Table striped>
                    <thead><tr>
                        <th>Id</th>
                        <td>Nome</td>
                        <td>Data do Cadastro</td>
                        <td>Cadastro Atualizado em:</td>
                        <th>Ações</th></tr></thead>
                    <tbody>
                        {data.map(emp => (
                            <tr key={emp.id}>
                                <th scope="row">{emp.id}</th>
                                <th>{emp.nome}</th>
                                <th>{emp.createdAt}</th>
                                <th>{emp.updatedAt}</th>
                                <th>
                                    <Link to={"/editar-empresa/" + emp.id}
                                        className="m-auto p-2 btn btn-outline-primary btn-se">Editar</Link>
                                    <Link to={"/lista-umpromocao/" + emp.id}
                                         className="m-auto btn p-2 btn-outline-dark btn-se">Promoção</Link>
                                    <span className="m-auto p-2 btn btn-outline-danger btn-se"
                                        onClick={() => excEmpresa(emp.id)}>Excluir</span>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}