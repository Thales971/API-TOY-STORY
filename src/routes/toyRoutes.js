import express from "express";
import  {getAlltoys,getToysById,createToy,deletaToy,updateToy} from "../controllers/toyController.js";

const router = express.Router();

router.get("/", getAlltoys);
router.get("/:id", getToysById);
router.post("/", createToy);
router.delete("/:id", deletaToy);
router.put("/:id", updateToy);

export default router;