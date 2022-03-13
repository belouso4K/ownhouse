export default function( context ) {
  try {
    if ( !context.$auth.loggedIn || context.$auth.user.permission == 'user' ) {
      return context.redirect('/');
    }
  } catch (e) { this.error = e.message; }

}
