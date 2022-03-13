export default function( context ) {
  try {
    if (context.$auth.loggedIn) {
      return context.redirect('/');
    }
  } catch (e) { this.error = e.message; }
}
