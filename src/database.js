const mongoose = require ('mongoose');
mongoose.connect('mongodb+srv://jimpaul181:UEFFBCS1234@ueffbcs.89wqbbh.mongodb.net/ueffbcs',
{

})
.then(db=> console.log('Base de datos conectada'))
.catch(err => console.log(err));
