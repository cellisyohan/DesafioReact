import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"
export const CadastrarPromocao = () => {
    const params = useParams();
    const [id] = useState(params.id);
    const [EmpresaId] = useState(params.id);
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
            { EmpresaId, nome, descricao, validade }, { headers })
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
                <div className="d-flex p-2">
                    <div className="m-auto p-2">
                        <h1> Cadastrar Promoção </h1>
                    </div>
                    <div className="m-auto p-2">
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
                <Form className="p-2" onSubmit={cadPromocao}>
                    <FormGroup>
                        <Label>Nº da Empresa</Label>
                        <Input name="EmpresaId"
                            placeholder="Id da Promoção"
                            type="text"
                            defaultValue={EmpresaId} />
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
                        <Input name="descricao"
                            placeholder="Descrição da Promoção"
                            type="text"
                            value={descricao} onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Validade da Promoção</Label>
                        <Input name="validade"
                            placeholder="Validade da Promoção"
                            type="text"
                            value={validade} onChange={e => setValidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="dark">Salvar</Button>
                        <Button type="reset" outline color="info">Limpar</Button>
                        <Link to={"/lista-umpromocao/" + id}
                            className="btn btn-outline-primary btn-se">Retornar</Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}