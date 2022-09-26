import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Table } from "reactstrap"
import { api } from "../../config"
export const PromocaoEmpresa = () => {
    const params = useParams()
    const [data, setData] = useState([])
    const [id] = useState(params.id)
    const [setStatus] = useState({
        type: '',
        message: ''
    });
    const getPromocao = async () => {
        await axios.get(api + "/upromo/empresa/" + id)
            .then((response) => {
                console.log(response.data.umpro)   //.then(cartc => no controller.js
                setData(response.data.umpro)   //.then(cartc =>  no controller.js
            }).catch(() => {
                console.log("sem conexão da API")
            })
    }
    const excPromocao = async (idPro) => {
        console.log(idPro)
        const headers = {
            'Content-type': ' application/json'
        }
        await axios.delete(api + "/excpromocao/" + idPro, { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message);

            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não conectou a API'
                })
            })
    }
    useEffect(() => {
        getPromocao();
    }, [id])
    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <div className="m-auto p-2">
                        <h1>Promoções da Empresa</h1>
                    </div>
                    <div className="d-flex p-2">
                        <Link to={"/nova-Promocao/" + id}
                            className="m-auto btn p-2 btn-outline-dark btn-se">Inserir Nova Promoção</Link>
                        <Link to="/listar-clientes"
                            className="m-auto btn p-2 btn-outline-primary btn-se">Lista de Clientes</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Nº da Promoção</th>
                            <th>Nº Empresa</th>
                            <th>Promoção</th>
                            <th>Descrição</th>
                            <th>Valido até:</th>
                            <th>Inicio da Promoção</th>
                            <th>Atualizada em:</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(umpro => (
                            <tr key={umpro.id}>
                                <th scope="row">{umpro.id}</th>
                                <th>{umpro.EmpresaId}</th>
                                <th>{umpro.nome}</th>
                                <th>{umpro.descricao}</th>
                                <th>{umpro.validade}</th>
                                <th>{umpro.createdAt}</th>
                                <th>{umpro.updatedAt}</th>
                                <th><Link to={"/editar-promocao/" + umpro.id}
                                    className="m-auto p-2 btn btn-outline-primary btn-se">Editar</Link>
                                   
                                    <span className="m-auto p-2 btn btn-outline-danger btn-se"
                                        onClick={() => excPromocao(umpro.id)}>Excluir</span>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    <Link to="/lista-promocoes"
                        className="m-auto p-2 btn btn-outline-danger btn-se">Lista das Promoções</Link>
                </Table>
            </Container>
        </div>
    )
}