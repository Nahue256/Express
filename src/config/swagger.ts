import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
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
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'The auto-generated UUID of the user',
              readOnly: true
            },
            username: {
              type: 'string',
              description: 'The username of the user'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'The email of the user'
            },
            password: {
              type: 'string',
              description: 'The password of the user',
              writeOnly: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The timestamp of when the user was created',
              readOnly: true
            }
          }
        },
        UserCreate: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'The username of the user'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'The email of the user'
            },
            password: {
              type: 'string',
              description: 'The password of the user'
            }
          }
        },
        UserUpdate: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The username of the user'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'The email of the user'
            },
            password: {
              type: 'string',
              description: 'The password of the user'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

export default swaggerJsdoc(options); 