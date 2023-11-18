const Sequelize = require("sequelize");

// Importing the database connection from a utility file
const sequelize = require("../util/database");

// Defining a new model named 'Product' using sequelize.define method
const Product = sequelize.define('product',{
  // Defining the 'id' field as an auto-incrementing primary key
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // Defining 'title' as a string field
  title : Sequelize.STRING, 
  // Defining 'price' as a double field and setting it to not allow null values
  price : {
    type : Sequelize.DOUBLE,
    allowNull : false
  },
  // Defining 'imageUrl' as a string field and setting it to not allow null values
  imageUrl : {
    type : Sequelize.STRING,
    allowNull:false,
  },
  // Defining 'description' as a string field and setting it to not allow null values
  description : {
    type: Sequelize.STRING,
    allowNull:false
  }
});

// Exporting the Product model for use in other parts of the application
module.exports = Product;
