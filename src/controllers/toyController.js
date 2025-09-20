import dados from "../models/dados.js";
const { toys } = dados;

const getAlltoys = (req, res) => {
  const resultado = toys;
  res.status(200).json({
    total: resultado.lenght,
    toys: resultado,
  });
};

const getToysById = (req, res) => {
  let id = parseInt(req.params.id);

  const toy = toys.find((b) => b.id === id);

  res.status(200).json({
    sucess: "true",
    message: "ToyStory encontrada com sucesso",
    toy: toy,
  });
};

const createToy = (req, res) => {
  const { nome, tipo, anoFabricacao, cor, quantidadeEstoque } = req.body;

  if (!nome || !tipo) {
    return res.status(400).json({
      sucess: "false",
      message: "Nome e profissão são obrigatórios",
    });
  }

  const novoToy = {
    id: toys.length + 1,
    nome: nome,
    tipo: tipo,
    anoFabricacao: anoFabricacao,
    cor: cor,
    quantidadeEstoque: quantidadeEstoque,
  };

  toys.push(novoToy);

  res.status(201).json({
    sucess: "true",
    message: "Novo toy criado com sucesso",
    toy: novoToy,
  });
};

const deletaToy = (req, res) => {
  let id = parseInt(req.params.id);
  const ToyParaRemover = toys.find((b) => b.id === id);

  if (!ToyParaRemover) {
    return res.status(404).json({
      sucess: "false",
      message: "Toy não encontrado",
    });
  }

  const toysFiltrados = toys.filter((toy) => toy.id !== id);
  {
    // Atualiza o array original
    toys.splice(0, toys.length, ...toysFiltrados);

    res.status(200).json({
      sucess: "true",
      message: "Toy removido com sucesso",
      ToyParaRemover: ToyParaRemover,
    });
  }
};

const updateToy = (req, res) => {
  const { id } = req.params;
  const { nome, tipo, anoFabricacao, cor, quantidadeEstoque } = req.body;

  // Validar ID
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "ID deve ser um número válido!",
    });
  }

  const idParaEditar = parseInt(id);

  // Verificar se toy existe
  const toyExiste = toys.find((b) => b.id === idParaEditar);
  if (!toyExiste) {
    return res.status(404).json({
      success: false,
      message: `Toy com ID ${id} não encontrado para atualização!`,
    });
  }

  // Atualizar toy usando map
  const toysAtualizados = toys.map((toy) =>
    toy.id === idParaEditar
      ? {
          ...toy,
          ...(nome && { nome }),
          ...(tipo && { tipo }),
          ...(anoFabricacao && { anoFabricacao: parseInt(anoFabricacao) }),
          ...(cor && { cor }),
          ...(quantidadeEstoque && { quantidadeEstoque }),
        }
      : toy
  );

  // Atualizar array global
  toys.splice(0, toys.length, ...toysAtualizados);

  // Buscar toys atualizado para retorno
  const toyAtualizado = toys.find((b) => b.id === idParaEditar);

  res.status(200).json({
    success: true,
    message: `Dados dos toys ID ${id} atualizados com sucesso!`,
    toy: toyAtualizado,
  });
};

export { getAlltoys, getToysById, createToy, deletaToy, updateToy };
