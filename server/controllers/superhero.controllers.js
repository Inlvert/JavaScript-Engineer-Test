module.exports.createSuperhero = async (req, res, next) => {
  try {
    const {body} = req;

    res.status(201).send({data: body})
    
  } catch (error) {
    next(error)
  }
};

module.exports.getSuperheros = async (req, res, next) => {};
module.exports.getSuperhero = async (req, res, next) => {};
module.exports.updateSuperhero = async (req, res, next) => {};
module.exports.deleteSuperhero = async (req, res, next) => {};
