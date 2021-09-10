<template>
	<div>
		<CodeBlock style="width: 580px;">

			<template v-slot:json_code>
				{
							"to": "{{request_payload.to}}",
							"from": "{{request_payload.from}}",
							"sms": "{{request_payload.sms}}",
							"type": "plain",
							"channel": "{{ request_payload.channel }}",
							"api_key": "Your API Key",
				}
			</template>

			<template v-slot:js_code>
					var data = {
								"to": "{{request_payload.to}}",
								"from": "{{request_payload.from}}",
								"sms": "Hi there, testing Termii",
								"type": "plain",
								"channel": "{{ request_payload.channel }}",
								"api_key": "Your API Key",
					};

					var data = JSON.stringify(data);

					var xhr = new XMLHttpRequest();
					xhr.withCredentials = true;

					xhr.addEventListener("readystatechange", function() {
					if(this.readyState === 4) {
					console.log(this.responseText);
					}
					});

					xhr.open("POST", "https://termii.com/api/sms/send");
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");

					xhr.send(data);
			</template>

			<template v-slot:node_code>
					var request = require('request');
					var data = {
							"to": "{{request_payload.to}}",
							"from": "{{request_payload.from}}",
							"sms": "Hi there, testing Termii",
							"type": "plain",
							"channel": "{{ request_payload.channel }}",
							"api_key": "Your API Key",
					};
					var options = {
					'method': 'POST',
					'url': 'https://termii.com/api/sms/send',
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
					url = "https://termii.com/api/sms/send"
					payload = {
							"to": "{{request_payload.to}}",
							"from": "{{request_payload.from}}",
							"sms": "Hi there, testing Termii",
							"type": "plain",
							"channel": "{{ request_payload.channel }}",
							"api_key": "Your API Key",
					}
					headers = {
					'Content-Type': 'application/json',
					}
					response = requests.request("POST", url, headers=headers, json=payload)
					print(response.text)
			</template>

			<template v-slot:csharp_code>
				RestClient restClient = new RestClient("https://termii.com/api/sms/send");

				//Creating Json object
				JObject objectBody = new JObject();

				objectBody.Add("to","{{request_payload.to}}");
				objectBody.Add("from", {{request_payload.from}});
				objectBody.Add("sms", "Hi there, testing Termii");
				objectBody.Add("type", "plain");
				objectBody.Add("channel","{{ request_payload.channel }}");
				objectBody.Add("api_key","Your API Key");

				RestRequest restRequest = new RestRequest(Method.POST);

				restRequest.AddHeader("Content-Type", "application/json");
				restRequest.AddParameter("application/json", objectBody,  ParameterType.RequestBody);
				IRestResponse restResponse = restClient.Execute(restRequest);
				Console.WriteLine(restResponse.Content);
			</template>

			<template v-slot:java_code>
				Unirest.setTimeouts(0, 0);
				HttpResponse response = Unirest.get("https://termii.com/api/sms/send")
				.header("Content-Type", "application/json")
				.body("{\n    \"to\": \"{{request_payload.to}}\",\n    \"from\": \"{{request_payload.from}}\",\n
				\"sms\": \"Hi there, testing Termii\",\n    \"type\": \"plain\",\n
				\"channel\": \"{{request_payload.channel}}\",\n
				\"api_key\": \"Your API Key\"\n}")
				.asString();
			</template>

			<template v-slot:php_code>
				$curl = curl_init();

				curl_setopt_array($curl, array(
				CURLOPT_URL => 'https://termii.com/api/sms/send',
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => '',
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 0,
				CURLOPT_FOLLOWLOCATION => true,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => 'GET',
				CURLOPT_POSTFIELDS =>'{

				"to": "{{request_payload.to}}",
				"from": "{{request_payload.from}}",
				"sms": "Hi there, testing Termii",
				"type": "plain",
				"channel": "{{ request_payload.channel }}",
				"api_key": "Your API Key",

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
	name: "SmsCodeBlock",
	components: {CodeBlock},
	props:{
		 request_payload:{}
	}
}
</script>

<style scoped>

</style>
