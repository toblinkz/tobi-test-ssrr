export default function ({store, redirect}) {
    if (store.state.user_registered === false){
      return redirect('/login');
    }
}
