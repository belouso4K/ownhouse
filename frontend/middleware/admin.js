export default function( context ) {
  try {
  if ( !context.$auth.loggedIn || context.
    $auth.$state.user.permission != 'admin' ) {

    return context.redirect('/');
  }
  } catch (e) { this.error = e.message; }
}
