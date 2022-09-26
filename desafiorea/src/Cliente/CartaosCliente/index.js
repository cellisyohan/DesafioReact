import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Table } from "reactstrap"
import { api } from "../../config"
export const CartaosCliente = () => {
    const params = useParams()
    const [data, setData] = useState([])
    const [id] = useState(params.id)
    const [setStatus] = useState({
        type: '',
        message: ''
    });
    const getCartaos = async () => {
        await axios.get(api + "/cartao/cliente/" + id)
            .then((response) => {
                console.log(response.data.cartc)   //.then(cartc => no controller.js
                setData(response.data.cartc)   //.then(cartc =>  no controller.js
            }).catch(() => {
                console.log("sem conexão da API")
            })
    }
    const excCartao = async (idCar) => {
        console.log(idCar)
        const headers = {
            'Content-type': ' application/json'
        }
        await axios.delete(api + "/excccartao/" + idCar, { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message);
                getCartaos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: não conectou a API'
                })
            })
    }
    useEffect(() => {
        getCartaos();
    }, [id])
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Cartao do Cliente</h1>
                    </div>
                    <div className="d-flex p-2">
                        <Link to={"/novo-cartao/" + id}
                            className="m-auto btn p-2 btn-outline-dark btn-se">Inserir Novo Cartão</Link>                        
                        <Link to="/lista-empresas"
                            className="m-auto btn p-2 btn-outline-success btn-se">Lista de Empresas</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Cliente</th>
                            <th>Data do Cartão</th>
                            <th>Validade do Cartão</th>
                            <th>Cadastrado em:</th>
                            <th>Atualizado em:</th>
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
                                <th>{cartc.createdAt}</th>
                                <th>{cartc.updatedAt}</th>
                                <th><Link to={"/editar-cartao/" + cartc.id}
                                    className="m-auto p-2 btn btn-outline-primary btn-se">Editar</Link>
                                    <Link to={"/lista-umacompra/" + cartc.id}
                                        className="m-auto p-2 btn btn-outline-dark btn-se">Compras</Link>
                                    <span className="m-auto p-2 btn btn-outline-danger btn-se"
                                        onClick={() => excCartao(cartc.id)}>Excluir</span>
                                </th>
                            </tr>

                        ))}
                    </tbody>
                    <Link to="/lista-cartoes"
                        className="m-auto p-2 btn btn-outline-secondary btn-se">Lista dos Cartões</Link>
                    <Link to="/listar-clientes"
                        className="m-auto btn p-2 btn-outline-primary btn-se">Retornar</Link>
                </Table>
            </Container>
        </div>
    )
}
