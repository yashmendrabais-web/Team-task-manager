const projectModel = require('../models/project.model');
const memberModel = require('../models/member.model');
const userModel = require('../models/user.model');
const { successResponse, errorResponse } = require('../utils/response.utils');

async function getProjects(req, res) {
	try {
		const projects = await projectModel.getAllByUserId(req.user.id);
		return successResponse(res, 'Projects retrieved successfully', projects);
	} catch (error) {
		return errorResponse(res, 'Failed to get projects', 500);
	}
}
async function getProject(req, res) {
	try {
		const project = await projectModel.getById(req.params.id, req.user.id);

		if (!project) {
			return errorResponse(res, 'Project not found', 404);
		}
		const members = await memberModel.getMembers(req.params.id);
		return successResponse(res, 'Project retrieved successfully', {
			...project,
			members,
		});
	} catch (error) {
		return errorResponse(res, 'Failed to get project', 500);
	}
}
async function createProject(req, res) {
	try {
		const { name, description } = req.body;
		const newProjectId = await projectModel.create({
			name,
			description,
			owner_id: req.user.id,
		});
		await memberModel.addMember(newProjectId, req.user.id, 'admin');
		return successResponse(res, 'Project created successfully', {
			id: newProjectId,
			name,
			description,
		}, 201);
	} catch (error) {
		return errorResponse(res, 'Failed to create project', 500);
	}
}
async function updateProject(req, res) {
	try {
		const { name, description } = req.body;
		await projectModel.update(req.params.id, { name, description });
		return successResponse(res, 'Project updated');
	} catch (error) {
		return errorResponse(res, 'Failed to update project', 500);
	}
}
async function deleteProject(req, res) {
	try {
		await projectModel.deleteById(req.params.id);
		return successResponse(res, 'Project deleted');
	} catch (error) {
		return errorResponse(res, 'Failed to delete project', 500);
	}
}
async function addMember(req, res) {
	try {
		const { email, role = 'member' } = req.body;
		const projectId = req.params.id;
		const user = await userModel.findByEmail(email);
		if (!user) {
			return errorResponse(res, 'User not registered. Ask them to register first.', 404);
		}
		const alreadyMember = await memberModel.isMember(projectId, user.id);
		if (alreadyMember) {
			return errorResponse(res, 'User is already a member', 400);
		}
		await memberModel.addMember(projectId, user.id, role);
		return successResponse(res, 'Member added successfully');
	} catch (error) {
		return errorResponse(res, 'Failed to add member', 500);
	}
}
async function removeMember(req, res) {
	try {
		const projectId = req.params.id;
		const userId = req.params.uid;
		if (String(userId) === String(req.user.id)) {
			return errorResponse(res, 'Cannot remove yourself', 400);
		}
		await memberModel.removeMember(projectId, userId);
		return successResponse(res, 'Member removed');
	} catch (error) {
		return errorResponse(res, 'Failed to remove member', 500);
	}
}
module.exports = {
	getProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject,
	addMember,
	removeMember,
};
