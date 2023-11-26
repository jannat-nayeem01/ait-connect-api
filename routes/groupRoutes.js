const groupController = require('../controllers/groupController');

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();
console.log('Executing groupRoutes.js');

router.get('/groups', groupController.getGroups);
router.post('/groups', groupController.createGroup);
router.put('/groups/:id', groupController.updateGroup);
router.delete('/groups/:id', groupController.deleteGroup);

//router.post('/groups/join/:groupId', authMiddleware.requireAuth, groupController.joinGroup);
//router.post('/groups/leave/:groupId', authMiddleware.requireAuth, groupController.leaveGroup);
router.post('/groups/:groupId/join', groupController.joinGroup);
router.post('/groups/:groupId/leave', groupController.leaveGroup);

// router.post('/groups/join/:groupId', groupController.joinGroup);
// router.post('/groups/leave/:groupId', groupController.leaveGroup);




module.exports = router;

