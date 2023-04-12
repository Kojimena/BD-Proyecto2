import express from 'express'
import { getHealthUnit, postHealthUnit } from '../controllers/HealthUnit.js';

const router = express.Router();

router.get("/", getHealthUnit)
router.post("/posttesthu", postHealthUnit)

export default router