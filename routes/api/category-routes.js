const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async(req, res) => {
  try {
    const categoriesList = await Category.findAll({
      include: [{ model: Product }],
      order: [['id', 'ASC']]
    });
    res.status(200).json(categoriesList)
  } catch (err) {
    res.status(500).json(err)
  };
});

router.get('/:id', async(req, res) => {
  try {
    const categoryById = await Category.findByPk(req.params.id,
      {
        include: [{ model: Product }]
      })

    if (!categoryById) {
      res.status(404).json({ message: 'No categories found with this id!' });
      return;
    }

    res.status(200).json(categoryById)
  } catch (err) {
    res.status(500).json(err)
  };
});

router.post('/', async(req, res) => {
  /* req.body should look like this...
    {
      category_name: "category"
    }
  */
  try {
    const newCategory = await Category.create(req.body)

    res.status(200).json(newCategory)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  };
});

router.put('/:id', async(req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(updatedCategory)
  } catch (err) {
    res.status(400).json(err)
  };
});

router.delete('/:id', async(req, res) => {
  try {
    const categoryById = await Category.destroy({
      where: { id: req.params.id }
    })
    res.status(200).json(categoryById)
  } catch (err) {
    res.status(500).json(err)
  };
});

module.exports = router;
