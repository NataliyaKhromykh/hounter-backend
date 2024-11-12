const QuestionsModel = require('./QuestionsModel');

//get

module.exports.getQuestions = async (req,res) => {
    const myQuestions = await QuestionsModel.find();
    res.send(myQuestions)
}

module.exports.saveQuestions = async (req,res) =>{
    const { name } = req.body;
    QuestionsModel.create({ name })
    .then((data) => {console.log('Question added')
    res.send(data)
    })
}

module.exports.deleteQuestions = async(req,res) => {
    const {_id} = req.body
    QuestionsModel.findByIdAndDelete(_id)
    .then(() => res.send('Deleted a question'))
}