const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hotel Management System API',
      version: '1.0.0',
      description: 'Complete REST API for Hotel Management with authentication, rooms, bookings, payments, and reports.',
    },
    servers: [{ url: 'http://localhost:5000', description: 'Development' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['admin', 'staff', 'customer'] },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Room: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            number: { type: 'string' },
            type: { type: 'string', enum: ['single', 'double', 'deluxe', 'suite'] },
            status: { type: 'string', enum: ['available', 'booked', 'maintenance'] },
            price: { type: 'number' },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            user_id: { type: 'string', format: 'uuid' },
            room_id: { type: 'string', format: 'uuid' },
            check_in: { type: 'string', format: 'date' },
            check_out: { type: 'string', format: 'date' },
            status: { type: 'string', enum: ['confirmed', 'cancelled', 'completed'] },
          },
        },
        Payment: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            booking_id: { type: 'string', format: 'uuid' },
            amount: { type: 'number' },
            method: { type: 'string', enum: ['cash', 'card', 'mobile_money'] },
            status: { type: 'string', enum: ['paid', 'pending'] },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    paths: {
      '/api/auth/register': {
        post: {
          tags: ['Auth'], summary: 'Register a new user',
          requestBody: { required: true, content: { 'application/json': { schema: {
            type: 'object', required: ['name', 'email', 'password'],
            properties: { name: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' }, role: { type: 'string' } },
          }}}},
          responses: { 201: { description: 'User registered' }, 409: { description: 'Email exists' } },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'], summary: 'Login',
          requestBody: { required: true, content: { 'application/json': { schema: {
            type: 'object', required: ['email', 'password'],
            properties: { email: { type: 'string' }, password: { type: 'string' } },
          }}}},
          responses: { 200: { description: 'Login successful' }, 401: { description: 'Invalid credentials' } },
        },
      },
      '/api/rooms': {
        get: { tags: ['Rooms'], summary: 'Get all rooms', parameters: [
          { in: 'query', name: 'status', schema: { type: 'string' } },
          { in: 'query', name: 'type', schema: { type: 'string' } },
        ], responses: { 200: { description: 'List of rooms' } } },
        post: { tags: ['Rooms'], summary: 'Create room', security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Room' } } } },
          responses: { 201: { description: 'Room created' } } },
      },
      '/api/rooms/{id}': {
        put: { tags: ['Rooms'], summary: 'Update room', security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Room updated' } } },
        delete: { tags: ['Rooms'], summary: 'Delete room', security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Room deleted' } } },
      },
      '/api/bookings': {
        get: { tags: ['Bookings'], summary: 'Get all bookings', security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'List of bookings' } } },
        post: { tags: ['Bookings'], summary: 'Create booking (prevents double booking)', security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Booking' } } } },
          responses: { 201: { description: 'Booking created' }, 409: { description: 'Room already booked' } } },
      },
      '/api/payments': {
        get: { tags: ['Payments'], summary: 'Get all payments', security: [{ bearerAuth: [] }], responses: { 200: { description: 'List of payments' } } },
        post: { tags: ['Payments'], summary: 'Record payment', security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Payment' } } } },
          responses: { 201: { description: 'Payment recorded' } } },
      },
      '/api/reports': {
        get: { tags: ['Reports'], summary: 'Get dashboard reports', security: [{ bearerAuth: [] }], responses: { 200: { description: 'Report data' } } },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
