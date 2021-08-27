<template>
	<div>
		<CodeBlock style="width: 580px;">

			<template v-slot:json_code>
				{
							"api_key" : "Your API key",
							"phone_number" : "{{request_payload.phone_number}}",
							"pin_attempts" : {{request_payload.pin_attempts}},
							"pin_time_to_live" :  {{request_payload.pin_time_to_live}},
							"pin_length" : {{request_payload.pin_length}},
				}
			</template>

			<template v-slot:js_code>
					var data = {
					"api_key" : "Your API key",
					"phone_number" : "{{request_payload.phone_number}}",
					"pin_attempts" : {{request_payload.pin_attempts}},
					"pin_time_to_live" :  {{request_payload.pin_time_to_live}},
					"pin_length" : {{request_payload.pin_length}},
					};

					var data = JSON.stringify(data);

					var xhr = new XMLHttpRequest();
					xhr.withCredentials = true;

					xhr.addEventListener("readystatechange", function() {
					if(this.readyState === 4) {
					console.log(this.responseText);
					}
					});

					xhr.open("POST", "https://termii.com/api/sms/otp/voice");
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");

					xhr.send(data);
			</template>

			<template v-slot:node_code>
					var request = require('request');
					var data = {
					"api_key" : "Your API key",
					"phone_number" : "{{request_payload.phone_number}}",
					"pin_attempts" : {{request_payload.pin_attempts}},
					"pin_time_to_live" : {{request_payload.pin_time_to_live}},
					"pin_length" :{{request_payload.pin_length}},
					};
					var options = {
					'method': 'POST',
					'url': 'https://termii.com/api/sms/otp/voice',
					'headers': {
					'Content-Type': ['application/json', 'application/json']
					},
					body: JSON.stringify(data)

					};
					request(options, function (error, response) {
					if (error) throw new Error(error);
					console.log(response.body);
					});
			</template>

			<template v-slot:python_code>
					import requests
					url = "https://termii.com/api/sms/otp/voice"
					payload = {
					"api_key" : "Your API key",
					"phone_number" : "{{request_payload.phone_number}}",
					"pin_attempts" :{{request_payload.pin_attempts}},
					"pin_time_to_live" : {{request_payload.pin_time_to_live}},
					"pin_length" : {{request_payload.pin_length}},
					}
					headers = {
					'Content-Type': 'application/json',
					}
					response = requests.request("POST", url, headers=headers, json=payload)
					print(response.text)
			</template>

			<template v-slot:csharp_code>
				RestClient restClient = new RestClient("https://termii.com/api/sms/otp/voice");

				//Creating Json object
				JObject objectBody = new JObject();
				objectBody.Add("api_key","Your API Key");
				objectBody.Add("phone_number","{{request_payload.phone_number}}");
				objectBody.Add("pin_attempts", {{request_payload.pin_attempts}});
				objectBody.Add("pin_time_to_live", {{request_payload.pin_time_to_live}});
				objectBody.Add("pin_length", {{request_payload.pin_length}});

				RestRequest restRequest = new RestRequest(Method.POST);

				restRequest.AddHeader("Content-Type", "application/json");
				restRequest.AddParameter("application/json", objectBody,  ParameterType.RequestBody);
				IRestResponse restResponse = restClient.Execute(restRequest);
				Console.WriteLine(restResponse.Content);
			</template>

			<template v-slot:java_code>
				Unirest.setTimeouts(0, 0);
				HttpResponse response = Unirest.get("https://termii.com/api/sms/otp/voice")
				.header("Content-Type", "application/json")
				.body("{\n\n  \"api_key\" : \"Your API key\",\n
				\"phone_number\" : \"{{request_payload.phone_number}}\",\n
				\"pin_attempts\" : {{request_payload.pin_attempts}}\n  \"pin_time_to_live\" : {{request_payload.pin_time_to_live}},\n
				\"pin_length\" : {{request_payload.pin_length}}\n\n}")
				.asString();
			</template>

			<template v-slot:php_code>
				$curl = curl_init();

				curl_setopt_array($curl, array(
				CURLOPT_URL => 'https://termii.com/api/sms/otp/voice',
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => '',
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 0,
				CURLOPT_FOLLOWLOCATION => true,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => 'GET',
				CURLOPT_POSTFIELDS =>'{

				"api_key" : "Your API key",
				"phone_number" : "{{request_payload.phone_number}}",
				"pin_attempts" : {{request_payload.pin_attempts}},
				"pin_time_to_live" :{{request_payload.pin_time_to_live}},
				"pin_length" : {{request_payload.pin_length}}

				}',
				CURLOPT_HTTPHEADER => array(
				'Content-Type: application/json'
				),
				));

				$response = curl_exec($curl);

				curl_close($curl);
				echo $response;
			</template>

		</CodeBlock>
	</div>
</template>

<script>
import CodeBlock from "../../general/CodeBlock";
export default {
	name: "VoiceOtpCodeBlock",
	components: {CodeBlock},
	props:{
		 request_payload:{}
	}
}
</script>

<style scoped>

</style>
