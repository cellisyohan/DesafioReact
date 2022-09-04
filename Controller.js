const express = require('express');
const cors = require('cors');
const {Sequelize} = require('./models');
const models=require('./models');

const app=express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let cartao = models.Cartao;
let compra = models.Compra;
let promocao = models.Promocao;
let empresa = models.Empresa;

let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{console.log('Serviço ativo: '+' Http://Localhost:3001');});
app.get('/', function(req,res){res.send('Bem vindo a TI Academy Brasil');});

// Inserir um novo Cliente
app.post('/cliente', async(req,res)=>{
    await cliente.create(
        req.body
    ).then(cli => {
        return res.json({
            error:false,
            message:"Cliente inserido com sucesso!",
            cli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message:"Problema na conexão da API"
        });
    });
});

//Inserir um Cartão do Cliente
app.post('/cliente/:id/cartao', async(req,res)=>{
    const cart = {dataCartao:req.body.dataCartao,validade:req.body.validade,ClienteId:req.params.id};
    await cartao.create(cart)
    .then(cartcli=>{return res.json({error:false, message:"Cartão inserido com sucesso!", cartcli});})
    .catch(erro=>{return res.status(400).json({error:true, message:"Problema na conexão da API"});});
});

//Cadastro de Empresas
app.post('/empresa', async(req,res)=>{
    await empresa.create(req.body)
    .then(empr => {return res.json({error:false, message:"Empresa cadastrada com sucesso!"})})
    .catch(erro=>{return res.status(400).json({error:true, message:"Problema na conexão da API"});});
});

//Cadastro de Promoções
app.post('/empresa/:id/promocao', async(req,res)=>{
    const prom = {nome:req.body.nome,descricao:req.body.descricao, validade:req.body.validade,EmpresaId:req.params.id};
    await promocao.create(prom)
    .then(empprom=>{return res.json({error:false, message:"Promoção inserida com sucesso!", empprom});})
    .catch(erro=>{return res.status(400).json({error:true, message:"Problema na conexão da API"});});
});

//Realizar Compras
app.post('/compras', async(req,res)=>{
    await compra.create(req.body)
    .then(comp=>{return res.json({error:false, message:"Compras Realizada ", comp});})
    .catch(erro=>{return res.status(400).json({error:true, message:" Problema na conexão da API "});});
});

// Listar os Clientes
app.get('/clientes', async(req, res)=>{
    await cliente.findAll(req.params.id)
    .then(cli=>{return res.json({error:false, cli});})
    .catch(erro=>{return res.status(400).json({error:true, message:" Problema na conexão da API"});});
});

//Listar as Empresas
app.get('/empresas', async(req, res)=>{
    await empresa.findAll(req.params.id)
    .then(emp=>{return res.json({error:false, emp});})
    .catch(erro=>{return res.status(400).json({error:true, message:" Problema na conexão da API "});});
});

//Listar os Cartões
app.get('/cartoes', async(req, res)=>{
    await cartao.findAll(
        req.params.id
        ).then(cart=>{
            return res.json({
            error:false,
            cart
        });
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message:" Problema na conexão da API"
        });
    });
});

//Listar as Promoções
app.get('/promo', async(req, res)=>{
    await promocao.findAll(
        req.params.id
    ).then(pro =>{
        return res.json({
            error:false,
            pro
        });
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message:"Problema na conexão API"
        });
    });
});
//Listar compras
app.get('/compras', async(req, res)=>{
    await compra.findAll(
        req.params.id
        ).then(comp=>{
            return res.json({
                error:false, 
                comp
            });
        }).catch(erro=>{
            return res.status(400).json({
                error:true, 
                message:" Problema na conexão da API"
            })
        });
});

// Alterar Cliente
app.put('/cliente/:id', async(req,res)=>{
    const cli=(
        // nome: req.body.data,            //
        // cidade: req.body.cidade,        //pode ser assim
        // uf: req.body.uf,                //
        // nascimento: req.body.nascimento //
        req.body
    );
    if(! await cliente.findByPk(req.params.id)){
        return res.status(400).json({
             error: true,
             message: "O Cliente não existe."
        });
      };
    await cliente.update(cli,{
		where: Sequelize.and(
			{id:req.params.id}) // essa linha faltava por isso não consegui alterar
		}).then(umcli=>{
			return res.json({
				error:false, 
				message :"Cadastro do Cliente atualizado com sucesso!", 
				umcli
	     	});	
		}).catch(erro=>{
			return res.status(400).json({
				error:true, 
				message:" problema na conexão com a API."
		});
	});
});

//Alterar Cartão
app.put('/cartao/:id', async(req,res)=>{
    const car={
        id: req.params.id, 
        ClienteId: req.body.ClienteId, 
        dataCartao: req.body.dataCartao,
        validade: req.body.validade
    };
    if(! await cartao.findByPk(req.params.id)){
        return res.status(400).json({
             error: true,
             message: "O Cartão não existe."
        });
      };
    await cartao.update(car,{
        where: Sequelize.and({
			ClienteId : req.body.ClienteId},
            {id:req.params.id})
    }).then(umcar=>{
        return res.json({
            error:false,
            message : "Cartão atualizado com sucesso!",
            umcar
        });
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message:"Problema na conexão API."
        });
    });
});

//Alterar Empresas
app.put('/empresa/:id', async(req,res)=>{
    if(! await empresa.findByPk(req.params.id)){
        return res.status(400).json({
             error: true,
             message: "A Empresa não existe."
        });
      };
    const emp=(
        // nome: req.body.data,            //
        // dataAdesao: req.body.cidade,        //pode ser assim
        req.body
    );
    await empresa.update(emp,{
		where: Sequelize.and(
			{id:req.params.id}) // essa linha faltava por isso não consegui alterar
		}).then(umemp=>{
			return res.json({
				error:false, 
				message :"Empresa atualizado com sucesso!", 
				umemp
	     	});	
		}).catch(erro=>{
			return res.status(400).json({
				error:true, 
				message:" problema na conexão com a API."
		});
	});
});

//Alterar Promoção
app.put('/promocao/:id', async(req,res)=>{
    const pro=(
        // nome: req.body.data,               //
        // descricao: req.body.cidade,        //pode ser assim
        // validade: req.body.validade        //
        req.body
    );
    if(! await promocao.findByPk(req.params.id)){
        return res.status(400).json({
             error: true,
             message: "Está Promoção não existe."
        });
      };
    await promocao.update(pro,{
		where: Sequelize.and(
			{id:req.params.id}) // essa linha faltava por isso não consegui alterar
		}).then(umpro=>{
			return res.json({
				error:false, 
				message :"Promoção atualizado com sucesso!", 
				umpro
	     	});	
		}).catch(erro=>{
			return res.status(400).json({
				error:true, 
				message:" problema na conexão com a API."
		});
	});
});

// Alterar Compras
app.put('/compras/:id', async(req,res)=>{
    const comp=(
        // data: req.body.data,               //
        // quantidade: req.body.quantidade,        //pode ser assim
        // valor: req.body.valor        //
        req.body
    );
    if(! await compra.findByPk(req.params.id)){
        return res.status(400).json({
             error: true,
             message: "Está Compra não existe."
        });
      };
    await compra.update(comp,{
        where: Sequelize.and(
			{id:req.params.id}) // essa linha faltava por isso não consegui alterar
		}).then(umcomp=>{
			return res.json({
				error:false, 
				message :"Compra atualizado com sucesso!", 
				umcomp
	     	});	
		}).catch(erro=>{
			return res.status(400).json({
				error:true, 
				message:" problema na conexão com a API."
		});
	});
});

//Excluir Cliente
app.delete('/cliente/:id', async(req,res)=>{
    if(! await cliente.findByPk(req.params.id)){
        return res.status(400).json({
             error: true,
             message: "O Cliente não existe."
        });
      };
    await cliente.destroy({
        where : {id:req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message :"Cliente foi excluido!"
        });
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message:" problema na conexão com a API."
        });
    });
});

//Excluir Cartão
app.delete('/cartao/:id', async(req,res)=>{
    if(! await cartao.findByPk(req.params.id)){
        return res.status(400).json({
             error: true,
             message: "Cartão não existe."
        });
      };
    await cartao.destroy({
        where : {id:req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message :"Cartão foi excluido!"
        });
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message:" problema na conexão com a API."
        });
    });
});

//Excluir Compras
app.delete('/compras/:id', async(req,res)=>{
    if(! await compra.findByPk(req.params.id)){
        return res.status(400).json({
             error: true,
             message: "Compra não existente."
        })
      }
    await compra.destroy({
        where : {id:req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message :"A Compra foi excluido!"
        });
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message:" problema na conexão com a API."
        });
    });
});

//Excluir Empresas
app.delete('/empresa/:id', async(req,res)=>{
    if(! await empresa.findByPk(req.params.id)){
        return res.status(400).json({
             error: true,
             message: "Empresa não existe."
        });
      };
    await empresa.destroy({
        where : {id:req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message :"A Empresa foi excluido!"
        });
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message:" problema na conexão com a API."
        });
    });
});

//Excluir Promoção
app.delete('/promocao/:id', async(req,res)=>{
    if(! await promocao.findByPk(req.params.id)){
         return res.status(400).json({
              error: true,
              message: "Promoção não existe."
         });
       };
    await promocao.destroy({
        where : {id:req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message :"A Promoção foi excluido!"
        });
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message:" problema na conexão com a API."
        });
    });
});
