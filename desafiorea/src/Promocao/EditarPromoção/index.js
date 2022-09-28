import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../config";
export const EditarPromocao = () => {
    const params = useParams();
    const [id, setId] = useState(params.id);
    const [EmpresaId, setEmpresaId] = useState();
    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState();
    const [validade, setValidade] = useState();
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const edtPromocao = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }
        await axios.put(api + "/promocao/" + id, { id, EmpresaId, nome, descricao, validade }, { headers })
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
        const getPromocao = async () => {
            await axios.get(api + "/upromo/" + id)
                .then((response) => {
                    setId(response.data.uprom.id)
                    setEmpresaId(response.data.uprom.EmpresaId)

                    setNome(response.data.uprom.nome)
                    setDescricao(response.data.uprom.descricao)
                    setValidade(response.data.uprom.validade)
                    // setUf(response.data.umCli.uf)
                    // setNascimento(response.data.umCli.nascimento)                  
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.")
                })
        }
        getPromocao();
    }, [id])
    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <div className="m-auto p-2">
                        <h1> Editar Promoção </h1>
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
                    {status.type === 'success' ?
                        <Alert color="success">{status.message}</Alert> : ""}
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={edtPromocao}>
                    <FormGroup className="p-2">
                        <Label>Id</Label>
                        <Input name="id"
                            placeholder="Id da Promoção"
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nº da Empresa</Label>
                        <Input name="EmpresaId"
                            placeholder="Id da Empresa"                           
                            defaultValue={EmpresaId} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome da Promoção</Label>
                        <Input name="nome"
                            placeholder="Nome da Empresa"
                            value={nome} onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descrição da Promoção</Label>
                        <Input name="descricao"
                            placeholder="Descrição da Promoção"
                            type="text"
                            value={descricao} onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Validade da Promoção</Label>
                        <Input name="validade"
                            placeholder="Digite a data do cadastro"
                            type="text"
                            value={validade} onChange={e => setValidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="d-flex ">
                        <Button type="submit" outline color="dark">Salvar</Button>
                        <Link to="/lista-promocoes"
                            className="btn btn-outline-primary btn-se">Retornar</Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}