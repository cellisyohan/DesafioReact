import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"

export const CadastrarCompra = () => {

    const params = useParams();
    const [id,setId] = useState();
    const [data, setData] = useState();
    const [quantidade, setQuantidade] = useState();
    const [valor, setValor] = useState();
    const [CartaoId] = useState(params.id);
    const [PromocaoId, setPromocaoId] = useState();
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const cadCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/compras/"+ id,
            {CartaoId, PromocaoId, data, quantidade, valor }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Compra Realizada com Sucesso.'
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
    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <div className="m-auto p-2">
                        <h1> Cadastrar Compra Do Cliente </h1>
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
                <Form className="p-2" onSubmit={cadCompra}>
                    <FormGroup>
                        <Label>Nº do Cartão</Label>
                        <Input name="CartaoId"
                            placeholder="Numero do Cartão"
                            type="text"
                            defaultValue={CartaoId} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nº da Promoção</Label>
                        <Input name="PromocaoId"
                            placeholder="Numero da Promoção"
                            type="text"
                            value={PromocaoId} onChange={e => setPromocaoId(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Data do Compra</Label>
                        <Input name="data"
                            placeholder="Digite a data do Compra"
                            type="text"
                            value={data} onChange={e => setData(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Quantidade</Label>
                        <Input name="quantidade"
                            placeholder="Quantidade de Item"
                            type="text"
                            value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>valor</Label>
                        <Input name="valor"
                            placeholder="Valor da compra"
                            type="text"
                            value={valor} onChange={e => setValor(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="dark">Salvar</Button>
                        <Button type="reset" outline color="info">Limpar</Button>
                        <Link to={"/lista-umacompra/" + CartaoId}
                            className="btn btn-outline-primary btn-se">Retornar</Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}