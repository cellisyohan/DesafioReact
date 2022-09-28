import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../config";
export const EditarCompras = () => {
    const params = useParams();
    const [id, setId] = useState(params.id);
    const [data, setData] = useState();
    const [quantidade, setQuantidade] = useState();
    const [valor, setValor] = useState();
    const [CartaoId, setCartaoId] = useState();
    const [PromocaoId, setPromocaoId] = useState();
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const edtCompra = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }
        await axios.put(api + "/compras/" + id, { id, data, quantidade, valor, CartaoId, PromocaoId }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alterado com Sucesso.'
                })
                console.log(response.data.type)
                console.log(response.data.message)
            })
            .catch(() => {
                setStatus({
                    type: 'Error',
                    message: 'Erro: Nao foi possivel alterar'
                })
            })
    }
    useEffect(() => {
        const getCompra = async () => {
            await axios.get(api + "/ucompra/" + id)
                .then((response) => {
                    setId(response.data.uComp.id)
                    setData(response.data.uComp.data)
                    setQuantidade(response.data.uComp.quantidade)
                    setValor(response.data.uComp.valor)
                    setCartaoId(response.data.uComp.CartaoId)
                    setPromocaoId(response.data.uComp.PromocaoId)
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.")
                })
        }
        getCompra();
    }, [id])
    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <div className="m-auto p-2">
                        <h1> Atualizar/Alterar Compra </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes"
                            className="m-auto btn p-2 btn-outline-primary btn-se">Lista de Clientes</Link>
                        <Link to="/lista-empresas"
                            className="m-auto btn p-2 btn-outline-success btn-se">Lista de Empresas</Link>
                    </div>
                </div>
                <div >
                    <hr className="m-1" />
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === 'success' ?
                        <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <Form className="m-auto" onSubmit={edtCompra}>
                    <FormGroup className="p-2">
                        <Label>Id</Label>
                        <Input name="id"
                            placeholder="Id do Cliente"
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Data da Compra</Label>
                        <Input name="data"
                            placeholder="Digite o nome do Cliente"
                            type="text"
                            value={data} onChange={e => setData(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nº do Cartão</Label>
                        <Input name="CartaoId"
                            placeholder="Data de Nascimento"
                            type="text"
                            defaultValue={CartaoId} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nº da Promoção</Label>
                        <Input name="PromocaoId"
                            placeholder="Nº da Promoção"
                            type="text"
                            defaultValue={PromocaoId} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Quantidade</Label>
                        <Input name="quantidade"
                            placeholder="digite a quantidade de item"
                            type="text"
                            value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Valor</Label>
                        <Input name="valor"
                            placeholder="digite seu Estado"
                            type="text"
                            value={valor} onChange={e => setValor(e.target.value)} />
                    </FormGroup>
                    
                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="dark">Salvar</Button>
                        <Link to={"/lista-umacompra/" + CartaoId}
                            className="btn btn-outline-primary btn-se">Retornar</Link>
                    </FormGroup>

                </Form>
            </Container>
        </div>
    )
}


