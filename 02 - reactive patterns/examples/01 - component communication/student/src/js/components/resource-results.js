const template = document.createElement('template');
// TODO: Update the template to support dynamic results (NOTE: we are not altering the badge count at this time)
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">4</span>
      </div>

      <div class="list-group list-group-flush">
        <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">Peer Tutoring Centre</h2>
            <small>Academic</small>
          </div>
          <p class="mb-1 small text-body-secondary">Drop-in tutoring and study support.</p>
          <small class="text-body-secondary">Building W, Room W101</small>
        </button>

        <button type="button" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">Counselling Services</h2>
            <small>Wellness</small>
          </div>
          <p class="mb-1 small text-body-secondary">Confidential mental health supports.</p>
          <small class="text-body-secondary">Virtual and in-person</small>
        </button>

        <button type="button" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">Student Awards and Bursaries</h2>
            <small>Financial</small>
          </div>
          <p class="mb-1 small text-body-secondary">Funding options and application help.</p>
          <small class="text-body-secondary">Student Services, Main Floor CAT</small>
        </button>

        <button type="button" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">IT Service Desk</h2>
            <small>Tech</small>
          </div>
          <p class="mb-1 small text-body-secondary">Account access, Wi-Fi, BYOD support.</p>
          <small class="text-body-secondary">Library</small>
        </button>
      </div>
    </div>
  </section>`;

class ResourceResults extends HTMLElement {
  // TODO: Create a private field for results data
  #results = [];

  constructor() {
    super();
    // TODO: Bind the handleResultClick method to this instance

    this._handleResultClick = this._handleResultClick.bind(this);
    this.attachShadow({ mode: 'open' });
  }

  // TODO: Implement setter for results data, remember to render
  set results(data) {
    this.#results = data;
    this.render();
  }

  // TODO: Add an event handler method for result selection
  _handleResultClick(event) {
    const button = event.target.closest('button[data-id');
    if (button) {
      const resultID = button.getAttribute('data-id');
      const result = this.#results.find(r => r.id === resultID);

      // cook up a custom event. docs: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/
      const selectedEvent = new CustomEvent(
        'resource-selected', // *we* get to decide the event name!
        {
          detail: { result }, // don't pre-filter the data item. Send the *whole* object; let the receiving component decide what's relevant.
          bubbles: true, // if true, parent node / document can listen for event without knowing about & wiring together sender and receiever components
          composed: true, // if true, events can cross shadow DOM boundary
        });

      // broadcast the event to the current target (in this case, a ResourceResults component instance)
      this.dispatchEvent(selectedEvent);
    }
  }

  connectedCallback() {
    // TODO: Add a click event listener to handle result selection

    this.render();
  }

  // TODO: Clean up event listener in disconnectedCallback
  disconnectedCallback() { // <- when the component is unloaded/removed from the DOM...
    // ... then clean up your unused event listeners!
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }

  render() {
    // TODO: Update to render from the private results field, if it's empty, show "No results found" message

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // copy template HTML above onto the shadow root node for thi component
    const content = template.content.cloneNode(true);
    // and select the list-group class to display the data
    const listGroup = content.querySelector('.list-group');

    // render a result row for each item in the results array

    if (this.#results.length) {
      const resultsHTML = this.#results.map(
        result => `
                <button type="button" class="list-group-item list-group-item-action" data-id="${result.id}">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">${result.title}</h2>
            <small>${result.category}</small>
          </div>
          <p class="mb-1 small text-body-secondary">${result.summary}</p>
          <small class="text-body-secondary">${result.location}</small>
        </button>
        `);
      listGroup.innerHTML = resultsHTML.join();
      // finally, take the content we composed and add it to the shadow root node!
    } else {
      // If #results contains no items, display some default text.
      // Always communicate to the user in UI design! An empty card might have them wondering if something's broken.
      listGroup.innerHTML = `
        <div class="list-group-item">
          <p class="mb-0">No results found.</p>
        </div>`;
    }
    this.shadowRoot.innerHTML = ''; // clear current contents first; we're re-rendering
    this.shadowRoot.appendChild(content);
  }
}

customElements.define('resource-results', ResourceResults);
