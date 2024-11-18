const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async(req, res) => {
  try {
    const tagsList = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
      order: [['id', 'ASC']]
    });
    res.status(200).json(tagsList)
  } catch (err) {
    res.status(500).json(err)
  };
});

router.get('/:id', async(req, res) => {
  try {
    const tagById = await Tag.findByPk(req.params.id,
      {
        include: [{ model: Product, through: ProductTag }]
      })

    if (!tagById) {
      res.status(404).json({ message: 'No tags found with this id!' });
      return;
    }

    res.status(200).json(tagById)
  } catch (err) {
    res.status(500).json(err)
  };
});

router.post('/', async(req, res) => {
  try {
    const newTag = await Tag.create(req.body)

    res.status(200).json(newTag)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  };
});

router.put('/:id', async(req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(updatedTag)
  } catch (err) {
    res.status(400).json(err)
  };
});

router.delete('/:id', async(req, res) => {
  try {
    const tagById = await Tag.destroy({
      where: { id: req.params.id }
    })
    res.status(200).json(tagById)
  } catch (err) {
    res.status(500).json(err)
  };
});

module.exports = router;
