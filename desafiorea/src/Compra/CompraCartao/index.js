import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Container, Form, FormGroup, Table } from "reactstrap"
import { api } from "../../config"

export const CompraCartao = () => {
    const params = useParams()
    const [data, setData] = useState([])
    const [id] = useState(params.id)
    const [card] = useState(params.CartaoId)
    const [setStatus] = useState({
        type: '',
        message: ''
    });
    const getCompras = async () => {
        await axios.get(api + "/compra/cartao/" + id)
            .then((response) => {
                console.log(response.data.compc)
                setData(response.data.compc)
            }).catch(() => {
                console.log("Sem conexão da API")
            })
    }
    const excCompra = async (idComp) => {
        console.log(idComp)
        const headers = {
            'Content-type': 'application/json'
        }
        await axios.delete(api + "/excCompra/" + idComp, { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message);
                getCompras();  //sem chamar aqui a compra não era excluida e nem aparecia no body
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não conectou a API'
                })
            })
    }
    useEffect(() => {
        getCompras();
    }, [])
    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <div className="m-auto p-2">
                        <h1>Compras no Cartao do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/nova-compra/" + id}
                            className="m-auto btn p-2 btn-outline-dark btn-se">Realizar Compra</Link>
                        <Link to="/listar-clientes"
                            className="m-auto btn p-2 btn-outline-primary btn-se">Lista de Clientes</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nº do Cartão</th>
                            <th>Nº da Promoção</th>
                            <th>Data da Compra</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody >
                        {data.map(compc => (
                            <tr key={compc.id}>
                                <th scope="row">{compc.id}</th>
                                <th>{compc.CartaoId}</th>
                                <th>{compc.PromocaoId}</th>
                                <th>{compc.data}</th>
                                <th>{compc.quantidade}</th>
                                <th>{compc.valor}</th>
                                <th>
                                    <Link to={"/editar-compra/" + compc.id}
                                        className="m-auto p-2 btn btn-outline-info btn-se">Alterar a Comprar</Link>
                                    <span className="m-auto p-2 btn btn-outline-danger btn-se"
                                        onClick={() => excCompra(compc.id)}>Excluir Compra</span>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    <Link to="/lista-cartoes"
                    className="m-auto p-2 btn btn-outline-secondary btn-se">Lista dos Cartões</Link>
                </Table>              
            </Container>
        </div>
    )
}