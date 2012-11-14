package com.automationgroups.pe.amazon;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.dynamodb.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodb.model.AttributeValue;
import com.amazonaws.services.dynamodb.model.ComparisonOperator;
import com.amazonaws.services.dynamodb.model.Condition;
import com.amazonaws.services.dynamodb.model.DeleteItemRequest;
import com.amazonaws.services.dynamodb.model.DeleteItemResult;
import com.amazonaws.services.dynamodb.model.GetItemRequest;
import com.amazonaws.services.dynamodb.model.GetItemResult;
import com.amazonaws.services.dynamodb.model.Key;
import com.amazonaws.services.dynamodb.model.PutItemRequest;
import com.amazonaws.services.dynamodb.model.PutItemResult;
import com.amazonaws.services.dynamodb.model.QueryRequest;
import com.amazonaws.services.dynamodb.model.QueryResult;
import com.amazonaws.services.dynamodb.model.ResourceNotFoundException;

public class DynamoClient {

	    public static final String module = DynamoClient.class.getName();
	    
		private static DynamoClient singletonClient;


        private static AmazonDynamoDBClient createClient() throws AmazonServiceException {

			if(singletonClient == null) {
				String accessKey = System.getProperty("s3.accessKey");
				String secretKey = System.getProperty("s3.secretAccessKey");
				BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

				singletonClient = new AmazonDynamoDBClient(credentials);
		
			}
			
			return singletonClient;
		}
		
}		
