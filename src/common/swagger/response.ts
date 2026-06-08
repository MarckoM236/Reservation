export const SuccessResponse = (
  data: Record<string, any>,
  message = 'Operation completed successfully',
) => ({
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true,
    },
    message: {
      type: 'string',
      example: message,
    },
    data: {
      type: 'object',
      properties: data,
    },
  },
});

export const ErrorResponse = (
  message = 'An error occurred',
) => ({
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
            example: false,
        },
        message: {
            type: 'string',
            example: message,
        }
    }
});