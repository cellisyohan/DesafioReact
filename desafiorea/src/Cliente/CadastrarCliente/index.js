import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { api } from "../../config"
export const CadastrarCliente = () => {
    const [cliente, setCliente] = useState({
        nome: '',
        nascimento: '',
        cidade: '',
        uf: '',
    })
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const valorImput = e =>
        setCliente({ ...cliente, [e.target.name]: e.target.value })
    const cadCliente = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }
        await axios.post(api + "/cliente", cliente, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Cliente Cadastrado com Sucesso.'
                })
                console.log(response.data.type)
                console.log(response.data.message)
            })
            .catch(() => {
                setStatus({
                    type: 'Error',
                    message: 'Erro: Nao foi possivel alterar'
                })
                console.log("Erro: sem conexão com a API")
            })
    }
    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <div className="m-auto p-2">
                        <h1> Cadastrar Novo Cliente </h1>
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
                <Form className="p-2" onSubmit={cadCliente}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input name="nome"
                            placeholder="Digite o nome do cliente"
                            type="text"
                            onChange={valorImput} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Data de nascimento</Label>
                        <Input name="nascimento"
                            placeholder="Digite a data de nascimento"
                            type="text"
                            onChange={valorImput} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Cidade</Label>
                        <Input name="cidade"
                            placeholder="Digite a sua cidade"
                            type="text"
                            onChange={valorImput} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Estado</Label>
                        <Input name="uf"
                            placeholder="Digite o seu Estado"
                            type="text"
                            onChange={valorImput} />
                    </FormGroup>
                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="dark">Salvar</Button>
                        <Button type="reset" outline color="primary">Limpar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>                           //formGroup permiti colocar um botão ao lado do outro
    )
}