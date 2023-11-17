import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="check-user"
export default class extends Controller {
  static targets = ["email"];
  submitForm(e) {
    e.preventDefault();
    const email = this.emailTarget.value;

    fetch(`/api/users/${encodeURIComponent(email)}`)
      .then(response => {
        if (!response.ok) {
          this.displayError(response);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => this.displayResult(data))
      .catch(error => console.log(error));
  }

  displayResult(data) {
    const userInfo = document.getElementById("user-info");
    userInfo.innerHTML = data.exists ? `<p>User found: ${data.user.email}</p>` : "<p>Error: User not found</p>";
  }

  displayError(res) {
    const userInfo = document.getElementById("user-info");
    userInfo.innerHTML = `<p>${res.statusText}</p>`;
  }
}
