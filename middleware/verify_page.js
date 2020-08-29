export default function ({store, redirect}) {
    if (store.state.view_verify_page !== true){
      return redirect('/')
    }
}
