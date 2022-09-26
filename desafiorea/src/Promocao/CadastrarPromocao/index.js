import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"
export const CadastrarPromocao = () => {
    const params = useParams();
    const [id] = useState(params.id);
    const [EmpresaId] = useState();
    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState();
    const [validade, setValidade] = useState();
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const cadPromocao = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }
        await axios.post(api + "/promocao/empresa/" + id,
            { id, EmpresaId, nome, descricao, validade }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Promoção Cadastrada com Sucesso.'
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
                        <h1> Cadastrar Promoção </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes"
                            className="m-auto btn btn-outline-info btn-sm">Clientes</Link>
                    </div>
                </div>
                <div >
                    <hr className="m-1" />
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === 'success' ?
                        <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={cadPromocao}>                    
                    <FormGroup>
                        <Label>Nº da Empresa</Label>
                        <Input name="id"
                            placeholder="Id da Promoção"
                            type="text"
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nome da Promoção</Label>
                        <Input name="nome"
                            placeholder="Nome da Promoção"
                            type="text"
                            value={nome} onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descrição</Label>
                        <Input name="data"
                            placeholder="Descrição da Promoção"
                            type="text"
                            value={descricao} onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Validade da Promoção</Label>
                        <Input name="quantidade"
                            placeholder="Validade da Promoção"
                            type="text"
                            value={validade} onChange={e => setValidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="info">Salvar</Button>
                        <Button type="reset" outline color="info">Limpar</Button>
                        <Link to={"/lista-umpromocao/" + id}
                            className="btn btn-outline-dark btn-sm">Retornar</Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}