"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A simple Express API using Swagger for documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The auto-generated id of the user',
                        },
                        username: {
                            type: 'string',
                            description: 'The username of the user',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'The email of the user',
                        },
                        password: {
                            type: 'string',
                            description: 'The password of the user',
                            writeOnly: true,
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The timestamp of when the user was created',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'error',
                        },
                        message: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'], // Updated to look for TypeScript files
};
exports.default = (0, swagger_jsdoc_1.default)(options);
