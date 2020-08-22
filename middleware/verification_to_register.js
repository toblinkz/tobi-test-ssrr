export default function ({store, redirect}) {
  if(store.state.user_registered === true){
    return redirect("/verify");
  }
}
