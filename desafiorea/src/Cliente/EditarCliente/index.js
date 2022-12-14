import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../config";
export const EditarCliente = () => {
    const params = useParams();
    const [id, setId] = useState(params.id);
    const [nome, setNome] = useState();
    const [cidade, setCidade] = useState();
    const [uf, setUf] = useState();
    const [nascimento, setNascimento] = useState();
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtCliente = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }
        await axios.put(api + "/cliente/" + id, { id, nome, cidade, uf, nascimento }, { headers })
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
        const getCliente = async () => {
            await axios.get(api + "/ucliente/" + id)
                .then((response) => {
                    setId(response.data.umCli.id)
                    setNome(response.data.umCli.nome)
                    setCidade(response.data.umCli.cidade)
                    setUf(response.data.umCli.uf)
                    setNascimento(response.data.umCli.nascimento)
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.")
                })
        }
        getCliente()
    }, [id])
    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <div className="m-auto p-2">
                        <h1> Editar o Cliente </h1>
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
                <Form className="p-2" onSubmit={edtCliente}>
                    <FormGroup className="p-2">
                        <Label>Id</Label>
                        <Input name="id"
                            placeholder="Id do Cliente"
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nome</Label>
                        <Input name="nome"
                            placeholder="Digite o nome do Cliente"
                            type="text"
                            value={nome} onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Cidade</Label>
                        <Input name="cidade"
                            placeholder="digite sua Cidade"
                            type="text"
                            value={cidade} onChange={e => setCidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Estado</Label>
                        <Input name="uf"
                            placeholder="digite seu Estado"
                            type="text"
                            value={uf} onChange={e => setUf(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Data Nascimento</Label>
                        <Input name="nascimento"
                            placeholder="Data de Nascimento"
                            type="text"
                            value={nascimento} onChange={e => setNascimento(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="d-flex">
                    <Button type="submit" outline color="dark">Salvar</Button>
                        <Link to="/listar-clientes"
                            className="btn btn-outline-primary btn-se">Retornar</Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}