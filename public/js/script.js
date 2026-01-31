// Password visibility toggle and client-side form validation
document.addEventListener('DOMContentLoaded', function () {
    
    // Password visibility toggle
    const pswdBtn = document.querySelector("#pswdBtn");
    if (pswdBtn) {
        pswdBtn.addEventListener("click", function() {
            
            // Get password input field
            const pswdInput = document.querySelector("#account_password");
            const type = pswdInput.getAttribute("type");

            // Toggle password visibility
            if (type == "password") {
                pswdInput.setAttribute("type", "text");
                pswdBtn.innerHTML = "🙈";
            } else {
                pswdInput.setAttribute("type", "password");
                pswdBtn.innerHTML = "👁";
            }
        });
    }

    // Validation patterns and current year
    const currentYear = new Date().getFullYear();
    const relPathPattern = /^(?!https?:)(?!\/\/)(?!data:)(?:\.{0,2}\/)?[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)+$/i;
    const classificationPattern = /^[A-Z][A-Za-z0-9]*$/;

    // Function to display errors with "Invalid Value: message" format
    function showErrors(containerId, errors) {
        const container = document.querySelector(containerId);
        
        // If no container, exit
        if (!container) return;
        
        // If no errors, clear container
        if (!errors.length) {
            container.innerHTML = "";
            return;
        }
        
        // Create error list
        const list = document.createElement("ul");
        list.className = "notice";
        
        // Populate error list
        errors.forEach(msg => {
            const li = document.createElement("li");
            const label = document.createElement("span");
            label.className = "invalid-label";
            label.textContent = "Invalid value:";
            li.appendChild(label);
            li.appendChild(document.createTextNode(" " + msg));
            list.appendChild(li);
        });
        
        // Clear previous errors
        container.innerHTML = "";
        
        // Append error list to container
        container.appendChild(list);
    }

    function applyToggleState(toggle, active) {
        toggle.setAttribute("aria-pressed", active ? "true" : "false");
        toggle.textContent = active
            ? "Enable Client Validation (testing only)"
            : "Disable Client Validation (testing only)";
        toggle.classList.toggle("nv-enable-state", active);
        toggle.classList.toggle("nv-disable-state", !active);
    }

    // Attach toggle for novalidate
    function attachToggle(form) {
        const toggle = form.querySelector(".toggle-novalidate");
        
        // If no toggle button, exit
        if (!toggle) return;

        applyToggleState(toggle, form.noValidate);
        
        // Initialize state
        toggle.addEventListener("click", () => {
            form.noValidate = !form.noValidate;
            applyToggleState(toggle, form.noValidate);
        });
    }

    // Classification form validation
    const classForm = document.querySelector("#add-classification-form");
    if (classForm) {
        attachToggle(classForm);
        classForm.addEventListener("submit", (e) => {
            
            // Skip validation if novalidate is active
            if (classForm.noValidate) return;
            
            // Gather form values
            const errors = [];
            const name = classForm.classification_name.value.trim();
            
            // Validation checks
            if (!name) errors.push("\"Classification Name\" is required.");
            else if (!classificationPattern.test(name)) {
                errors.push("\"Classification Name\" must start with a capital letter and contain only letters or numbers (no spaces or special characters).");
            } else if (name.length < 2) {
                errors.push("\"Classification Name\" must be at least 2 characters.");
            }

            // Show errors or proceed
            if (errors.length) {
                e.preventDefault();
                showErrors("#client-classification-errors", errors);
            } else {
                showErrors("#client-classification-errors", []);
            }
        });
    }

    // Inventory form validation
    const invForm = document.querySelector("#add-inventory-form");
    if (invForm) {
        attachToggle(invForm);
        invForm.addEventListener("submit", (e) => {
            
            // Skip validation if novalidate is active
            if (invForm.noValidate) return;

            // Gather form values
            const errors = [];
            const make = invForm.inv_make.value.trim();
            const model = invForm.inv_model.value.trim();
            const year = parseInt(invForm.inv_year.value, 10);
            const desc = invForm.inv_description.value.trim();
            const image = invForm.inv_image.value.trim();
            const thumb = invForm.inv_thumbnail.value.trim();
            const price = parseFloat(invForm.inv_price.value);
            const miles = parseFloat(invForm.inv_miles.value);
            const color = invForm.inv_color.value.trim();
            const classification = invForm.classification_id.value;
            
            // Validation checks
            if (!classification) errors.push("\"Classification\" must be selected.");
            if (!make || make.length < 2) errors.push("\"Make\" must be at least 2 characters.");
            if (!model || model.length < 3) errors.push("\"Model\" must be at least 3 characters.");
            if (Number.isNaN(year) || year < 1886 || year > currentYear + 1) errors.push("\"Year\" must be between 1886 and next year.");
            if (!desc || desc.length < 15) errors.push("\"Description\" must be at least 15 characters.");
            if (!image || !relPathPattern.test(image)) errors.push("\"Image Path\" must be a relative path (no http/https).");
            if (!thumb || !relPathPattern.test(thumb)) errors.push("\"Thumbnail Path\" must be a relative path (no http/https).");
            if (Number.isNaN(price) || price < 0) errors.push("\"Price\" must be a number greater than or equal to 0.");
            if (Number.isNaN(miles) || miles < 0) errors.push("\"Miles\" must be a number greater than or equal to 0.");
            if (!color || color.length < 3) errors.push("\"Color\" must be at least 3 characters.");

            // Show errors or proceed
            if (errors.length) {
                e.preventDefault();
                showErrors("#client-inventory-errors", errors);
            } else {
                showErrors("#client-inventory-errors", []);
            }
        });
    }
});
