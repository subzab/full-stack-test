import { Router, Request, Response } from 'express'
import Item from '../model/Item'

const router: Router = Router()

/* GET Item list. */
router.get('/', async (_req: Request, res: Response, _next: any) => {
  const items = await Item.find()
  return res.send({ message: 'Item router', data: items })
})

/* GET Item By Id. */
router.get('/:id', async (req: Request, res: Response, _next: any) => {
  const item = await Item.findById(req.params.id)
  if (!item) {
    return res.status(404).send()
  }
  return res.send({ message: 'Item router', data: item })
})

/*Create Item */
router.post('/', async (req: Request, res: Response, _next: any) => {
  const item = new Item({ ...req.body })
  try {
    await item.save()
    return res.send(item)
  } catch (e) {
    return res.status(400).send(e)
  }
})

export default router
