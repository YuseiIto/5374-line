/* 使いたいDBのドライバをdefault exportしてください! */

// import postgreSQLDriver from './postgres/postgreSQLDriver'; // PostgreSQL
import dynamodbDriver from './dynamodb/dynamoDBDriver'; //DynamoDB

export default dynamodbDriver;
