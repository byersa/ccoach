/*
 * This Work is in the public domain and is provided on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied,
 * including, without limitation, any warranties or conditions of TITLE,
 * NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE.
 * You are solely responsible for determining the appropriateness of using
 * this Work and assume any risks associated with your use of this Work.
 *
 * This Work includes contributions authored by David E. Jones, not as a
 * "work for hire", who hereby disclaims any copyright to the same.
 */
package org.moqui.impl.entity.dynamoDBdb

import java.sql.Timestamp
import java.sql.Date
import org.apache.commons.collections.set.ListOrderedSet

import org.moqui.entity.EntityException
import org.moqui.impl.entity.EntityDefinition
import org.moqui.impl.entity.EntityFacadeImpl
import org.moqui.impl.entity.EntityValueBase
import org.moqui.impl.entity.EntityValue

import org.moqui.impl.entity.dynamodb.DynamoDBDatasourceFactory
import com.amazonaws.services.dynamodb.AmazonDynamoDBClient
import com.amazonaws.services.dynamodb.model.AttributeAction;
import com.amazonaws.services.dynamodb.model.AttributeValue;
import com.amazonaws.services.dynamodb.model.AttributeValueUpdate;
import com.amazonaws.services.dynamodb.model.ConditionalCheckFailedException;
import com.amazonaws.services.dynamodb.model.DeleteItemRequest;
import com.amazonaws.services.dynamodb.model.DeleteItemResult;
import com.amazonaws.services.dynamodb.model.ExpectedAttributeValue;
import com.amazonaws.services.dynamodb.model.GetItemRequest;
import com.amazonaws.services.dynamodb.model.GetItemResult;
import com.amazonaws.services.dynamodb.model.Key;
import com.amazonaws.services.dynamodb.model.PutItemRequest;
import com.amazonaws.services.dynamodb.model.PutItemResult;
import com.amazonaws.services.dynamodb.model.ReturnValue;
import com.amazonaws.services.dynamodb.model.UpdateItemRequest;
import com.amazonaws.services.dynamodb.model.UpdateItemResult;

import com.amazonaws.services.dynamodb.model.ProvisionedThroughputExceededException
import com.amazonaws.services.dynamodb.model.ConditionalCheckFailedException
import com.amazonaws.services.dynamodb.model.InternalServerErrorException
import com.amazonaws.services.dynamodb.model.ResourceNotFoundException
import com.amazonaws.AmazonClientException
import com.amazonaws.AmazonServiceException



class DynamoDBEntityValue extends EntityValueBase {
    protected final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(DynamoDBEntityValue.class)

    DynamoDBDatasourceFactory ddf

    DynamoDBEntityValue(EntityDefinition ed, EntityFacadeImpl efip, DynamoDBDatasourceFactory ddf) {
        super(ed, efip)
        this.ddf = ddf
    }

    DynamoDBEntityValue(EntityDefinition ed, EntityFacadeImpl efip, DynamoDBDatasourceFactory ddf, Map document) {
        super(ed, efip)
        this.ddf = ddf
        for (String fieldName in ed.getAllFieldNames()) {
            getValueMap().put(fieldName, document.field(ed.getColumnName(fieldName, false)))
        }
    }

    @Override
    void createExtended(ListOrderedSet fieldList) {
        EntityDefinition ed = getEntityDefinition()
        if (ed.isViewEntity()) throw new EntityException("Create not yet implemented for view-entity")

        AmazonDynamoDBClient client = ddf.getDatabase()
        Map<String, AttributeValue> item = new HashMap<String, AttributeValue>()
        try {
            buildAttributeValueMap(item, valueMap);
            entityName = ed.getEntityName()
            PutItemRequest putItemRequest = new PutItemRequest().withTableName(entityName).withItem(item);
            PutItemResult result = client.putItem(putItemRequest)     
        } catch(ProvisionedThroughputExceededException e1) {
            throw new EntityException(e1.getMessage())
        } catch(ConditionalCheckFailedException e2) {
            throw new EntityException(e2.getMessage())
        } catch(InternalServerErrorException e3) {
            throw new EntityException(e3.getMessage())
        } catch(ResourceNotFoundException e4) {
            throw new EntityException(e4.getMessage())
        } catch(AmazonClientException e5) {
            throw new EntityException(e5.getMessage())
        } catch(AmazonServiceException e6) {
            throw new EntityException(e6.getMessage())
        }finally {
        }
    }

    @Override
    void updateExtended(List<String> pkFieldList, ListOrderedSet nonPkFieldList) {
        EntityDefinition ed = getEntityDefinition()
        if (ed.isViewEntity()) throw new EntityException("Update not yet implemented for view-entity")

        AmazonDynamoDBClient client = ddf.getDatabase()
        Map<String, AttributeValue> item = new HashMap<String, AttributeValue>()
        try {
            buildAttributeValueMap(item, valueMap);
            entityName = ed.getEntityName()
            Key key = new Key()
            Map<String, Object>primaryKeyMap = getPrimaryKeys()
            if (primaryKeyMap && primaryKeyMap.keySet().size()) {
                for(String primaryKeyName in primaryKeyMap) {
                    AttributeValue keyAttributeValue = getAttributeValue(primaryKeyName)
                    key.setHashKeyElement(keyAttributeValue)
                    break;
                }
            } else {
                throw new EntityException("Entity '${entityName}' does not have a primary key defined.")
            }
            
            // see if there is a range key defined as a field with the index defined
            List<Node> fieldNodes = getFieldNodes(false, true, false)
            for (Node nd in fieldNodes) {
                if (nd."@index") {
                    AttributeValue keyAttributeValue = getAttributeValue(nd."@field")
                    key.setRangeKeyElement(keyAttributeValue)
                    break;
                }
            }
            UpdateItemRequest updateItemRequest = new UpdateItemRequest().withTableName(entityName).withKey(key).withItem(item);
            UpdateItemResult result = client.updateItem(updateItemRequest)     
        } catch(ProvisionedThroughputExceededException e1) {
            throw new EntityException(e1.getMessage())
        } catch(ConditionalCheckFailedException e2) {
            throw new EntityException(e2.getMessage())
        } catch(InternalServerErrorException e3) {
            throw new EntityException(e3.getMessage())
        } catch(ResourceNotFoundException e4) {
            throw new EntityException(e4.getMessage())
        } catch(AmazonClientException e5) {
            throw new EntityException(e5.getMessage())
        } catch(AmazonServiceException e6) {
            throw new EntityException(e6.getMessage())
        }finally {
        }
    }

    @Override
    void deleteExtended() {
        EntityDefinition ed = getEntityDefinition()
        if (ed.isViewEntity()) throw new EntityException("Delete not implemented for view-entity")

        AmazonDynamoDBClient client = ddf.getDatabase()
        try {
            entityName = ed.getEntityName()
            Key key = new Key()
            Map<String, Object>primaryKeyMap = getPrimaryKeys()
            if (primaryKeyMap && primaryKeyMap.keySet().size()) {
                for(String primaryKeyName in primaryKeyMap) {
                    AttributeValue keyAttributeValue = getAttributeValue(primaryKeyName)
                    key.setHashKeyElement(keyAttributeValue)
                    break;
                }
            } else {
                throw new EntityException("Entity '${entityName}' does not have a primary key defined.")
            }
            
            // see if there is a range key defined as a field with the index defined
            List<Node> fieldNodes = getFieldNodes(false, true, false)
            for (Node nd in fieldNodes) {
                if (nd."@index") {
                    AttributeValue keyAttributeValue = getAttributeValue(nd."@field")
                    key.setRangeKeyElement(keyAttributeValue)
                    break;
                }
            }
            DeleteItemRequest deleteItemRequest = new DeleteItemRequest().withTableName(entityName).withKey(key);
            DeleteItemResult result = client.updateItem(deleteItemRequest)     
        } catch(ProvisionedThroughputExceededException e1) {
            throw new EntityException(e1.getMessage())
        } catch(ConditionalCheckFailedException e2) {
            throw new EntityException(e2.getMessage())
        } catch(InternalServerErrorException e3) {
            throw new EntityException(e3.getMessage())
        } catch(ResourceNotFoundException e4) {
            throw new EntityException(e4.getMessage())
        } catch(AmazonClientException e5) {
            throw new EntityException(e5.getMessage())
        } catch(AmazonServiceException e6) {
            throw new EntityException(e6.getMessage())
        }finally {
        }
    }

    @Override
    boolean refreshExtended() {
        EntityDefinition ed = getEntityDefinition()

        // NOTE: the native Java query API does not used indexes and such, so use the OSQL approach
        ODatabaseDocumentTx oddt = ddf.getDatabase()
        try {
            ddf.checkCreateDocumentClass(oddt, ed)

            StringBuilder sql = new StringBuilder()
            List<Object> paramValues = new ArrayList<Object>()
            sql.append("SELECT FROM ").append(ed.getTableName()).append(" WHERE ")

            boolean isFirstPk = true
            for (String fieldName in ed.getPkFieldNames()) {
                if (isFirstPk) isFirstPk = false else sql.append(" AND ")
                sql.append(ed.getColumnName(fieldName, false)).append("= ?")
                paramValues.add(getValueMap().get(fieldName))
            }

            OSQLSynchQuery<ODocument> query = new OSQLSynchQuery<ODocument>(sql.toString())
            List<ODocument> documentList = oddt.command(query).execute(paramValues)

            // there should only be one value since we're querying by a set of fields with a unique index (the pk)
            if (!documentList) return false

            ODocument document = documentList[0]
            for (String fieldName in ed.getFieldNames(false, true))
                getValueMap().put(fieldName, document.field(fieldName))

            return true
        } finally {
            oddt.close()
        }
        AmazonDynamoDBClient client = ddf.getDatabase()
        try {
            entityName = ed.getEntityName()
            Key key = new Key()
            Map<String, Object>primaryKeyMap = getPrimaryKeys()
            if (primaryKeyMap && primaryKeyMap.keySet().size()) {
                for(String primaryKeyName in primaryKeyMap) {
                    AttributeValue keyAttributeValue = getAttributeValue(primaryKeyName)
                    key.setHashKeyElement(keyAttributeValue)
                    break;
                }
            } else {
                throw new EntityException("Entity '${entityName}' does not have a primary key defined.")
            }
            
            // see if there is a range key defined as a field with the index defined
            List<Node> fieldNodes = getFieldNodes(false, true, false)
            for (Node nd in fieldNodes) {
                if (nd."@index") {
                    AttributeValue keyAttributeValue = getAttributeValue(nd."@field")
                    key.setRangeKeyElement(keyAttributeValue)
                    break;
                }
            }
            GetItemRequest getItemRequest = new GetItemRequest().withTableName(entityName).withKey(key).withItem(item);
            GetItemResult result = client.getItem(getItemRequest)     
            
            java.util.Map<java.lang.String,AttributeValue> returnAttributeValueMap = result.getItem()
            valueMap = buildEntityValueMap(returnAttributeValueMap)
        } catch(ProvisionedThroughputExceededException e1) {
            throw new EntityException(e1.getMessage())
        } catch(ConditionalCheckFailedException e2) {
            throw new EntityException(e2.getMessage())
        } catch(InternalServerErrorException e3) {
            throw new EntityException(e3.getMessage())
        } catch(ResourceNotFoundException e4) {
            throw new EntityException(e4.getMessage())
        } catch(AmazonClientException e5) {
            throw new EntityException(e5.getMessage())
        } catch(AmazonServiceException e6) {
            throw new EntityException(e6.getMessage())
        }finally {
        }
    }
    
    void buildAttributeValueMap( Map<String, AttributeValue> item, Map<String, Object> valueMap) {
    
        for(String fieldName in entityDefinition.getFieldName) {
            item.put(fieldName, getAttributeValue())
        }
        
    }
    
    void buildEntityValueMap( Map<String, EntityValue> attributeValueItem) {
    
        Map<String, Object> returnEntityValueMap = [:]
        for(String fieldName in attributeValueItem) {
            Node fieldNode = entityDefinition.getFieldNode(fieldName)
            switch(fieldNode."@type") {
                case "id":
                case "id-long":
                case "text-short":
                case "text-medium":
                case "text-long":
                case "text-very-long":
                case "text-indicator":
                     returnEntityValueMap[fieldName] = attributeValueItem[fieldName].getS()
                case "number-integer":
                case "number-decimal":
                case "number-float":
                case "currency-amount":
                case "currency-precise":
                case "time":
                     returnEntityValueMap[fieldName] = attributeValueItem[fieldName].getN()
                case "date":
                     tm = attributeValueItem[fieldName].getN()
                     returnEntityValueMap[fieldName] = new Date(tm)
                case "date-time":
                     tm = attributeValueItem[fieldName].getN()
                     returnEntityValueMap[fieldName] = new Timestamp(tm)
            }
        }
        
    }
    
    AttributeValue getAttributeValue(fieldName) {
    
        AttributeValue attrVal = new AttributeValue()
        Node fieldNode = entityDefinition.getFieldNode(fieldName)
        switch(fieldNode."@type") {
            case "id":
            case "id-long":
            case "text-short":
            case "text-medium":
            case "text-long":
            case "text-very-long":
            case "text-indicator":
                 attrVal.setS(valueMap[fieldName])
            case "number-integer":
            case "number-decimal":
            case "number-float":
            case "currency-amount":
            case "currency-precise":
                 attrVal.setN(valueMap[fieldName])
            case "date":
            case "time":
            case "date-time":
                 attrVal.setN(valueMap[fieldName].getTime())
            default:
        }
        
        return attrVal
    }
    
    
}
