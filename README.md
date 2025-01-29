# Contact Modal Override (LWC)

This Lightning Web Component (LWC) overrides a standard Salesforce button to display a modal for creating a Contact. The modal's visibility is controlled using a URL parameter (`c__openModal`).

## 🚀 Features
- Overrides a **standard button** (e.g., "New" or "Edit").
- Uses **URL parameters** (`c__openModal=true/false`) to control modal visibility.
- Prevents reopening on page refresh by dynamically updating the URL.
- Uses `@wire(CurrentPageReference)` to track state changes.
- Creates a new Contact and resets form fields after successful submission.

## 🔧 Setup Instructions

### 1️⃣ Override a Standard Button
1. Go to **Salesforce Setup → Object Manager → Contact**.
2. Navigate to **Buttons, Links, and Actions**.
3. Find the button you want to override (e.g., **"New"** or **"Edit"**).
4. Click **Edit** and select **"Lightning Component"** as the action type.
5. Choose the **`testingCom`** LWC component.
6. Save and ensure it's added to the **page layout**.

### 2️⃣ Modify URL for Modal Opening
When clicking the button, Salesforce should navigate to a URL like:
This ensures the LWC detects `c__openModal=true` and opens the modal.

### 3️⃣ Handle Modal Closing
When closing the modal, the LWC updates the URL **without a full page reload**:
```javascript
closeModal() {
    window.history.replaceState({}, '', window.location.pathname + '?c__openModal=false');
    this.openModal = false;
}
