export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_ACCESS_SECRET"),
          },
          region: env("AWS_REGION"),
          params: {
            ACL: env('AWS_ACL'),
            Bucket: env("AWS_BUCKET"),
          },
        },
      },
      breakpoints: {
        thumbnail: 400,
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        },
      },
  },
});
