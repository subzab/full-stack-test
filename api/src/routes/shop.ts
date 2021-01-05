import { Router, Request, Response } from 'express'
import Shop from '../model/Shop'

const router: Router = Router()

/* GET shop list. */
router.get('/', async (_req: Request, res: Response, _next: any) => {
  const shops = await Shop.find()
  return res.send({ message: 'Shop router', data: shops })
})

/* GET shop by Id. */
router.get('/:id', async (req: Request, res: Response, _next: any) => {
  if (!req.params.id) return res.status(400).send()

  const shop = await Shop.findById(req.params.id)
  if (!shop) {
    return res.status(404).send()
  }
  return res.send({ message: 'Shop router', data: shop })
})

/*Create Shop */
router.post('/', async (req: Request, res: Response, _next: any) => {
  const shop = new Shop({ ...req.body })
  try {
    await shop.save()
    return res.send(shop)
  } catch (e) {
    return res.status(400).send(e)
  }
})

/*Edit Shop */
router.put('/:id', async (req: Request, res: Response, _next: any) => {
  if (!req.params.id) return res.status(400).send()
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, { ...req.body })
    return res.send(shop)
  } catch (e) {
    return res.status(400).send(e)
  }
})

/**
 * Add item to shop
 */

export default router
