export default function ({store, redirect}) {
  if (store.state.L_I === true){
    return redirect('/');
  }
}
