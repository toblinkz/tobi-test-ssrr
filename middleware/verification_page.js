export default function ({store, redirect}) {
    if (store.state.user_registered){
      return redirect('/login');
    }
}
