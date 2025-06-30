document.addEventListener("DOMContentLoaded", function () {
  // Navigation between steps
  const nextButtons = document.querySelectorAll(".next-btn");
  const prevButtons = document.querySelectorAll(".prev-btn");

  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentSection = this.closest(".form-section");
      const nextSectionId = this.getAttribute("data-next");

      // Validate current section before proceeding
      if (validateSection(currentSection.id)) {
        currentSection.classList.remove("active");
        document.getElementById(`section-${nextSectionId}`).classList.add("active");

        // Update stepper
        updateStepper(nextSectionId);
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentSection = this.closest(".form-section");
      const prevSectionId = this.getAttribute("data-prev");

      currentSection.classList.remove("active");
      document.getElementById(`section-${prevSectionId}`).classList.add("active");

      // Update stepper
      updateStepper(prevSectionId);
    });
  });

  // Update stepper visualization
  function updateStepper(activeStep) {
    document.querySelectorAll(".step").forEach((step) => {
      step.classList.remove("active");
      if (parseInt(step.getAttribute("data-step")) <= parseInt(activeStep)) {
        step.classList.add("active");
      }
    });
  }

  // Section validation
  function validateSection(sectionId) {
    const section = document.getElementById(sectionId);
    const requiredInputs = section.querySelectorAll("[required]");
    let isValid = true;

    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("is-invalid");
        isValid = false;
      } else {
        input.classList.remove("is-invalid");
      }
    });

    if (!isValid) {
      alert("Harap lengkapi semua field yang wajib diisi sebelum melanjutkan.");
    }

    return isValid;
  }

  // Toggle education details
  document.getElementById("continueEducationYes").addEventListener("change", function () {
    document.getElementById("educationDetails").style.display = this.checked ? "block" : "none";
  });

  document.getElementById("continueEducationNo").addEventListener("change", function () {
    document.getElementById("educationDetails").style.display = this.checked ? "none" : "block";
  });

  // Toggle employment details
  document.getElementById("isWorkingYes").addEventListener("change", function () {
    document.getElementById("employmentDetails").style.display = this.checked ? "block" : "none";
  });

  document.getElementById("isWorkingNo").addEventListener("change", function () {
    document.getElementById("employmentDetails").style.display = this.checked ? "none" : "block";
  });

  // Toggle job relevance reason
  document.getElementById("jobRelevantNo").addEventListener("change", function () {
    document.getElementById("relevanceReason").style.display = this.checked ? "block" : "none";
  });

  document.getElementById("jobRelevantYes").addEventListener("change", function () {
    document.getElementById("relevanceReason").style.display = "none";
  });

  // Form submission
  document.getElementById("studyTracerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateSection("section-5")) {
      // Here you would typically send the form data to a server
      alert("Formulir berhasil dikirim! Terima kasih atas partisipasinya.");
      // this.reset();
      // Reset to first section
      document.querySelectorAll(".form-section").forEach((section) => {
        section.classList.remove("active");
      });
      document.getElementById("section-1").classList.add("active");
      updateStepper(1);
    }
  });
});
