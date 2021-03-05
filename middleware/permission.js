export default function ({routes, redirect}) {
   console.log($nuxt.$route.name);
   console.log($nuxt.$route.path);

   hasAccess($nuxt.$route.name);

}

function hasAccess(route_name){
	switch (route_name){
		case "billing-fund":{
			 console.log('the you');
		}
	}
}
