const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/uefbcs-app',{

})
.then(db=> console.log('Base de datos conectada'))
.catch(err => console.log(err));
