const Information = require('../models/Information');


exports.createInformation = async (req, res) => {
    console.log('hey Jann');
    try {
      const { title, description } = req.body;
  
      const newInformation = new Information({ title, description });
  
      await newInformation.save();
  
      res.status(201).json({ success: true, message: 'Information created successfully', information: newInformation });
    } catch (error) {
      console.error('Error creating information:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  
  // Controller to handle fetching all information
  exports.getAllInformation = async (req, res) => {
    console.log('hey Jann01');

    try {
      const allInformation = await Information.find();
  
      res.status(200).json({ success: true, information: allInformation });
    } catch (error) {
      console.error('Error fetching information:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  