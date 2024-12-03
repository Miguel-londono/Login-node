const Categorie = require("../models/categorie");
const User = require("../models/user");

//Obtener categorias - Paginado - Total - Pupulate {ayuda ver que id lo grabo en la base}

const getCategories = async (req, res) => {
  const { from, limit } = req.query;

  const [total, categories] = await Promise.all([
    Categorie.countDocuments({ state: true }),
    Categorie.find({ state: true })
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "name")
      .exec(),
  ]);

  res.json({
    total,
    categories,
  });
};

//Obtener categoria - Total - Pupulate {ayuda ver que id lo grabo en la base}

const getCategorie = async (req, res) => {
  //Obtener el id del params
  const { id } = req.params;

  //Consultal el id

  const categorie = await Categorie.findById(id);
  //
  res.json({
    categorie,
  });
};

const createCategorie = async (req, res) => {
  const name = req.body.name.toUpperCase();

  //Vericar si la categoria existe
  const categoriaDB = await Categorie.findOne({ name });
  if (categoriaDB) {
    return res.status(400).json({
      msg: "La categoria ya existe",
    });
  }

  //Generar la data a guardar
  const data = {
    name,
    user: req.user._id,
  };

  //Crear Categoria
  const createCategorie = await new Categorie(data);

  //Guardar la categoria
  createCategorie.save();

  res.status(201).json(createCategorie);
};

//Actualizar Categoria

const updateCategorie = async (req, res) => {
  const id = req.params.id;
  const {name} = req.body

  //creando Data para actulizar

  data={
    name,
    user: req.user._id
  }

  //Actualizando en la base de datos

  const updateCategorie = await Categorie.findByIdAndUpdate(id, data)
  updateCategorie.save()

  res.json({updateCategorie});
};




//Eliminar Categoria - Estado: false

const deleteCategorie = async (req, res) => {

    const { id } = req.params

    // recuperamos la categoria del req 
    const categorie = req.categorie

    //Borramos el Estado del la cateogria 

    //const deleteCategorie = await await Categorie.findByIdAndUpdate(id, {state:false} , {new:true} )

    res.json(
        {
            deleteCategorie
        }
    )
};



module.exports = {
  createCategorie,
  getCategories,
  getCategorie,
  updateCategorie,
  deleteCategorie,
};
