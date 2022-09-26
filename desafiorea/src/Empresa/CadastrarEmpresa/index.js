import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"
export const CadastrarEmpresa = () => {
    const [empresa, setEmpresa] = useState({
        nome: ''
    })
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const valorImput = e =>
        setEmpresa({ ...empresa, [e.target.name]: e.target.value })
    const cadEmpresa = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }
        await axios.post(api + "/empresa", empresa, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Empresa Cadastrado com Sucesso.'
                })
                console.log(response.data.type)
                console.log(response.data.message)
            })
            .catch(() => {
                setStatus({
                    type: 'Error',
                    message: 'Erro: Nao foi possivel Cadastrar a empresa'
                })
                console.log("Erro: sem conexão com a API")
            })
    }
    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <div className="m-auto p-2">
                        <h1> Cadastrar Nova Empresa </h1>
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
                <Form className="p-2" onSubmit={cadEmpresa}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input name="nome"
                            placeholder="Digite o nome da Empresa"
                            type="text"
                            onChange={valorImput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data da Adesão</Label>
                        <Input name="dataAdesao"
                            placeholder="Data de Cadastro"
                            type="text"
                            onChange={valorImput} />
                    </FormGroup>
                    <FormGroup className="d-flex p-2">
                        <Button type="submit" outline color="dark">Salvar</Button>
                        <Button type="reset" outline color="info">Limpar</Button>
                        <Link to="/lista-empresas"
                            className="btn btn-outline-primary btn-se">Retornar</Link>
                    </FormGroup>

                </Form>
            </Container>
        </div>                           //formGroup permiti colocar um botão ao lado do outro
    )
}