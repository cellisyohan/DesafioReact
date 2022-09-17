import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"

export const CadastrarCartao = () => {

    const params = useParams();
    const [id] = useState(params.id);
    const [ClienteId] = useState(params.id);
    const [dataCartao, setDataCartao] = useState();
    const [validade, setValidade] = useState();

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const cadCartao = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/cartao/cliente/" + id,
            { ClienteId, dataCartao, validade }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Cartão Cadastrado com Sucesso.'
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
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1> Cadastrar Cartão Do Cliente </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes"
                            className="m-auto btn btn-outline-info btn-sm">Clientes</Link>
                        <Link to={"/cartao-cliente/" + id}
                            className="btn btn-outline-info btn-sm">Retornar</Link>
                    </div>
                </div>
                <div >
                    <hr className="m-1" />
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === 'success' ?
                        <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={cadCartao}>

                    <FormGroup>
                        <Label>Id do Cliente</Label>
                        <Input name="ClienteId"
                            placeholder="Id do Cliente"
                            type="text"
                            defaultValue={ClienteId} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Data do Cartão</Label>
                        <Input name="dataCartao"
                            placeholder="Digite a data do Cartao"
                            type="text"
                            value={dataCartao} onChange={e => setDataCartao(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Validade do Cartão</Label>
                        <Input name="validade"
                            placeholder="Data de Validade"
                            type="text"
                            value={validade} onChange={e => setValidade(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="info">Salvar</Button>
                        <Button type="reset" outline color="info">Limpar</Button>
                        <Link to={"/cartao-cliente/" + id}
                            className="btn btn-outline-info btn-sm">Retornar</Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}