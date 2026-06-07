interface Alert {
  message: string;
  background: string;
  color: string;
}

export default class Alerts {
  path: string;

  constructor(path = "/json/alerts.json") {
    this.path = path;
    this.init();
  }

  async init() {
    const alerts = await this.getAlerts();
    if (Array.isArray(alerts) && alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  async getAlerts(): Promise<Alert[]> {
    const response = await fetch(this.path);
    if (response.ok) {
      return response.json();
    }
    return [];
  }

  renderAlerts(alerts: Alert[]) {
    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    const main = document.querySelector("main");
    main?.prepend(section);
  }
}
