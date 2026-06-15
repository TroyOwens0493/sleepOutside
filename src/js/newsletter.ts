const BASE_URL = import.meta.env.PUBLIC_SERVER_URL;

export function initNewsletter() {
  const form = document.getElementById("newsletterForm") as HTMLFormElement | null;
  if (!form) return;

  const status = document.getElementById("newsletterStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form)) as {
      name: string;
      email: string;
    };

    if (status) {
      status.textContent = "";
      status.className = "newsletter__status";
    }

    try {
      const res = await fetch(BASE_URL + "newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body.message || "Something went wrong. Please try again.");
      }

      form.reset();
      if (status) {
        status.textContent = "Thanks for subscribing!";
        status.classList.add("newsletter__status--success");
      }
    } catch (err) {
      if (status) {
        status.textContent =
          err instanceof Error ? err.message : "Something went wrong.";
        status.classList.add("newsletter__status--error");
      }
    }
  });
}
