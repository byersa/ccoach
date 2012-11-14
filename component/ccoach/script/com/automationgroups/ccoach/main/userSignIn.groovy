import org.ofbiz.service.ServiceUtil;
import org.ofbiz.base.util.UtilMisc;
import org.ofbiz.base.crypto.HashCrypt;
import net.sf.json.JSONObject;

String email = context.get('email');
String password = context.get('password');
def user = delegator.findByPrimaryKey("UserLogin", UtilMisc.toMap("userLoginId", email));

Map returnUser = UtilMisc.toMap("empty", "");

if(user == null){
	result = ServiceUtil.returnSuccess();
	result.result = "not exist";
	result.user = returnUser;
	return result;
} else {
	String formEncrPass = HashCrypt.getDigestHash(password, "SHA");
	
	if(formEncrPass == user.currentPassword){
		if(user.enabled == "Y"){
			def party = delegator.findByPrimaryKey("Party", UtilMisc.toMap("partyId", email));

			Map details = JSONObject.fromObject(party.description);

			returnUser = UtilMisc.toMap("userLoginId", user.userLoginId,
				"partyId", user.partyId,
				"name", details.get("name"),
				"lastName", details.get("lastName"),
				"agencyName", details.get("agencyName"),
				"role", "someRole");
		
			result = ServiceUtil.returnSuccess();
			result.result = "success";
			result.user = returnUser;
			return result;
		} else {
			result = ServiceUtil.returnSuccess();
			result.result = "not verified";
			result.user = returnUser;
			return result;
		}
		
	} else {
		result = ServiceUtil.returnSuccess();
		result.result = "wrong password";
		result.user = returnUser;
		return result;
	}
}

