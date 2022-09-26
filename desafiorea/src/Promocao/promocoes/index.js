import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../config"
export const Promocoes = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const getPromocoes = async () => {
        await axios.get(api + "/promo")            // route do Controller.js E bak-end conecta ao front-end
            .then((response) => {                     // conecta banco de dados e tabela clientes
                console.log(response.data.pro)       // retorno da API '....'
                setData(response.data.pro)
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
                console.log("erro na API")
            })
    };
    const excPromocao = async (idPro) => {
        console.log(idPro)
        const headers = {
            'Content-type': ' application/json'
        }
        await axios.delete(api + "/excpromocao/" + idPro, { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message);
                getPromocoes();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não conectou a API'
                })
            })
    }
    useEffect(() => {
        getPromocoes();
    }, []);
    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <div className="d-flex p-4">
                    <div>
                        <h1>Lista de Promoções</h1>
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
                        <td>Empresa Id</td>
                        <td>Promoção:</td>
                        <td>Descrição da promoção:</td>
                        <td>Valido até:</td>
                        <td>Promoção Criada em:</td>
                        <td>Alteração da Promoção</td>
                        <th>Ações</th></tr></thead>
                    <tbody>
                        {data.map(pro => (
                            <tr key={pro.id}>
                                <th scope="row">{pro.id}</th>
                                <th>{pro.EmpresaId}</th>
                                <th>{pro.nome}</th>
                                <th>{pro.descricao}</th>
                                <th>{pro.validade}</th>
                                <th>{pro.createdAt}</th>
                                <th>{pro.updatedAt}</th>
                                <th>
                                <Link to={"/editar-promocao/" + pro.id}
                                        color="success" className="m-auto p-2 btn btn-outline-primary btn-se">Editar</Link>
                                    <span className="m-auto p-2 btn btn-outline-danger btn-se"
                                        onClick={() => excPromocao(pro.id)}>Excluir</span>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}