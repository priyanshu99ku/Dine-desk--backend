const moongose = require('moongose');

const restaurantList =new moongose.schema({
    name:{
        type: String,
        required: true
    },
    adress:{
        type: String,
        required: true
    },
    contacts:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Restaurant', restaurantList);