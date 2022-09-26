import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../config";
export const EditarEmpresa = () => {
    const params = useParams();
    const [id, setId] = useState(params.id);
    const [nome, setNome] = useState();
    const [createdAt, setDataAdesao] = useState();
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtEmpresa = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }
        await axios.put(api + "/empresa/" + id, { id, nome, createdAt }, { headers })
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
        const getEmpresa = async () => {
            await axios.get(api + "/uempresa/" + id)
                .then((response) => {
                    setId(response.data.umEmp.id)
                    setNome(response.data.umEmp.nome)
                    setDataAdesao(response.data.umEmp.createdAt)
                    // setCidade(response.data.um.cidade)
                    // setUf(response.data.umCli.uf)
                    // setNascimento(response.data.umCli.nascimento)                  
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.")
                })
        }
        getEmpresa();
    }, [id])
    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <div className="m-auto p-2">
                        <h1> Editar Cadastro da Empresa </h1>
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
                <Form className="p-2" onSubmit={edtEmpresa}>
                    <FormGroup className="p-2">
                        <Label>Id</Label>
                        <Input name="id"
                            placeholder="Id da Empresa"
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nome</Label>
                        <Input name="nome"
                            placeholder="Digite o nome da Empresa"
                            type="text"
                            value={nome} onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Data do Cadastro</Label>
                        <Input name="dataAdesao"
                            placeholder="Digite a data do cadastro"
                            type="text"
                            value={createdAt} onChange={e => setDataAdesao(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="dark">Salvar</Button>
                        <Link to="/lista-empresas"
                            className="btn btn-outline-primary btn-se">Retornar</Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}