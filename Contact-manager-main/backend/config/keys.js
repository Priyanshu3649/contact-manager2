require('dotenv').config();

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    mongoURI: 'mongodb+srv://pandeypriyanshu53:62I767BpbSb8byS9@priyanshudb.1cssm.mongodb.net/',
    jwtSecret: 'your_jwt_secret',
    gcpProjectId: 'your_gcp_project_id',
    gcpBucketName: 'your_gcp_bucket_name',
};
