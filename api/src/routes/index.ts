import { Router, Request, Response } from 'express'
const router: Router = Router()
/* GET home page. */
router.get('/', function (_req: Request, res: Response, _next: any) {
  res.send({ message: 'Hello world!' })
})

export default router
