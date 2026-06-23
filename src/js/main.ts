import { checkAuth } from "./auth.svelte.ts";
import { initNewsletter } from "./newsletter.ts";
import { updateCartCount } from "./cartCount";

updateCartCount();
checkAuth();
initNewsletter();
