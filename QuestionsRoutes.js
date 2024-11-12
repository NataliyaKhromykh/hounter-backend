const { Router } = require("express");
const {getQuestions, saveQuestions, deleteQuestions} = require('./QuestionsController');

const router = Router();

router.get('/', getQuestions);
router.post('/saveQuestions', saveQuestions);
router.delete("/deleteQuestions", deleteQuestions)



module.exports = router;